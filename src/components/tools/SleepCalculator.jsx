"use client";

import { useState, useMemo } from "react";
import { ResultBox } from "@/components/ui";

export default function SleepCalculator() {
  const [wakeHour, setWakeHour] = useState(7);
  const [wakeMin, setWakeMin] = useState(0);
  const [ampm, setAmPm] = useState("AM");
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const result = useMemo(() => {
    let h = parseInt(wakeHour);
    let m = parseInt(wakeMin);

    if (ampm === "PM" && h !== 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;

    const wakeMinutes = h * 60 + m;
    const cycles = [6, 7.5, 9];

    const bedtimes = cycles.map((c) => {
      let sleepTime = wakeMinutes - c * 60;
      if (sleepTime < 0) sleepTime += 1440;
      const hh = Math.floor(sleepTime / 60);
      const mm = sleepTime % 60;
      const period = hh >= 12 ? "PM" : "AM";
      const h12 = hh % 12 || 12;
      return {
        time: `${h12}:${mm.toString().padStart(2, "0")} ${period}`,
        hours: c,
      };
    });

    return bedtimes;
  }, [wakeHour, wakeMin, ampm]);

  return (
    <div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-text mb-3">
          What time do you want to wake up?
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={wakeHour}
            onChange={(e) => setWakeHour(parseInt(e.target.value))}
            className="px-4 py-3 rounded-lg border border-border focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-text bg-white text-lg"
          >
            {hours.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>

          <span className="text-xl font-semibold text-text">:</span>

          <select
            value={wakeMin}
            onChange={(e) => setWakeMin(parseInt(e.target.value))}
            className="px-4 py-3 rounded-lg border border-border focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-text bg-white text-lg"
          >
            {minutes.map((m) => (
              <option key={m} value={m}>
                {m.toString().padStart(2, "0")}
              </option>
            ))}
          </select>

          <div className="flex bg-bg-soft rounded-lg p-1">
            <button
              onClick={() => setAmPm("AM")}
              className={`px-5 py-2.5 rounded-md font-semibold transition-all ${
                ampm === "AM"
                  ? "bg-brand text-white"
                  : "text-text-muted hover:text-text"
              }`}
            >
              AM
            </button>
            <button
              onClick={() => setAmPm("PM")}
              className={`px-5 py-2.5 rounded-md font-semibold transition-all ${
                ampm === "PM"
                  ? "bg-brand text-white"
                  : "text-text-muted hover:text-text"
              }`}
            >
              PM
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6 p-4 bg-bg-soft rounded-xl">
        <p className="text-sm text-text-muted text-center">
          💡 Tip: For optimal rest, complete 5-6 sleep cycles (90 minutes
          each).
        </p>
      </div>

      {result && (
        <ResultBox show={true}>
          <h3 className="font-semibold text-text mb-5 text-lg text-center">
            Best Bedtimes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {result.map((bedtime, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-xl text-center border ${
                  idx === 1
                    ? "bg-brand-light border-brand"
                    : "bg-white border-border"
                }`}
              >
                <div
                  className={`text-2xl font-extrabold mb-1 ${
                    idx === 1 ? "text-brand" : "text-text"
                  }`}
                >
                  {bedtime.time}
                </div>
                <div className="text-sm text-text-muted">
                  {bedtime.hours} hours sleep
                </div>
                {idx === 1 && (
                  <div className="text-xs text-brand font-semibold mt-2 uppercase tracking-wide">
                    Recommended
                  </div>
                )}
              </div>
            ))}
          </div>
        </ResultBox>
      )}
    </div>
  );
}
