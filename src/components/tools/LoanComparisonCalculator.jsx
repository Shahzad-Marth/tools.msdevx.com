"use client";
import { useState, useMemo } from "react";
import { currencies } from "@/data/currencies.js";

function calcLoanPayment(principal, annualRate, years) {
  if (principal <= 0 || years <= 0) return 0;
  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;
  if (monthlyRate === 0) return principal / months;
  const factor = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * factor) / (factor - 1);
}

export default function LoanComparisonCalculator() {
  const [currency, setCurrency] = useState("$");
  const [loans, setLoans] = useState([
    { amount: "", rate: "", years: 30 },
    { amount: "", rate: "", years: 30 },
    { amount: "", rate: "", years: 30 },
  ]);
  const results = useMemo(() => {
    return loans.map((loan, i) => {
      const amount = parseFloat(loan.amount) || 0;
      const rate = parseFloat(loan.rate) || 0;
      const years = parseFloat(loan.years) || 1;

      const payment = calcLoanPayment(amount, rate, years);
      const months = years * 12;
      const totalPaid = payment * months;
      const totalInterest = totalPaid - amount;

      return {
        payment,
        totalInterest,
        totalCost: totalPaid,
      };
    });
  }, [loans]);

  const updateLoan = (index, field, value) => {
    const newLoans = [...loans];
    newLoans[index][field] = value;
    setLoans(newLoans);
  };

  const formatCurrency = (value, decimals = 2) => {
    return `${currency}${value.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}`;
  };

  const loanColors = ["#1e40af", "#0b74de", "#1a7a1a"];

  return (
    <div>
      {/* Currency */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-text mb-2">
          Currency
        </label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full md:w-64 px-4 py-3 rounded-lg border border-border focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-text bg-white"
        >
          {currencies.map((c) => (
            <option key={c.code} value={c.symbol}>
              {c.code} {c.symbol} — {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {loans.map((loan, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border-2 p-6 shadow-card"
            style={{ borderColor: loanColors[i] }}
          >
            <h3
              className="font-bold text-lg mb-4 pb-3 border-b"
              style={{ color: loanColors[i], borderColor: "#e8e8f0" }}
            >
              Loan Option {i + 1}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Loan Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">
                    {currency}
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={loan.amount}
                    onChange={(e) => updateLoan(i, "amount", e.target.value)}
                    placeholder="250000"
                    className="w-full px-3 py-2.5 pl-10 rounded-lg border border-border text-text bg-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={loan.rate}
                  onChange={(e) => updateLoan(i, "rate", e.target.value)}
                  placeholder="6.5"
                  className="w-full px-3 py-2.5 rounded-lg border border-border text-text bg-white text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Term (Years)
                </label>
                <input
                  type="number"
                  min="1"
                  value={loan.years}
                  onChange={(e) => updateLoan(i, "years", e.target.value)}
                  placeholder="30"
                  className="w-full px-3 py-2.5 rounded-lg border border-border text-text bg-white text-sm"
                />
              </div>
            </div>

            {/* Results for this loan */}
            {parseFloat(loan.amount) > 0 && (
              <div
                className="mt-5 pt-4 border-t"
                style={{ borderColor: "#e8e8f0" }}
              >
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Monthly</span>
                    <span
                      className="font-bold text-lg"
                      style={{ color: loanColors[i] }}
                    >
                      {formatCurrency(results[i].payment)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Total Interest</span>
                    <span className="font-semibold text-text">
                      {formatCurrency(results[i].totalInterest)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Total Cost</span>
                    <span className="font-semibold text-text">
                      {formatCurrency(results[i].totalCost)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Comparison Summary */}
      {(parseFloat(loans[0].amount) > 0 ||
        parseFloat(loans[1].amount) > 0 ||
        parseFloat(loans[2].amount) > 0) && (
        <div className="bg-white rounded-2xl border border-border shadow-card p-6 md:p-8">
          <h3 className="font-semibold text-text mb-6 text-lg text-center">
            📉 Side-by-Side Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-text-muted font-medium">
                    Comparison
                  </th>
                  {loans.map((loan, i) =>
                    parseFloat(loan.amount) > 0 ? (
                      <th
                        key={i}
                        className="text-center py-3 px-4 font-bold"
                        style={{ color: loanColors[i] }}
                      >
                        Option {i + 1}
                      </th>
                    ) : null
                  )}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 text-text-muted">Monthly Payment</td>
                  {loans.map((loan, i) =>
                    parseFloat(loan.amount) > 0 ? (
                      <td
                        key={i}
                        className="text-center py-3 px-4 font-semibold"
                        style={{ color: loanColors[i] }}
                      >
                        {formatCurrency(results[i].payment)}
                      </td>
                    ) : null
                  )}
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 text-text-muted">
                    Total Interest Paid
                  </td>
                  {loans.map((loan, i) =>
                    parseFloat(loan.amount) > 0 ? (
                      <td key={i} className="text-center py-3 px-4 font-semibold text-text">
                        {formatCurrency(results[i].totalInterest)}
                      </td>
                    ) : null
                  )}
                </tr>
                <tr>
                  <td className="py-3 px-4 text-text-muted">Total Cost</td>
                  {loans.map((loan, i) =>
                    parseFloat(loan.amount) > 0 ? (
                      <td key={i} className="text-center py-3 px-4 font-bold text-text">
                        {formatCurrency(results[i].totalCost)}
                      </td>
                    ) : null
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
