"use client";
import { useState, useMemo } from "react";
import { currencies } from "@/data/currencies.js";

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export default function SavingsGoalTracker() {
  const [goalAmount, setGoalAmount] = useState("");
  const [savedSoFar, setSavedSoFar] = useState("");
  const [monthlySave, setMonthlySave] = useState("");
  const [currency, setCurrency] = useState("$");
  const result = useMemo(() => {
    const goal = parseFloat(goalAmount) || 0;
    const saved = parseFloat(savedSoFar) || 0;
    const monthly = parseFloat(monthlySave) || 0;

    const remaining = Math.max(0, goal - saved);
    const months = monthly > 0 ? Math.ceil(remaining / monthly) : 0;
    const progressPercent = goal > 0 ? Math.min(100, (saved / goal) * 100) : 0;

    const now = new Date();
    now.setMonth(now.getMonth() + months);
    const completionDate =
      months > 0
        ? `${monthNames[now.getMonth()]} ${now.getFullYear()}`
        : "";

    return {
      remaining,
      months,
      completionDate,
      progressPercent,
    };
  }, [goalAmount, savedSoFar, monthlySave]);

  const formatCurrency = (value) => {
    return `${currency}${value.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            Savings Goal
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
              {currency}
            </span>
            <input
              type="number"
              min="0"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
              placeholder="10000"
              className="w-full px-4 py-3 pl-10 rounded-lg border border-border focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-text bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">
            Saved So Far
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
              {currency}
            </span>
            <input
              type="number"
              min="0"
              value={savedSoFar}
              onChange={(e) => setSavedSoFar(e.target.value)}
              placeholder="2500"
              className="w-full px-4 py-3 pl-10 rounded-lg border border-border focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-text bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">
            Monthly Savings
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
              {currency}
            </span>
            <input
              type="number"
              min="0"
              value={monthlySave}
              onChange={(e) => setMonthlySave(e.target.value)}
              placeholder="500"
              className="w-full px-4 py-3 pl-10 rounded-lg border border-border focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-text bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">
            Currency
          </label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-text bg-white"
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.symbol}>
                {c.code} {c.symbol} — {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-2xl border border-border shadow-card p-6 md:p-8">
        <h3 className="font-semibold text-text mb-6 text-lg text-center">
          🎯 Savings Progress
        </h3>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-text-muted">Progress</span>
            <span className="text-sm font-bold text-brand">
              {Math.round(result.progressPercent)}% complete
            </span>
          </div>
          <div className="w-full h-4 bg-bg-soft rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand to-brand-dark transition-all duration-500 ease-out"
              style={{ width: `${result.progressPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-bg-soft rounded-xl p-5 text-center border border-border">
            <div className="text-sm text-text-muted mb-1">Remaining</div>
            <div className="text-2xl font-extrabold text-text">
              {formatCurrency(result.remaining)}
            </div>
          </div>
          <div className="bg-bg-soft rounded-xl p-5 text-center border border-border">
            <div className="text-sm text-text-muted mb-1">Months Needed</div>
            <div className="text-2xl font-extrabold text-brand">
              {result.months || "—"}
            </div>
          </div>
          {result.completionDate && (
            <div className="bg-bg-soft rounded-xl p-5 text-center border border-border">
              <div className="text-sm text-text-muted mb-1">Est. Completion</div>
              <div className="text-2xl font-extrabold text-text">
                {result.completionDate}
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="p-5 bg-brand-light rounded-xl">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted">Goal</span>
              <span className="font-semibold text-text">
                {formatCurrency(parseFloat(goalAmount) || 0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Saved</span>
              <span className="font-semibold text-green-600">
                {formatCurrency(parseFloat(savedSoFar) || 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
