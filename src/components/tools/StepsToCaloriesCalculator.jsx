"use client";

import { useState, useMemo, useCallback } from "react";
import { ResultBox } from "@/components/ui";

const speeds = [
  { value: "slow", label: "Slow", desc: "~2 mph / 3.2 kph", met: 2.8, stepsPerMin: 80, stepLengthM: 0.6 },
  { value: "moderate", label: "Moderate", desc: "~3 mph / 4.8 kph", met: 3.5, stepsPerMin: 100, stepLengthM: 0.7 },
  { value: "fast", label: "Fast", desc: "~4 mph / 6.4 kph", met: 5.0, stepsPerMin: 120, stepLengthM: 0.8 },
  { value: "very-fast", label: "Very Fast", desc: "~5 mph / 8.0 kph", met: 8.0, stepsPerMin: 140, stepLengthM: 0.9 },
];

const comparisons = [
  { label: "Apple slice", calories: 5 },
  { label: "Banana", calories: 105 },
  { label: "Egg (large)", calories: 70 },
  { label: "Chicken breast (100g)", calories: 165 },
  { label: "Slice of pizza", calories: 285 },
  { label: "Cheeseburger", calories: 540 },
];

export default function StepsToCaloriesCalculator() {
  const [unit, setUnit] = useState("metric");
  const [steps, setSteps] = useState("");
  const [weight, setWeight] = useState("");
  const [speed, setSpeed] = useState("moderate");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const stepsNum = parseInt(steps, 10);
    const weightNum = parseFloat(weight);
    if (!steps || !weight || isNaN(stepsNum) || isNaN(weightNum) || stepsNum <= 0 || weightNum <= 0) return null;

    const weightKg = unit === "metric" ? weightNum : weightNum * 0.453592;
    const speedCfg = speeds.find((s) => s.value === speed) || speeds[1];

    const timeMinutes = Math.round((stepsNum / speedCfg.stepsPerMin) * 10) / 10;
    const calories = Math.round((speedCfg.met * 3.5 * weightKg / 200) * timeMinutes);
    const distanceKm = Math.round(stepsNum * speedCfg.stepLengthM / 1000 * 100) / 100;
    const distanceMiles = Math.round(distanceKm * 0.621371 * 100) / 100;
    const distanceFeet = Math.round(stepsNum * speedCfg.stepLengthM * 3.28084);
    const hours = Math.floor(timeMinutes / 60);
    const mins = Math.round(timeMinutes % 60);

    const foodComp = comparisons.map((f) => ({
      ...f,
      servings: Math.round((calories / f.calories) * 10) / 10,
    }));

    return {
      steps: stepsNum,
      calories,
      distanceKm,
      distanceMiles,
      distanceFeet,
      timeMinutes,
      timeDisplay: hours > 0 ? `${hours}h ${mins}m` : `${mins}m`,
      speedLabel: speedCfg.label,
      foodComp,
      stepsPerDay7: stepsNum * 7,
      caloriesPerDay7: calories * 7,
      weightKg: Math.round(weightKg * 10) / 10,
    };
  }, [steps, weight, unit, speed]);

  const handleCopy = useCallback(async () => {
    if (!result) return;
    const lines = [
      "Steps to Calories Results:",
      `Steps: ${result.steps.toLocaleString()}`,
      `Calories burned: ${result.calories}`,
      `Distance: ${result.distanceKm} km (${result.distanceMiles} miles)`,
      `Time: ${result.timeDisplay}`,
      `Speed: ${result.speedLabel}`,
    ];
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  }, [result]);

  const handleReset = useCallback(() => {
    setUnit("metric");
    setSteps("");
    setWeight("");
    setSpeed("moderate");
    setCopied(false);
  }, []);

  const inputClasses = "w-full px-4 py-3 rounded-lg border border-border bg-[var(--bg-card)] text-text placeholder:text-text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-base";
  const labelClasses = "block text-sm font-medium text-text mb-2";
  const selectCardClasses = (isSelected) =>
    `flex-1 min-w-[80px] px-3 py-3 rounded-xl border-2 text-center cursor-pointer transition-all duration-200 ${
      isSelected
        ? "border-brand bg-brand-light text-brand font-semibold"
        : "border-border bg-[var(--bg-card)] text-text-muted hover:border-brand-light"
    }`;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
        <div>
          <label className={labelClasses}>Steps Walked</label>
          <input
            type="number"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            placeholder="e.g. 10000"
            min="0"
            className={inputClasses}
            aria-label="Number of steps"
          />
        </div>

        <div>
          <label className={labelClasses}>
            Weight ({unit === "metric" ? "kg" : "lbs"})
          </label>
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => setUnit("metric")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                unit === "metric"
                  ? "bg-brand text-white shadow-sm"
                  : "bg-bg-soft text-text-muted hover:text-text"
              }`}
              aria-pressed={unit === "metric"}
            >
              Metric
            </button>
            <button
              onClick={() => setUnit("imperial")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                unit === "imperial"
                  ? "bg-brand text-white shadow-sm"
                  : "bg-bg-soft text-text-muted hover:text-text"
              }`}
              aria-pressed={unit === "imperial"}
            >
              Imperial
            </button>
          </div>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder={unit === "metric" ? "e.g. 70" : "e.g. 154"}
            min="0"
            step="0.1"
            className={inputClasses}
            aria-label="Body weight"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className={labelClasses}>Walking Speed</label>
        <div className="flex flex-wrap gap-2">
          {speeds.map((s) => (
            <button
              key={s.value}
              onClick={() => setSpeed(s.value)}
              className={selectCardClasses(speed === s.value)}
              title={s.desc}
            >
              <div className="text-sm">{s.label}</div>
              <div className="text-xs opacity-70 mt-0.5">{s.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mt-4 mb-6">
        <button
          onClick={handleCopy}
          disabled={!result}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-text-muted hover:text-text hover:border-brand-light transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-sm"
        >
          {copied ? "Copied!" : "Copy Results"}
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-text-muted hover:text-text hover:border-red-400 transition-all cursor-pointer text-sm"
        >
          Reset
        </button>
      </div>

      <ResultBox show={result !== null}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-[var(--bg-soft)] rounded-xl p-4 text-center border border-border">
            <div className="text-xs text-text-muted uppercase tracking-wide mb-1">Calories Burned</div>
            <div className="text-2xl font-bold text-text">{result?.calories?.toLocaleString()}</div>
            <div className="text-xs text-text-muted">kcal</div>
          </div>
          <div className="bg-[var(--bg-soft)] rounded-xl p-4 text-center border border-border">
            <div className="text-xs text-text-muted uppercase tracking-wide mb-1">Distance</div>
            <div className="text-2xl font-bold text-text">
              {unit === "metric" ? result?.distanceKm : result?.distanceMiles}
            </div>
            <div className="text-xs text-text-muted">{unit === "metric" ? "km" : "miles"}</div>
          </div>
          <div className="bg-[var(--bg-soft)] rounded-xl p-4 text-center border border-border">
            <div className="text-xs text-text-muted uppercase tracking-wide mb-1">Estimated Time</div>
            <div className="text-2xl font-bold text-text">{result?.timeDisplay}</div>
            <div className="text-xs text-text-muted">{result?.speedLabel} pace</div>
          </div>
        </div>

        <h3 className="text-base font-bold text-text mb-3">Weekly Projection</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="bg-[var(--bg-soft)] rounded-xl p-4 border border-border">
            <ResultBox show={true}>
              <div className="text-xs text-text-muted uppercase tracking-wide mb-1">Weekly Steps</div>
              <div className="text-lg font-bold text-text">{(result?.stepsPerDay7 || 0).toLocaleString()}</div>
            </ResultBox>
          </div>
          <div className="bg-[var(--bg-soft)] rounded-xl p-4 border border-border">
            <ResultBox show={true}>
              <div className="text-xs text-text-muted uppercase tracking-wide mb-1">Weekly Calories</div>
              <div className="text-lg font-bold text-text">{(result?.caloriesPerDay7 || 0).toLocaleString()}</div>
            </ResultBox>
          </div>
        </div>

        {result && result.calories > 0 && (
          <>
            <h3 className="text-base font-bold text-text mb-3">Food Equivalent</h3>
            <p className="text-xs text-text-muted mb-3">
              {result.calories} calories is roughly equivalent to:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
              {result.foodComp
                .filter((f) => f.servings >= 0.5)
                .slice(0, 6)
                .map((f, i) => (
                  <div key={i} className="bg-[var(--bg-soft)] rounded-lg p-3 border border-border flex justify-between items-center">
                    <div className="text-sm text-text">{f.label}</div>
                    <div className="text-sm font-bold text-brand">×{f.servings}</div>
                  </div>
                ))}
            </div>
          </>
        )}

        <div className="text-xs text-text-muted bg-[var(--bg-soft)] rounded-lg p-3 border border-border">
          Calories estimated using MET (Metabolic Equivalent of Task) values for walking. Individual results
          vary based on terrain, incline, and personal biomechanics.
        </div>
      </ResultBox>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-text mb-4">How It Works</h2>
        <div className="bg-[var(--bg-soft)] rounded-xl p-6 border border-border space-y-3 text-sm text-text-muted leading-relaxed">
          <p>This calculator estimates calories burned from walking using the <strong>MET (Metabolic Equivalent of Task)</strong> method — the same approach used in exercise science research.</p>
          <p><strong>Formula:</strong> Calories = MET × 3.5 × weight(kg) / 200 × time(minutes)</p>
          <p>The time is derived from your step count and walking speed. Step length and pace are estimated based on your selected speed:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Slow (2 mph):</strong> ~80 steps/min, ~2.8 METs</li>
            <li><strong>Moderate (3 mph):</strong> ~100 steps/min, ~3.5 METs</li>
            <li><strong>Fast (4 mph):</strong> ~120 steps/min, ~5.0 METs</li>
            <li><strong>Very Fast (5 mph):</strong> ~140 steps/min, ~8.0 METs</li>
          </ul>
          <p>Distance is calculated using an average step length for each speed, ranging from 0.6m (slow) to 0.9m (very fast).</p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-text mb-4">10,000 Steps: The Benchmark</h2>
        <div className="bg-[var(--bg-soft)] rounded-xl p-6 border border-border text-sm text-text-muted leading-relaxed">
          <p>Walking 10,000 steps per day (roughly 5 miles / 8 km) is a widely recognized health benchmark. For a 70 kg (154 lb) person walking at a moderate pace, 10,000 steps burns approximately <strong>300-400 calories</strong> and takes about <strong>1 hour 40 minutes</strong>.</p>
          <p>While the 10,000-step goal originated as a marketing slogan for a Japanese pedometer in the 1960s, subsequent research has confirmed that higher step counts are associated with lower mortality rates, improved cardiovascular health, and better weight management.</p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-text mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <details className="bg-[var(--bg-soft)] rounded-xl border border-border p-4 group">
            <summary className="font-semibold text-text cursor-pointer list-none flex items-center justify-between">
              How accurate is this calculator?
              <span className="text-text-muted text-xl transition-transform group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-3 text-sm text-text-muted leading-relaxed">
              This calculator provides a solid estimate based on established MET values. Actual calorie burn
              varies based on terrain (hills burn more), walking surface (sand vs. pavement), individual
              walking efficiency, and environmental factors like wind resistance. Use this as a guideline,
              not a precise measurement.
            </p>
          </details>
          <details className="bg-[var(--bg-soft)] rounded-xl border border-border p-4 group">
            <summary className="font-semibold text-text cursor-pointer list-none flex items-center justify-between">
              How do I measure my step length?
              <span className="text-text-muted text-xl transition-transform group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-3 text-sm text-text-muted leading-relaxed">
              To measure your step length: walk 10 steps at your normal pace, measure the total distance
              from start to finish, and divide by 10. This calculator uses average step lengths (0.6-0.9m)
              based on speed, which are reasonably accurate for most people.
            </p>
          </details>
          <details className="bg-[var(--bg-soft)] rounded-xl border border-border p-4 group">
            <summary className="font-semibold text-text cursor-pointer list-none flex items-center justify-between">
              Does running give different results?
              <span className="text-text-muted text-xl transition-transform group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-3 text-sm text-text-muted leading-relaxed">
              Yes. Running burns significantly more calories per step due to higher impact, more muscle
              recruitment, and greater vertical oscillation. Running at 6 mph (~10 min/mile pace) has a
              MET value of about 9.8, roughly double that of brisk walking. This calculator is for walking only.
            </p>
          </details>
          <details className="bg-[var(--bg-soft)] rounded-xl border border-border p-4 group">
            <summary className="font-semibold text-text cursor-pointer list-none flex items-center justify-between">
              How many steps should I aim for per day?
              <span className="text-text-muted text-xl transition-transform group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-3 text-sm text-text-muted leading-relaxed">
              Research suggests that 7,000-10,000 steps per day is associated with significant health
              benefits. A 2019 study found that women who averaged 4,400 steps per day had lower mortality
              rates than those who took 2,700, with benefits plateauing around 7,500 steps. For weight loss,
              aim for 8,000-12,000 steps per day.
            </p>
          </details>
          <details className="bg-[var(--bg-soft)] rounded-xl border border-border p-4 group">
            <summary className="font-semibold text-text cursor-pointer list-none flex items-center justify-between">
              Does carrying weight (backpack) affect calorie burn?
              <span className="text-text-muted text-xl transition-transform group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-3 text-sm text-text-muted leading-relaxed">
              Yes. Carrying extra weight increases calorie burn because your body must work harder to move
              the additional load. You can account for this by adding the backpack weight to your body
              weight input. A loaded backpack (rucking) can increase calorie burn by 10-20%.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
}
