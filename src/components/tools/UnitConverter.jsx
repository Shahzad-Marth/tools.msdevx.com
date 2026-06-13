"use client";

import { useState, useMemo } from "react";

const CONVERSION_CATEGORIES = {
  length: {
    name: "Length",
    icon: "📏",
    units: [
      { id: "mm", name: "Millimeter", symbol: "mm", toBase: 0.001 },
      { id: "cm", name: "Centimeter", symbol: "cm", toBase: 0.01 },
      { id: "m", name: "Meter", symbol: "m", toBase: 1 },
      { id: "km", name: "Kilometer", symbol: "km", toBase: 1000 },
      { id: "in", name: "Inch", symbol: "in", toBase: 0.0254 },
      { id: "ft", name: "Foot", symbol: "ft", toBase: 0.3048 },
      { id: "yd", name: "Yard", symbol: "yd", toBase: 0.9144 },
      { id: "mi", name: "Mile", symbol: "mi", toBase: 1609.344 },
      { id: "nm", name: "Nautical Mile", symbol: "NM", toBase: 1852 },
    ],
    baseUnit: "m",
  },
  weight: {
    name: "Weight",
    icon: "⚖️",
    units: [
      { id: "mg", name: "Milligram", symbol: "mg", toBase: 0.000001 },
      { id: "g", name: "Gram", symbol: "g", toBase: 0.001 },
      { id: "kg", name: "Kilogram", symbol: "kg", toBase: 1 },
      { id: "t", name: "Metric Ton", symbol: "t", toBase: 1000 },
      { id: "oz", name: "Ounce", symbol: "oz", toBase: 0.0283495 },
      { id: "lb", name: "Pound", symbol: "lb", toBase: 0.453592 },
      { id: "st", name: "Stone", symbol: "st", toBase: 6.35029 },
      { id: "ton_us", name: "US Ton", symbol: "ton", toBase: 907.185 },
      { id: "ton_uk", name: "UK Ton", symbol: "ton", toBase: 1016.05 },
    ],
    baseUnit: "kg",
  },
  temperature: {
    name: "Temperature",
    icon: "🌡️",
    units: [
      { id: "c", name: "Celsius", symbol: "°C" },
      { id: "f", name: "Fahrenheit", symbol: "°F" },
      { id: "k", name: "Kelvin", symbol: "K" },
    ],
    baseUnit: "c",
  },
  area: {
    name: "Area",
    icon: "📐",
    units: [
      { id: "mm2", name: "Square Millimeter", symbol: "mm²", toBase: 0.000001 },
      { id: "cm2", name: "Square Centimeter", symbol: "cm²", toBase: 0.0001 },
      { id: "m2", name: "Square Meter", symbol: "m²", toBase: 1 },
      { id: "km2", name: "Square Kilometer", symbol: "km²", toBase: 1000000 },
      { id: "ha", name: "Hectare", symbol: "ha", toBase: 10000 },
      { id: "ac", name: "Acre", symbol: "ac", toBase: 4046.86 },
      { id: "in2", name: "Square Inch", symbol: "in²", toBase: 0.00064516 },
      { id: "ft2", name: "Square Foot", symbol: "ft²", toBase: 0.092903 },
      { id: "yd2", name: "Square Yard", symbol: "yd²", toBase: 0.836127 },
      { id: "mi2", name: "Square Mile", symbol: "mi²", toBase: 2589988.11 },
    ],
    baseUnit: "m2",
  },
  volume: {
    name: "Volume",
    icon: "🧊",
    units: [
      { id: "ml", name: "Milliliter", symbol: "mL", toBase: 0.001 },
      { id: "l", name: "Liter", symbol: "L", toBase: 1 },
      { id: "m3", name: "Cubic Meter", symbol: "m³", toBase: 1000 },
      { id: "tsp", name: "Teaspoon (US)", symbol: "tsp", toBase: 0.00492892 },
      { id: "tbsp", name: "Tablespoon (US)", symbol: "tbsp", toBase: 0.0147868 },
      { id: "floz", name: "Fluid Ounce (US)", symbol: "fl oz", toBase: 0.0295735 },
      { id: "cup", name: "Cup (US)", symbol: "cup", toBase: 0.236588 },
      { id: "pt", name: "Pint (US)", symbol: "pt", toBase: 0.473176 },
      { id: "qt", name: "Quart (US)", symbol: "qt", toBase: 0.946353 },
      { id: "gal", name: "Gallon (US)", symbol: "gal", toBase: 3.78541 },
      { id: "gal_uk", name: "Gallon (UK)", symbol: "gal", toBase: 4.54609 },
    ],
    baseUnit: "l",
  },
  speed: {
    name: "Speed",
    icon: "🚀",
    units: [
      { id: "mps", name: "Meters per Second", symbol: "m/s", toBase: 1 },
      { id: "kmph", name: "Kilometers per Hour", symbol: "km/h", toBase: 0.277778 },
      { id: "mph", name: "Miles per Hour", symbol: "mph", toBase: 0.44704 },
      { id: "kn", name: "Knots", symbol: "kn", toBase: 0.514444 },
      { id: "mach", name: "Mach (at sea level)", symbol: "Mach", toBase: 340.29 },
      { id: "c", name: "Speed of Light", symbol: "c", toBase: 299792458 },
    ],
    baseUnit: "mps",
  },
  time: {
    name: "Time",
    icon: "⏱️",
    units: [
      { id: "ms", name: "Millisecond", symbol: "ms", toBase: 0.001 },
      { id: "s", name: "Second", symbol: "s", toBase: 1 },
      { id: "min", name: "Minute", symbol: "min", toBase: 60 },
      { id: "h", name: "Hour", symbol: "h", toBase: 3600 },
      { id: "d", name: "Day", symbol: "d", toBase: 86400 },
      { id: "wk", name: "Week", symbol: "wk", toBase: 604800 },
      { id: "mo", name: "Month (30 days)", symbol: "mo", toBase: 2592000 },
      { id: "yr", name: "Year (365 days)", symbol: "yr", toBase: 31536000 },
    ],
    baseUnit: "s",
  },
  data: {
    name: "Digital Storage",
    icon: "💾",
    units: [
      { id: "bit", name: "Bit", symbol: "bit", toBase: 0.125 },
      { id: "b", name: "Byte", symbol: "B", toBase: 1 },
      { id: "kb", name: "Kilobyte", symbol: "KB", toBase: 1024 },
      { id: "mb", name: "Megabyte", symbol: "MB", toBase: 1048576 },
      { id: "gb", name: "Gigabyte", symbol: "GB", toBase: 1073741824 },
      { id: "tb", name: "Terabyte", symbol: "TB", toBase: 1099511627776 },
      { id: "pb", name: "Petabyte", symbol: "PB", toBase: 1125899906842624 },
      { id: "kib", name: "Kibibyte", symbol: "KiB", toBase: 1024 },
      { id: "mib", name: "Mebibyte", symbol: "MiB", toBase: 1048576 },
      { id: "gib", name: "Gibibyte", symbol: "GiB", toBase: 1073741824 },
    ],
    baseUnit: "b",
  },
};

function convertTemperature(value, from, to) {
  let celsius;

  switch (from) {
    case "c":
      celsius = value;
      break;
    case "f":
      celsius = (value - 32) * (5 / 9);
      break;
    case "k":
      celsius = value - 273.15;
      break;
    default:
      celsius = value;
  }

  switch (to) {
    case "c":
      return celsius;
    case "f":
      return celsius * (9 / 5) + 32;
    case "k":
      return celsius + 273.15;
    default:
      return celsius;
  }
}

function convertStandard(value, fromUnit, toUnit, units) {
  const fromData = units.find((u) => u.id === fromUnit);
  const toData = units.find((u) => u.id === toUnit);

  if (!fromData || !toData) return value;

  const baseValue = value * fromData.toBase;
  return baseValue / toData.toBase;
}

function formatNumber(value, precision = 10) {
  if (value === 0 || isNaN(value) || !isFinite(value)) return "0";

  if (Math.abs(value) < 0.000001 || Math.abs(value) > 999999999) {
    return value.toExponential(6);
  }

  const rounded = Number(value.toPrecision(precision));
  return rounded.toString();
}

function getUnitInfo(category, unitId) {
  const cat = CONVERSION_CATEGORIES[category];
  if (!cat) return null;
  return cat.units.find((u) => u.id === unitId);
}

const categoryOrder = ["length", "weight", "temperature", "area", "volume", "speed", "time", "data"];

export default function UnitConverter() {
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");
  const [inputValue, setInputValue] = useState("");
  const [copied, setCopied] = useState(false);

  const currentCategory = CONVERSION_CATEGORIES[category];
  const units = useMemo(() => currentCategory?.units || [], [currentCategory]);

  const result = useMemo(() => {
    if (inputValue === "" || inputValue === null) return null;

    const value = parseFloat(inputValue);
    if (isNaN(value)) return null;

    let converted;
    if (category === "temperature") {
      converted = convertTemperature(value, fromUnit, toUnit);
    } else {
      converted = convertStandard(value, fromUnit, toUnit, units);
    }

    const fromInfo = getUnitInfo(category, fromUnit);
    const toInfo = getUnitInfo(category, toUnit);

    return {
      inputValue: value,
      outputValue: converted,
      formattedOutput: formatNumber(converted),
      fromUnit: fromInfo,
      toUnit: toInfo,
    };
  }, [inputValue, category, fromUnit, toUnit, units]);

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const handleCategoryChange = (newCategory) => {
    const cat = CONVERSION_CATEGORIES[newCategory];
    setCategory(newCategory);
    setFromUnit(cat.units[0]?.id);
    setToUnit(cat.units[1]?.id || cat.units[0]?.id);
    setInputValue("");
  };

  const handleCopyResult = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.formattedOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
    }
  };

  const quickConversions = result
    ? units
        .filter((u) => u.id !== fromUnit)
        .slice(0, 8)
        .map((u) => {
          let val;
          if (category === "temperature") {
            val = convertTemperature(result.inputValue, fromUnit, u.id);
          } else {
            val = convertStandard(result.inputValue, fromUnit, u.id, units);
          }
          return { unit: u, value: formatNumber(val, 6) };
        })
    : [];

  return (
    <div>
      {/* Category Tabs */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-[var(--text)] mb-3">Category</label>
        <div className="flex flex-wrap gap-2">
          {categoryOrder.map((catId) => {
            const cat = CONVERSION_CATEGORIES[catId];
            const isActive = category === catId;
            return (
              <button
                key={catId}
                onClick={() => handleCategoryChange(catId)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border-2 ${
                  isActive
                    ? "border-brand bg-[var(--brand-light)] text-brand shadow-sm"
                    : "border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:border-brand/50 hover:text-[var(--text)]"
                }`}
              >
                <span>{cat.icon}</span>
                <span className="hidden sm:inline">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Converter Card */}
      <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] shadow-card p-6 md:p-8 mb-8">
        {/* From Section */}
        <div className="mb-4">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">From</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value..."
                className="w-full px-4 py-3.5 rounded-xl border-2 border-[var(--border)] focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-[var(--text)] bg-[var(--bg-card)] text-lg font-semibold"
              />
            </div>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="sm:w-48 px-4 py-3.5 rounded-xl border-2 border-[var(--border)] focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-[var(--text)] bg-[var(--bg-card)] font-medium"
            >
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center my-2">
          <button
            onClick={handleSwap}
            className="p-3 rounded-full bg-[var(--bg-soft)] border-2 border-[var(--border)] hover:border-brand hover:bg-[var(--brand-light)] transition-all group"
            title="Swap units"
          >
            <span className="text-xl group-hover:scale-110 transition-transform inline-block">⇅</span>
          </button>
        </div>

        {/* To Section */}
        <div className="mb-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">To</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={result?.formattedOutput || ""}
                readOnly
                placeholder="Result"
                className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all text-lg font-bold ${
                  result
                    ? "border-brand bg-brand-light text-brand cursor-pointer"
                    : "border-border bg-bg-soft text-text-muted"
                }`}
                onClick={handleCopyResult}
                title={result ? "Click to copy" : ""}
              />
              {result && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-brand/70">
                  {copied ? "✓ Copied!" : "📋 Copy"}
                </span>
              )}
            </div>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="sm:w-48 px-4 py-3.5 rounded-xl border-2 border-border focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-text bg-white font-medium"
            >
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Formula Display */}
        {result && Math.abs(result.outputValue) < 1e15 && Math.abs(result.outputValue) > 1e-10 && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-text-muted text-center">
              <span className="font-mono">
                {result.inputValue} {result.fromUnit?.symbol} = {result.formattedOutput} {result.toUnit?.symbol}
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Quick Reference */}
      {result && quickConversions.length > 0 && (
        <div className="bg-white rounded-2xl border border-border shadow-card p-6 md:p-8">
          <h3 className="font-semibold text-text mb-4 text-base">
            Quick Conversions
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {quickConversions.map((qc) => (
              <div
                key={qc.unit.id}
                className="p-3 rounded-xl bg-bg-soft border border-border hover:border-brand/30 transition-all text-center"
              >
                <div className="text-lg font-bold text-brand font-mono">
                  {qc.value}
                </div>
                <div className="text-xs text-text-muted mt-0.5">
                  {qc.unit.symbol}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Numbers */}
      {!result && (
        <div className="bg-bg-soft rounded-xl p-5 border border-border">
          <p className="text-sm text-text-muted text-center">
            💡 Tip: Click on the result to copy it to clipboard. Use the swap button to reverse the conversion.
          </p>
        </div>
      )}
    </div>
  );
}
