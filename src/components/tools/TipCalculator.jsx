"use client";
import { useState, useMemo } from "react";
import { currencies } from "@/data/currencies.js";

const tipOptions = [10, 15, 18, 20, 25];

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState("");
  const [currentTip, setCurrentTip] = useState(18);
  const [peopleCount, setPeopleCount] = useState("1");
  const [currency, setCurrency] = useState("$");
  const result = useMemo(() => {
    const bill = parseFloat(billAmount) || 0;
    const people = parseInt(peopleCount) || 1;

    const tip = bill * (currentTip / 100);
    const total = bill + tip;
    const perPerson = total / people;

    return { tip, total, perPerson };
  }, [billAmount, currentTip, peopleCount]);

  const formatCurrency = (value) => {
    return `${currency}${value.toFixed(2)}`;
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            Bill Amount
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
              {currency}
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              placeholder="0.00"
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

      {/* Tip Percentage Buttons */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-text mb-3">
          Tip Percentage
        </label>
        <div className="flex flex-wrap gap-3">
          {tipOptions.map((pct) => (
            <button
              key={pct}
              onClick={() => setCurrentTip(pct)}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                currentTip === pct
                  ? "bg-brand text-white"
                  : "bg-bg-soft text-text-muted hover:bg-border hover:text-text"
              }`}
            >
              {pct}%
            </button>
          ))}
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              max="100"
              value={currentTip}
              onChange={(e) => setCurrentTip(parseInt(e.target.value) || 0)}
              className="w-20 px-3 py-2.5 rounded-lg border border-border text-center text-text bg-white"
            />
            <span className="text-text-muted">%</span>
          </div>
        </div>
      </div>

      {/* Split */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-text mb-2">
          Split Between
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              setPeopleCount(Math.max(1, parseInt(peopleCount) - 1).toString())
            }
            className="w-10 h-10 rounded-lg bg-bg-soft flex items-center justify-center text-text font-bold hover:bg-border transition-colors"
          >
            −
          </button>
          <input
            type="number"
            min="1"
            value={peopleCount}
            onChange={(e) => setPeopleCount(e.target.value)}
            className="w-24 px-4 py-2.5 rounded-lg border border-border text-center text-lg font-semibold text-text bg-white"
          />
          <button
            onClick={() =>
              setPeopleCount((parseInt(peopleCount) + 1).toString())
            }
            className="w-10 h-10 rounded-lg bg-bg-soft flex items-center justify-center text-text font-bold hover:bg-border transition-colors"
          >
            +
          </button>
          <span className="text-text-muted ml-2">
            {parseInt(peopleCount) === 1 ? "person" : "people"}
          </span>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-2xl border border-border shadow-card p-6 md:p-8">
        <h3 className="font-semibold text-text mb-6 text-lg text-center">
          💵 Result
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-border">
            <span className="text-text-muted">Subtotal</span>
            <span className="font-semibold text-text">
              {formatCurrency(parseFloat(billAmount) || 0)}
            </span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-border">
            <span className="text-text-muted">
              Tip ({currentTip}%)
            </span>
            <span className="font-semibold text-brand">
              {formatCurrency(result.tip)}
            </span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-border">
            <span className="text-text font-semibold text-lg">Total</span>
            <span className="font-extrabold text-text text-xl">
              {formatCurrency(result.total)}
            </span>
          </div>
          {parseInt(peopleCount) > 1 && (
            <div className="flex justify-between items-center py-4">
              <span className="text-text font-semibold">Per Person</span>
              <span className="font-extrabold text-brand text-2xl">
                {formatCurrency(result.perPerson)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
