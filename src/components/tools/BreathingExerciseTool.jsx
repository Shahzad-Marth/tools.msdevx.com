"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const modes = [
  {
    id: "box",
    label: "Box Breathing",
    desc: "4-4-4-4 — Used by Navy SEALs for calm and focus",
    phases: [
      { name: "Inhale", duration: 4 },
      { name: "Hold", duration: 4 },
      { name: "Exhale", duration: 4 },
      { name: "Hold", duration: 4 },
    ],
  },
  {
    id: "478",
    label: "4-7-8 Breathing",
    desc: "Relaxation technique by Dr. Andrew Weil",
    phases: [
      { name: "Inhale", duration: 4 },
      { name: "Hold", duration: 7 },
      { name: "Exhale", duration: 8 },
    ],
  },
  {
    id: "relax",
    label: "Relax Breathing",
    desc: "Simple 4-4 breathing for everyday calm",
    phases: [
      { name: "Inhale", duration: 4 },
      { name: "Exhale", duration: 4 },
    ],
  },
];

function getPhaseProgress(currentPhase, phaseElapsed, phases) {
  const phase = phases[currentPhase];
  if (!phase) return 0;
  return Math.min(phaseElapsed / (phase.duration * 1000), 1);
}

export default function BreathingExerciseTool() {
  const [mode, setMode] = useState("box");
  const [isActive, setIsActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentMode = modes.find((m) => m.id === mode) || modes[0];
  const [currentPhase, setCurrentPhase] = useState(0);
  const [phaseElapsed, setPhaseElapsed] = useState(0);
  const [rounds, setRounds] = useState(0);

  const animRef = useRef(null);
  const startTimeRef = useRef(null);
  const phaseStartRef = useRef(null);
  const containerRef = useRef(null);
  const fullscreenRef = useRef(false);

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const resetExercise = useCallback(() => {
    setIsActive(false);
    setCurrentPhase(0);
    setPhaseElapsed(0);
    setRounds(0);
    cancelAnimationFrame(animRef.current);
  }, []);

  const startExercise = useCallback(() => {
    setIsActive(true);
    setCurrentPhase(0);
    setPhaseElapsed(0);
    setRounds(0);
    startTimeRef.current = performance.now();
    phaseStartRef.current = performance.now();
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const phases = currentMode.phases;
    const cycleDuration = phases.reduce((s, p) => s + p.duration, 0);

    const tick = (now) => {
      if (!phaseStartRef.current) phaseStartRef.current = now;

      const phaseTime = now - phaseStartRef.current;
      const currentPhaseIdx = currentPhase;
      const phase = phases[currentPhaseIdx];
      if (!phase) {
        cancelAnimationFrame(animRef.current);
        return;
      }

      const phaseDurMs = phase.duration * 1000;
      const elapsed = Math.min(phaseTime, phaseDurMs);
      setPhaseElapsed(elapsed);

      if (phaseTime >= phaseDurMs) {
        const nextIdx = (currentPhaseIdx + 1) % phases.length;
        setCurrentPhase(nextIdx);
        phaseStartRef.current = now;

        if (nextIdx === 0) {
          setRounds((p) => p + 1);
        }
      }

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [isActive, currentMode, currentPhase]);

  useEffect(() => {
    if (!isActive) return;
    return () => cancelAnimationFrame(animRef.current);
  }, [isActive]);

  const phases = currentMode.phases;
  const totalCycleMs = phases.reduce((s, p) => s + p.duration, 0) * 1000;
  const elapsedInCycle = phases.slice(0, currentPhase).reduce((s, p) => s + p.duration, 0) * 1000 + phaseElapsed;
  const cycleProgress = Math.min(elapsedInCycle / totalCycleMs, 1);
  const phase = phases[currentPhase] || phases[0];
  const phasePct = getPhaseProgress(currentPhase, phaseElapsed, phases);

  const scale = phase?.name === "Inhale" ? 0.5 + phasePct * 0.5 : phase?.name === "Exhale" ? 1 - phasePct * 0.5 : phasePct > 0.5 ? 0.5 + (1 - phasePct) * 0.5 : 0.5 + phasePct * 0.5;

  const phaseColors = {
    Inhale: "from-blue-400/30 to-cyan-400/30 border-blue-400/40",
    Hold: "from-purple-400/30 to-violet-400/30 border-purple-400/40",
    Exhale: "from-green-400/30 to-emerald-400/30 border-green-400/40",
  };

  const phaseBorderColors = {
    Inhale: "border-blue-400/40",
    Hold: "border-purple-400/40",
    Exhale: "border-green-400/40",
  };

  const remainingMs = Math.max(0, (phase ? phase.duration * 1000 : 0) - phaseElapsed);
  const remainingSec = Math.ceil(remainingMs / 1000);

  return (
    <div ref={containerRef} className={`transition-all duration-500 ${isFullscreen ? "fixed inset-0 z-50 bg-[var(--bg-card)] flex items-center justify-center" : ""}`}>
      <div className={`w-full ${isFullscreen ? "max-w-lg mx-auto px-8" : ""}`}>
        {!isFullscreen && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-text mb-3">Breathing Mode</label>
            <div className="flex flex-wrap gap-2">
              {modes.map((m) => (
                <button key={m.id} onClick={() => { if (!isActive) setMode(m.id); }} disabled={isActive} className={`flex-1 min-w-[100px] px-3 py-2.5 rounded-xl border-2 text-center transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${mode === m.id ? "border-brand bg-brand-light text-brand font-semibold" : "border-border bg-[var(--bg-card)] text-text-muted hover:border-brand-light"}`} aria-pressed={mode === m.id}>
                  <div className="text-sm">{m.label}</div>
                  <div className="text-[10px] opacity-70 mt-0.5">{m.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className={`flex flex-col items-center justify-center ${isFullscreen ? "min-h-screen py-8" : "py-4"} mb-4`}>
          <div className="relative flex items-center justify-center mb-6">
            <div className={`absolute w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br ${isActive ? (phaseColors[phase?.name] || "from-blue-400/30 to-cyan-400/30") : "from-blue-400/10 to-cyan-400/10"} transition-all duration-300`} style={{ transform: `scale(${isActive ? 0.7 + scale * 0.6 : 1})`, transition: "transform 0.3s ease-out" }} />

            <div className={`relative w-40 h-40 md:w-48 md:h-48 rounded-full border-4 ${isActive ? (phaseBorderColors[phase?.name] || "border-blue-400/40") : "border-border/50"} flex flex-col items-center justify-center bg-[var(--bg-card)]/80 backdrop-blur-sm transition-all duration-500 shadow-lg`}>
              <div className="text-3xl md:text-4xl font-bold text-text font-mono tracking-wider">
                {isActive ? remainingSec : "--"}
              </div>
              <div className={`text-sm font-medium mt-1 ${isActive ? "text-brand" : "text-text-muted"} transition-all duration-300`}>
                {isActive ? phase?.name || "" : "Ready"}
              </div>
              {isActive && rounds > 0 && (
                <div className="text-[10px] text-text-muted mt-1">Round {rounds}</div>
              )}
            </div>
          </div>

          <div className="flex justify-center gap-3 mb-4">
            {!isActive ? (
              <button onClick={startExercise} className="px-8 py-3 rounded-xl bg-brand text-white font-medium hover:bg-brand-dark transition-all cursor-pointer text-base shadow-md">
                Start
              </button>
            ) : (
              <button onClick={resetExercise} className="px-8 py-3 rounded-xl border-2 border-red-400/40 text-red-400 font-medium hover:bg-red-500/10 transition-all cursor-pointer text-base">
                Stop
              </button>
            )}
          </div>

          {isActive && (
            <div className="flex items-center gap-2 text-xs text-text-muted mb-3">
              {phases.map((p, i) => (
                <div key={p.name} className={`px-2.5 py-1 rounded-md border transition-all ${i === currentPhase ? "border-brand bg-brand-light text-brand font-semibold" : "border-border text-text-muted"}`}>
                  {p.name} {p.duration}s
                </div>
              ))}
            </div>
          )}

          <div className="w-full max-w-xs mx-auto mb-4">
            <div className="h-1.5 bg-[var(--bg-soft)] rounded-full overflow-hidden border border-border">
              <div className="h-full bg-brand rounded-full transition-all duration-300" style={{ width: `${cycleProgress * 100}%` }} />
            </div>
          </div>

          <button onClick={toggleFullscreen} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-text-muted hover:text-text hover:border-brand-light transition-all cursor-pointer text-xs" aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}>
            <span>{isFullscreen ? "✕ Exit Fullscreen" : "⛶ Fullscreen"}</span>
          </button>
        </div>

        <section className="mt-10">
          <h2 className="text-lg font-bold text-text mb-4">Breathing Techniques Explained</h2>
          <div className="space-y-4">
            {modes.map((m) => (
              <div key={m.id} className="bg-[var(--bg-soft)] rounded-xl p-5 border border-border">
                <h3 className="font-semibold text-text text-sm mb-2">{m.label}</h3>
                <p className="text-xs text-text-muted mb-2">{m.desc}</p>
                <div className="flex gap-1.5">
                  {m.phases.map((p) => (
                    <div key={p.name} className="px-2 py-1 rounded-md bg-[var(--bg-card)] border border-border text-xs text-text-muted">
                      {p.name} <span className="font-semibold text-text">{p.duration}s</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-text-muted mt-2">
                  {m.id === "box" && "Used by Navy SEALs, athletes, and first responders to maintain calm under pressure. The square pattern regulates the autonomic nervous system."}
                  {m.id === "478" && "Developed by Dr. Andrew Weil as a natural tranquilizer for the nervous system. The extended exhale activates the parasympathetic response."}
                  {m.id === "relax" && "A simple, accessible breathing pattern for everyday stress relief. Equal inhale and exhale promotes balance and presence."}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-bold text-text mb-4">Benefits of Controlled Breathing</h2>
          <div className="bg-[var(--bg-soft)] rounded-xl p-6 border border-border space-y-3 text-sm text-text-muted leading-relaxed">
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Reduces stress and anxiety:</strong> Activates the parasympathetic nervous system, lowering cortisol levels.</li>
              <li><strong>Improves focus:</strong> Rhythmic breathing patterns help quiet mental chatter and improve concentration.</li>
              <li><strong>Lowers blood pressure:</strong> Deep, slow breathing reduces heart rate and dilates blood vessels.</li>
              <li><strong>Enhances lung function:</strong> Regular practice increases vital capacity and oxygen exchange efficiency.</li>
              <li><strong>Improves sleep quality:</strong> Evening breathing exercises prepare the body for restful sleep.</li>
              <li><strong>Emotional regulation:</strong> Controlled breathing helps manage emotional responses in challenging situations.</li>
            </ul>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-bold text-text mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="bg-[var(--bg-soft)] rounded-xl border border-border p-4 group">
              <summary className="font-semibold text-text cursor-pointer list-none flex items-center justify-between">
                How long should I practice?
                <span className="text-text-muted text-xl transition-transform group-open:rotate-180">▾</span>
              </summary>
              <p className="mt-3 text-sm text-text-muted leading-relaxed">Start with 1-3 minutes daily and gradually increase to 5-10 minutes. Consistency matters more than duration. The ideal practice is a few minutes every day.</p>
            </details>
            <details className="bg-[var(--bg-soft)] rounded-xl border border-border p-4 group">
              <summary className="font-semibold text-text cursor-pointer list-none flex items-center justify-between">
                Is it normal to feel dizzy?
                <span className="text-text-muted text-xl transition-transform group-open:rotate-180">▾</span>
              </summary>
              <p className="mt-3 text-sm text-text-muted leading-relaxed">Mild dizziness can occur when you start practicing breathing exercises, especially with longer breath holds. Reduce the hold times or shorten the exhale if you feel uncomfortable. Never force your breath.</p>
            </details>
            <details className="bg-[var(--bg-soft)] rounded-xl border border-border p-4 group">
              <summary className="font-semibold text-text cursor-pointer list-none flex items-center justify-between">
                When should I practice?
                <span className="text-text-muted text-xl transition-transform group-open:rotate-180">▾</span>
              </summary>
              <p className="mt-3 text-sm text-text-muted leading-relaxed">Morning sessions energize and set focus for the day. Evening sessions promote relaxation and better sleep. Mid-day breathing breaks help reset after stress. Anytime you feel anxious, a few cycles can help restore calm.</p>
            </details>
            <details className="bg-[var(--bg-soft)] rounded-xl border border-border p-4 group">
              <summary className="font-semibold text-text cursor-pointer list-none flex items-center justify-between">
                Should I breathe through my nose or mouth?
                <span className="text-text-muted text-xl transition-transform group-open:rotate-180">▾</span>
              </summary>
              <p className="mt-3 text-sm text-text-muted leading-relaxed">Always breathe through your nose during breathing exercises. Nasal breathing filters, warms, and humidifies the air, releases nitric oxide, and activates the diaphragm more effectively than mouth breathing.</p>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}
