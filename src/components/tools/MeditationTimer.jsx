"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const soundOptions = [
  { value: "none", label: "None" },
  { value: "white", label: "White Noise" },
  { value: "pink", label: "Pink Noise" },
  { value: "brown", label: "Brown Noise" },
  { value: "rain", label: "Rain" },
  { value: "ocean", label: "Ocean Waves" },
];

const presetTimes = [
  { value: 3, label: "3 min" },
  { value: 5, label: "5 min" },
  { value: 10, label: "10 min", recommended: true },
  { value: 15, label: "15 min" },
  { value: 20, label: "20 min" },
  { value: 30, label: "30 min" },
];

const bellIntervals = [
  { value: 0, label: "No bells" },
  { value: 1, label: "Every minute" },
  { value: 3, label: "Every 3 min" },
  { value: 5, label: "Every 5 min" },
  { value: 10, label: "Every 10 min" },
];

const quotes = [
  "The mind is everything. What you think you become. — Buddha",
  "Peace comes from within. Do not seek it without. — Buddha",
  "In the midst of movement and chaos, keep stillness inside of you. — Deepak Chopra",
  "The present moment is filled with joy and happiness. If you are attentive, you will see it. — Thích Nhất Hạnh",
  "Quiet the mind, and the soul will speak. — Ma Jaya Sati Bhagavati",
  "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor. — Thích Nhất Hạnh",
  "Almost everything will work again if you unplug it for a few minutes, including you. — Anne Lamott",
  "Within you, there is a stillness and a sanctuary to which you can retreat at any time. — Hermann Hesse",
  "Breathe in deeply to bring your mind home to your body. — Thích Nhất Hạnh",
  "Meditation is not about stopping thoughts, but recognizing that we are more than our thoughts. — Jon Kabat-Zinn",
];

const openingChimes = [
  { label: "Opening", freq1: 523, freq2: 659, freq3: 784 },
  { label: "Soft", freq1: 432, freq2: 528 },
  { label: "Bowl", freq1: 396, freq2: 528, freq3: 639 },
];

let audioCtx = null;
let noiseNodes = [];

function getAudioCtx() {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch { /* ignore */ }
  }
  return audioCtx;
}

function playBell(freq = 528) {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 2.5);
  } catch { /* audio unavailable */ }
}

function playChime(freqs) {
  freqs.forEach((f, i) => {
    setTimeout(() => playBell(f), i * 200);
  });
}

function createNoiseBuffer(ctx, type) {
  const bufferSize = ctx.sampleRate * 4;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let b0, b1, b2, b3, b4, b5, b6;
  let white;

  for (let i = 0; i < bufferSize; i++) {
    white = Math.random() * 2 - 1;

    if (type === "white") {
      data[i] = white * 0.4;
    } else if (type === "pink") {
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    } else if (type === "brown") {
      white = white * 0.5;
      b0 = 0.9 * b0 + white;
      data[i] = b0 * 0.5;
    } else if (type === "rain") {
      const mod = 0.5 + 0.5 * Math.sin(i / 8000);
      data[i] = ((Math.random() * 2 - 1) * 0.3 + Math.sin(i * 0.002) * 0.05) * mod;
    } else {
      const mod = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(i / 15000));
      data[i] = (Math.random() * 2 - 1) * 0.15 * mod + Math.sin(i * 0.003) * 0.03;
    }
  }

  return buffer;
}

function startAmbient(type) {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    stopAmbient();

    const buffer = createNoiseBuffer(ctx, type);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 2);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(type === "brown" ? 300 : type === "pink" ? 800 : type === "rain" ? 1500 : 2000, ctx.currentTime);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();

    noiseNodes.push(source, gain, filter);
  } catch { /* ambient unavailable */ }
}

function stopAmbient() {
  noiseNodes.forEach((n) => {
    try {
      if (n.stop) n.stop();
      if (n.disconnect) n.disconnect();
    } catch { /* ignore */ }
  });
  noiseNodes = [];
}

export default function MeditationTimer() {
  const [duration, setDuration] = useState(10);
  const [ambient, setAmbient] = useState("none");
  const [bellInterval, setBellInterval] = useState(3);
  const [openingChime, setOpeningChime] = useState("opening");

  const [status, setStatus] = useState("idle");
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [quotesIdx, setQuotesIdx] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const intervalRef = useRef(null);
  const bellCountRef = useRef(0);
  const containerRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimeLeft(duration * 60);
  }, [duration]);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const startMeditation = useCallback(() => {
    setStatus("active");
    setTimeLeft(duration * 60);
    bellCountRef.current = 0;
    setQuotesIdx(Math.floor(Math.random() * quotes.length));

    const chime = openingChimes.find((c) => c.label === openingChime) || openingChimes[0];
    setTimeout(() => playChime(chime.freq1 ? [chime.freq1] : [432]), 500);

    if (ambient !== "none") {
      setTimeout(() => startAmbient(ambient), 1000);
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          playChime([528, 659, 784, 880]);
          stopAmbient();
          setStatus("completed");
          return 0;
        }
        return prev - 1;
      });

      bellCountRef.current += 1;
      if (bellInterval > 0 && bellCountRef.current % (bellInterval * 60) === 0) {
        playBell(528);
        setQuotesIdx(Math.floor(Math.random() * quotes.length));
      }
    }, 1000);
  }, [duration, ambient, bellInterval, openingChime]);

  const pauseMeditation = useCallback(() => {
    clearInterval(intervalRef.current);
    setStatus("paused");
    stopAmbient();
  }, []);

  const resumeMeditation = useCallback(() => {
    setStatus("active");

    if (ambient !== "none") startAmbient(ambient);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          playChime([528, 659, 784, 880]);
          stopAmbient();
          setStatus("completed");
          return 0;
        }
        return prev - 1;
      });

      bellCountRef.current += 1;
      if (bellInterval > 0 && bellCountRef.current % (bellInterval * 60) === 0) {
        playBell(528);
        setQuotesIdx(Math.floor(Math.random() * quotes.length));
      }
    }, 1000);
  }, [ambient, bellInterval]);

  const stopMeditation = useCallback(() => {
    clearInterval(intervalRef.current);
    stopAmbient();
    setStatus("idle");
    setTimeLeft(duration * 60);
  }, [duration]);

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
    return () => {
      clearInterval(intervalRef.current);
      stopAmbient();
    };
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const elapsedSecs = duration * 60 - timeLeft;
  const pctComplete = Math.min(100, (elapsedSecs / (duration * 60)) * 100);

  return (
    <div ref={containerRef} className={`transition-all duration-500 ${isFullscreen ? "fixed inset-0 z-50 bg-[var(--bg-card)] flex items-center justify-center" : ""}`}>
      <div className={`w-full ${isFullscreen ? "max-w-lg mx-auto px-8" : ""}`}>
        {status === "idle" && !isFullscreen && (
          <>
            <div className="mb-5">
              <label className="block text-sm font-medium text-text mb-3">Duration</label>
              <div className="flex flex-wrap gap-1.5">
                {presetTimes.map((t) => (
                  <button key={t.value} onClick={() => { setDuration(t.value); setTimeLeft(t.value * 60); }} className={`px-3 py-2 rounded-lg text-xs font-medium border-2 transition-all cursor-pointer ${duration === t.value ? "border-brand bg-brand-light text-brand" : "border-border bg-[var(--bg-card)] text-text-muted hover:border-brand-light"}`} aria-pressed={duration === t.value}>{t.label}{t.recommended ? " ★" : ""}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              <div>
                <label className="block text-xs font-medium text-text mb-2">Ambient Sound</label>
                <select value={ambient} onChange={(e) => setAmbient(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-border bg-[var(--bg-card)] text-text text-sm focus:border-brand focus:outline-none" aria-label="Ambient sound">
                  {soundOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-text mb-2">Interval Bell</label>
                <select value={bellInterval} onChange={(e) => setBellInterval(parseInt(e.target.value, 10))} className="w-full px-3 py-2.5 rounded-lg border border-border bg-[var(--bg-card)] text-text text-sm focus:border-brand focus:outline-none" aria-label="Bell interval">
                  {bellIntervals.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-text mb-2">Opening Chime</label>
                <select value={openingChime} onChange={(e) => setOpeningChime(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-border bg-[var(--bg-card)] text-text text-sm focus:border-brand focus:outline-none" aria-label="Opening chime">
                  {openingChimes.map((c) => <option key={c.label} value={c.label}>{c.label}</option>)}
                </select>
              </div>
            </div>

            <button onClick={startMeditation} className="w-full py-3.5 rounded-xl bg-brand text-white font-medium hover:bg-brand-dark transition-all cursor-pointer text-base shadow-md">
              Begin Meditation
            </button>
          </>
        )}

        {(status === "active" || status === "paused" || status === "completed") && (
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative flex items-center justify-center mb-6">
              <svg className="w-40 h-40 md:w-48 md:h-48 -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="var(--border)" strokeWidth="4" />
                <circle cx="60" cy="60" r="52" fill="none" stroke="var(--brand)" strokeWidth="4" strokeDasharray={`${2 * Math.PI * 52}`} strokeDashoffset={`${2 * Math.PI * 52 * (1 - pctComplete / 100)}`} strokeLinecap="round" className="transition-all duration-1000" />
                <circle cx="60" cy="60" r="42" fill="none" stroke="var(--border)" strokeWidth="0.5" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-3xl md:text-4xl font-bold text-text font-mono tracking-wider">{formatTime(timeLeft)}</div>
                <div className="text-xs text-text-muted mt-1">
                  {status === "active" && "Meditating"}
                  {status === "paused" && "Paused"}
                  {status === "completed" && "Complete"}
                </div>
              </div>
            </div>

            <p className="text-sm text-text-muted italic text-center max-w-sm mb-4 leading-relaxed">
              &ldquo;{quotes[quotesIdx % quotes.length]}&rdquo;
            </p>

            <div className="flex justify-center gap-3 mb-4">
              {status === "active" && (
                <button onClick={pauseMeditation} className="px-6 py-2.5 rounded-xl bg-yellow-500 text-white font-medium hover:bg-yellow-600 transition-all cursor-pointer text-sm">Pause</button>
              )}
              {status === "paused" && (
                <button onClick={resumeMeditation} className="px-6 py-2.5 rounded-xl bg-brand text-white font-medium hover:bg-brand-dark transition-all cursor-pointer text-sm">Resume</button>
              )}
              {status !== "completed" && (
                <button onClick={stopMeditation} className="px-6 py-2.5 rounded-xl border-2 border-red-400/40 text-red-400 font-medium hover:bg-red-500/10 transition-all cursor-pointer text-sm">Stop</button>
              )}
              {status === "completed" && (
                <button onClick={stopMeditation} className="px-6 py-2.5 rounded-xl bg-brand text-white font-medium hover:bg-brand-dark transition-all cursor-pointer text-sm">Finish</button>
              )}
            </div>

            <div className="w-full max-w-xs mx-auto mb-4">
              <div className="h-1 bg-[var(--bg-soft)] rounded-full overflow-hidden border border-border">
                <div className="h-full bg-brand rounded-full transition-all duration-500" style={{ width: `${pctComplete}%` }} />
              </div>
            </div>

            <button onClick={toggleFullscreen} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-text-muted hover:text-text hover:border-brand-light transition-all cursor-pointer text-xs">
              <span>{isFullscreen ? "✕ Exit Fullscreen" : "⛶ Fullscreen"}</span>
            </button>
          </div>
        )}

        <section className="mt-10">
          <h2 className="text-lg font-bold text-text mb-4">Meditation Tips for Beginners</h2>
          <div className="bg-[var(--bg-soft)] rounded-xl p-6 border border-border space-y-3 text-sm text-text-muted leading-relaxed">
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Start small:</strong> Begin with 3-5 minute sessions and gradually increase duration.</li>
              <li><strong>Comfortable posture:</strong> Sit with a straight spine — on a cushion, chair, or against a wall.</li>
              <li><strong>Focus on breath:</strong> When your mind wanders, gently return attention to your breath.</li>
              <li><strong>Consistency over duration:</strong> Daily practice is more valuable than occasional long sessions.</li>
              <li><strong>No wrong way:</strong> There is no such thing as a "bad" meditation — every session counts.</li>
              <li><strong>Use guided support:</strong> Interval bells and ambient sounds can help maintain focus.</li>
              <li><strong>Be patient:</strong> The benefits of meditation compound over weeks and months of practice.</li>
            </ul>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-bold text-text mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="bg-[var(--bg-soft)] rounded-xl border border-border p-4 group">
              <summary className="font-semibold text-text cursor-pointer list-none flex items-center justify-between">
                What is the best time to meditate?
                <span className="text-text-muted text-xl transition-transform group-open:rotate-180">▾</span>
              </summary>
              <p className="mt-3 text-sm text-text-muted leading-relaxed">Morning meditation sets a calm tone for the day. Evening meditation helps release the day's stress. The best time is whatever time you can consistently practice.</p>
            </details>
            <details className="bg-[var(--bg-soft)] rounded-xl border border-border p-4 group">
              <summary className="font-semibold text-text cursor-pointer list-none flex items-center justify-between">
                Do I need to sit cross-legged?
                <span className="text-text-muted text-xl transition-transform group-open:rotate-180">▾</span>
              </summary>
              <p className="mt-3 text-sm text-text-muted leading-relaxed">No. You can meditate sitting on a chair, lying down, or even walking. The key is to be comfortable and alert. A straight spine helps maintain wakefulness.</p>
            </details>
            <details className="bg-[var(--bg-soft)] rounded-xl border border-border p-4 group">
              <summary className="font-semibold text-text cursor-pointer list-none flex items-center justify-between">
                What if I can't stop thinking?
                <span className="text-text-muted text-xl transition-transform group-open:rotate-180">▾</span>
              </summary>
              <p className="mt-3 text-sm text-text-muted leading-relaxed">This is completely normal — meditation is not about stopping thoughts but about noticing them without judgment. Each time you notice your mind wandering and bring it back, you are strengthening your meditation "muscle."</p>
            </details>
            <details className="bg-[var(--bg-soft)] rounded-xl border border-border p-4 group">
              <summary className="font-semibold text-text cursor-pointer list-none flex items-center justify-between">
                Are the ambient sounds generated locally?
                <span className="text-text-muted text-xl transition-transform group-open:rotate-180">▾</span>
              </summary>
              <p className="mt-3 text-sm text-text-muted leading-relaxed">Yes. All ambient sounds (white noise, pink noise, brown noise, rain, ocean) are generated in real time using the Web Audio API in your browser. No audio files are downloaded, and no internet connection is needed.</p>
            </details>
            <details className="bg-[var(--bg-soft)] rounded-xl border border-border p-4 group">
              <summary className="font-semibold text-text cursor-pointer list-none flex items-center justify-between">
                What is the interval bell?
                <span className="text-text-muted text-xl transition-transform group-open:rotate-180">▾</span>
              </summary>
              <p className="mt-3 text-sm text-text-muted leading-relaxed">The interval bell rings a gentle tone at regular intervals during your meditation. It serves as an anchor — when you hear the bell, gently check in with your breath and refocus your attention if your mind has wandered.</p>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}
