"use client";

import { useState, useMemo } from "react";

const commonPatterns = [
  "password", "123456", "12345678", "123456789", "qwerty", "abc123",
  "letmein", "admin", "welcome", "monkey", "dragon", "master", "111111",
  "password1", "iloveyou", "sunshine", "princess", "football", "trustno1",
  "shadow", "superman", "michael", "donald", "abcdef", "abcdefg", "passw0rd",
];

function getStrengthInfo(score) {
  if (score <= 1) {
    return { label: "Weak", color: "#cc0000", width: "20%" };
  } else if (score === 2) {
    return { label: "Fair", color: "#e68a00", width: "40%" };
  } else if (score <= 4) {
    return { label: "Good", color: "#3388ff", width: "65%" };
  } else {
    return { label: "Strong", color: "#1a7a1a", width: "100%" };
  }
}

const CheckItem = ({ pass, label }) => (
    <div className={`flex items-center gap-2 py-1.5 ${
      pass ? "text-green-600" : "text-gray-400"
    }`}>
      <span className="text-base font-bold">{pass ? "✓" : "✗"}</span>
      <span className="text-sm">{label}</span>
    </div>
  );

export default function PasswordStrengthChecker() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { checks, strength } = useMemo(() => {
    const pwd = password;

    const len = pwd.length >= 8;
    const upper = /[A-Z]/.test(pwd);
    const lower = /[a-z]/.test(pwd);
    const number = /[0-9]/.test(pwd);
    const symbol = /[^A-Za-z0-9]/.test(pwd);
    const common = !commonPatterns.some((w) => pwd.toLowerCase().indexOf(w) !== -1);

    const newChecks = {
      length: len,
      upper,
      lower,
      number,
      symbol,
      common: common && pwd.length > 0,
    };

    if (pwd.length === 0) {
      return {
        checks: newChecks,
        strength: { label: "Enter a password", color: "#e8e8f0", width: "0%" },
      };
    }

    let score = 0;
    if (len) score++;
    if (upper) score++;
    if (lower) score++;
    if (number) score++;
    if (symbol) score++;
    if (common && pwd.length > 0) score++;

    return {
      checks: newChecks,
      strength: getStrengthInfo(score),
    };
  }, [password]);

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      {/* Password Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-text mb-2">
          Enter Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type your password..."
            className="w-full px-4 py-3 pr-12 rounded-lg border border-border focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-text bg-white"
          />
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xl cursor-pointer hover:opacity-70 transition-opacity"
            title={showPassword ? "Hide password" : "Show password"}
          >
            👁️
          </button>
        </div>
      </div>

      {/* Strength Meter */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-text">Strength</span>
          <span
            className="text-sm font-bold"
            style={{ color: strength.color }}
          >
            {strength.label}
          </span>
        </div>
        <div className="w-full h-3 bg-bg-soft rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: strength.width, backgroundColor: strength.color }}
          />
        </div>
      </div>

      {/* Check List */}
      <div className="bg-white rounded-2xl border border-border shadow-card p-6">
        <h3 className="font-semibold text-text mb-4 text-lg">
          Password Requirements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <CheckItem pass={checks.length} label="8+ characters" />
          <CheckItem pass={checks.upper} label="Uppercase letter (A-Z)" />
          <CheckItem pass={checks.lower} label="Lowercase letter (a-z)" />
          <CheckItem pass={checks.number} label="Number (0-9)" />
          <CheckItem pass={checks.symbol} label="Special character (!@#$...)" />
          <CheckItem pass={checks.common} label="Not a common password" />
        </div>
      </div>
    </div>
  );
}
