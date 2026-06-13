"use client";

import { useState, useEffect, useCallback } from "react";

const modes = [
  { id: "16:8", label: "16:8", fastingH: 16, eatingH: 8, desc: "Fast 16h, Eat 8h" },
  { id: "18:6", label: "18:6", fastingH: 18, eatingH: 6, desc: "Fast 18h, Eat 6h" },
  { id: "20:4", label: "20:4", fastingH: 20, eatingH: 4, desc: "Fast 20h, Eat 4h" },
  { id: "omad", label: "OMAD", fastingH: 23, eatingH: 1, desc: "One Meal A Day" },
];

const STORAGE_KEY = "ift_state";
const STATS_KEY = "ift_stats";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return null;
}

function saveState(s) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch { /* ignore */ }
}

function loadStats() {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { completed: 0, totalHours: 0, longestHours: 0 };
}

function saveStats(s) {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(s));
  } catch { /* ignore */ }
}

function formatTime(ms) {
  if (ms <= 0) return { h: 0, m: 0, s: 0 };
  const totalSec = Math.floor(ms / 1000);
  return {
    h: Math.floor(totalSec / 3600),
    m: Math.floor((totalSec % 3600) / 60),
    s: totalSec % 60,
  };
}

function pad(n) {
  return String(n).padStart(2, "0");
}

export default function IntermittentFastingTimer() {
  const [mode, setMode] = useState("16:8");
  const [status, setStatus] = useState("idle");
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(() => Date.now());
  const [stats, setStats] = useState(() => loadStats());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadState();
    if (saved && saved.startTime) {
      const elapsed = Date.now() - saved.startTime;
      const totalFasting = saved.modeH * 3600000;
      if (elapsed < totalFasting + (24 - saved.modeH) * 3600000) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMode(saved.modeId);
        setStartTime(saved.startTime);
        setStatus(saved.status);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (status === "idle") {
      saveState({ status: "idle", modeId: mode, modeH: modes.find((m) => m.id === mode)?.fastingH || 16, startTime: null });
    }
  }, [status, mode, hydrated]);

  useEffect(() => {
    if (status === "idle") return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [status]);

  const modeCfg = modes.find((m) => m.id === mode) || modes[0];
  const fastingMs = modeCfg.fastingH * 3600000;
  const eatingMs = modeCfg.eatingH * 3600000;
  const totalCycleMs = fastingMs + eatingMs;

  let phase = "idle";
  let elapsed = 0;
  let remaining = 0;
  let progress = 0;

  if (status === "fasting" && startTime) {
    elapsed = now - startTime;
    if (elapsed < fastingMs) {
      phase = "fasting";
      remaining = fastingMs - elapsed;
      progress = (elapsed / fastingMs) * 100;
    } else if (elapsed < totalCycleMs) {
      phase = "eating";
      remaining = totalCycleMs - elapsed;
      progress = ((elapsed - fastingMs) / eatingMs) * 100;
    } else {
      phase = "completed";
      remaining = 0;
      progress = 100;
    }
  }

  const startFast = useCallback(() => {
    const t = Date.now();
    const mId = mode;
    const mH = modeCfg.fastingH;
    setStartTime(t);
    setStatus("fasting");
    setNow(t);
    saveState({ status: "fasting", modeId: mId, modeH: mH, startTime: t });
  }, [mode, modeCfg.fastingH]);

  const endFast = useCallback(() => {
    if (startTime) {
      const fastedMs = now - startTime;
      const fastedH = Math.round(fastedMs / 3600000 * 10) / 10;
      const newStats = {
        completed: stats.completed + 1,
        totalHours: Math.round((stats.totalHours + fastedH) * 10) / 10,
        longestHours: Math.max(stats.longestHours, fastedH),
      };
      setStats(newStats);
      saveStats(newStats);
    }
    setStatus("idle");
    setStartTime(null);
    saveState({ status: "idle", modeId: mode, modeH: modeCfg.fastingH, startTime: null });
  }, [startTime, now, stats, mode, modeCfg.fastingH]);

  const resetStats = useCallback(() => {
    const empty = { completed: 0, totalHours: 0, longestHours: 0 };
    setStats(empty);
    saveStats(empty);
  }, []);

  const t = formatTime(remaining);

  const modeCardClasses = (isSelected) =>
    `flex-1 min-w-[60px] px-3 py-3 rounded-xl border-2 text-center cursor-pointer transition-all duration-200 ${
      isSelected
        ? "border-brand bg-brand-light text-brand font-semibold"
        : "border-border bg-[var(--bg-card)] text-text-muted hover:border-brand-light"
    }`;

  return (
    <div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-text mb-3">Fasting Mode</label>
        <div className="flex flex-wrap gap-2">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => { if (status === "idle") setMode(m.id); }}
              className={modeCardClasses(mode === m.id)}
              disabled={status !== "idle"}
              title={m.desc}
            >
              <div className="text-sm font-bold">{m.label}</div>
              <div className="text-xs opacity-70 mt-0.5">{m.desc}</div>
            </button>
          ))}
        </div>
        {status !== "idle" && (
          <p className="text-xs text-text-muted mt-2">Mode locked while a fast is in progress.</p>
        )}
      </div>

      {status === "idle" && (
        <div className="bg-[var(--bg-soft)] rounded-xl p-8 border border-border text-center mb-6">
          <p className="text-text-muted text-sm mb-4">Ready to start your {modeCfg.desc} fast?</p>
          <button
            onClick={startFast}
            className="px-8 py-3 rounded-xl bg-brand text-white font-semibold text-base hover:opacity-90 transition-all cursor-pointer"
          >
            Start Fast
          </button>
        </div>
      )}

      {(status !== "idle" && hydrated) && (
        <div className="bg-[var(--bg-soft)] rounded-xl p-6 border border-border mb-6">
          <div className="text-center mb-4">
            <div className={`text-xs uppercase tracking-wide font-semibold mb-1 ${
              phase === "fasting" ? "text-blue-400" : phase === "eating" ? "text-green-400" : "text-text-muted"
            }`}>
              {phase === "fasting" ? "Fasting" : phase === "eating" ? "Eating Window" : "Fast Complete"}
            </div>
            <div className="text-4xl md:text-5xl font-bold text-text tabular-nums tracking-wider my-3">
              {pad(t.h)}:{pad(t.m)}:{pad(t.s)}
            </div>
            <div className="text-sm text-text-muted">
              {phase === "fasting"
                ? `of ${modeCfg.fastingH}h fast remaining`
                : phase === "eating"
                  ? `of ${modeCfg.eatingH}h eating window remaining`
                  : "Time for your next fast!"}
            </div>
          </div>

          <div className="h-4 bg-[var(--bg-card)] rounded-full overflow-hidden border border-border mb-4">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                phase === "fasting" ? "bg-blue-400" : phase === "eating" ? "bg-green-400" : "bg-brand"
              }`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>

          <div className="flex justify-between text-xs text-text-muted mb-4">
            <span>Start</span>
            <span>{phase === "fasting" ? "Fasting" : phase === "eating" ? "Eating" : "Done"}</span>
            <span>{phase === "fasting" ? `${modeCfg.fastingH}h` : phase === "eating" ? `${modeCfg.eatingH}h` : "Complete"}</span>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={endFast}
              className="px-5 py-2.5 rounded-lg border border-red-400 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all cursor-pointer text-sm font-medium"
            >
              End Fast
            </button>
          </div>
        </div>
      )}

      {!hydrated && status !== "idle" && (
        <div className="bg-[var(--bg-soft)] rounded-xl p-8 border border-border text-center mb-6">
          <div className="w-8 h-8 mx-auto border-4 border-border rounded-full animate-spin border-t-brand mb-3" />
        </div>
      )}

      <section className="mt-10">
        <h2 className="text-lg font-bold text-text mb-4">Your Fasting Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="bg-[var(--bg-soft)] rounded-xl p-4 text-center border border-border">
            <div className="text-xs text-text-muted uppercase tracking-wide mb-1">Completed</div>
            <div className="text-2xl font-bold text-text">{stats.completed}</div>
            <div className="text-xs text-text-muted">fasts</div>
          </div>
          <div className="bg-[var(--bg-soft)] rounded-xl p-4 text-center border border-border">
            <div className="text-xs text-text-muted uppercase tracking-wide mb-1">Total Hours</div>
            <div className="text-2xl font-bold text-text">{stats.totalHours}</div>
            <div className="text-xs text-text-muted">fasted</div>
          </div>
          <div className="bg-[var(--bg-soft)] rounded-xl p-4 text-center border border-border">
            <div className="text-xs text-text-muted uppercase tracking-wide mb-1">Longest Fast</div>
            <div className="text-2xl font-bold text-text">{stats.longestHours}</div>
            <div className="text-xs text-text-muted">hours</div>
          </div>
        </div>
        {stats.completed > 0 && (
          <button
            onClick={resetStats}
            className="text-xs text-text-muted hover:text-red-400 transition-colors cursor-pointer"
          >
            Reset Stats
          </button>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-text mb-4">About These Fasting Protocols</h2>
        <div className="space-y-3">
          {modes.map((m) => (
            <div key={m.id} className="bg-[var(--bg-soft)] rounded-xl border border-border p-4">
              <h3 className="font-semibold text-text text-sm mb-1">{m.label} — {m.desc}</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                {m.id === "16:8" && "The most popular and beginner-friendly protocol. Fast for 16 hours and eat all your meals within an 8-hour window. A common approach is skipping breakfast and eating between 12 PM and 8 PM."}
                {m.id === "18:6" && "A moderate protocol that extends the fasting window to 18 hours with a 6-hour eating window. Often chosen by those who have adapted to 16:8 and want more fasting time for deeper ketosis."}
                {m.id === "20:4" && "A more advanced protocol with a 4-hour eating window (often called the Warrior Diet). Typically involves one large meal and a small snack within the window."}
                {m.id === "omad" && "One Meal A Day — the most intense standard protocol. Eat all your daily calories in a single meal within a 1-hour window. Requires significant adaptation and nutrient-dense eating to meet nutritional needs."}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-text mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <details className="bg-[var(--bg-soft)] rounded-xl border border-border p-4 group">
            <summary className="font-semibold text-text cursor-pointer list-none flex items-center justify-between">
              What can I consume while fasting?
              <span className="text-text-muted text-xl transition-transform group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-3 text-sm text-text-muted leading-relaxed">
              Water, black coffee, and unsweetened tea are generally considered acceptable during
              fasting windows. Some people also allow bone broth or apple cider vinegar. Anything
              with significant calories (above ~10-15 kcal) will break the fasted state.
            </p>
          </details>
          <details className="bg-[var(--bg-soft)] rounded-xl border border-border p-4 group">
            <summary className="font-semibold text-text cursor-pointer list-none flex items-center justify-between">
              How long does it take to adapt to intermittent fasting?
              <span className="text-text-muted text-xl transition-transform group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-3 text-sm text-text-muted leading-relaxed">
              Most people adapt to 16:8 within 1-2 weeks. During the adaptation period, you may
              experience hunger, irritability, and lower energy. Staying hydrated and keeping busy
              during the fasting window helps. Start with 12:12 and gradually increase the fasting
              window.
            </p>
          </details>
          <details className="bg-[var(--bg-soft)] rounded-xl border border-border p-4 group">
            <summary className="font-semibold text-text cursor-pointer list-none flex items-center justify-between">
              Will I lose muscle while fasting?
              <span className="text-text-muted text-xl transition-transform group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-3 text-sm text-text-muted leading-relaxed">
              Research shows that intermittent fasting preserves muscle mass as effectively as
              traditional calorie restriction when protein intake is adequate (1.6-2.2g per kg
              of body weight). Strength training during the eating window further protects muscle.
            </p>
          </details>
          <details className="bg-[var(--bg-soft)] rounded-xl border border-border p-4 group">
            <summary className="font-semibold text-text cursor-pointer list-none flex items-center justify-between">
              Can I exercise while fasting?
              <span className="text-text-muted text-xl transition-transform group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-3 text-sm text-text-muted leading-relaxed">
              Yes. Many people perform well training in a fasted state, especially for low-to-moderate
              intensity cardio. High-intensity or heavy strength training is typically better performed
              during or near the eating window for optimal performance and recovery.
            </p>
          </details>
          <details className="bg-[var(--bg-soft)] rounded-xl border border-border p-4 group">
            <summary className="font-semibold text-text cursor-pointer list-none flex items-center justify-between">
              Is intermittent fasting safe for everyone?
              <span className="text-text-muted text-xl transition-transform group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-3 text-sm text-text-muted leading-relaxed">
              Intermittent fasting is safe for most healthy adults, but not recommended for pregnant
              or breastfeeding women, individuals with a history of eating disorders, people with
              diabetes on medication, or those who are underweight. Consult a healthcare professional
              before starting any fasting regimen.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
}
