"use client";

import { useState, useCallback } from "react";

const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_-+=<>?[]{}|~:;";

const PRESETS = [
  {
    id: "easy",
    label: "Easy",
    sublabel: "Memorable",
    length: 8,
    options: { lowercase: true, uppercase: false, numbers: true, symbols: false },
    color: "red",
  },
  {
    id: "medium",
    label: "Medium",
    sublabel: "Balanced",
    length: 12,
    options: { lowercase: true, uppercase: true, numbers: true, symbols: false },
    color: "orange",
  },
  {
    id: "strong",
    label: "Strong",
    sublabel: "Secure",
    length: 16,
    options: { lowercase: true, uppercase: true, numbers: true, symbols: true },
    color: "blue",
  },
  {
    id: "maximum",
    label: "Maximum",
    sublabel: "Fort Knox",
    length: 32,
    options: { lowercase: true, uppercase: true, numbers: true, symbols: true },
    color: "green",
  },
];

function generatePassword(length, options) {
  let charset = "";
  let guaranteedChars = [];

  if (options.lowercase) {
    charset += LOWERCASE;
    guaranteedChars.push(LOWERCASE[Math.floor(Math.random() * LOWERCASE.length)]);
  }
  if (options.uppercase) {
    charset += UPPERCASE;
    guaranteedChars.push(UPPERCASE[Math.floor(Math.random() * UPPERCASE.length)]);
  }
  if (options.numbers) {
    charset += NUMBERS;
    guaranteedChars.push(NUMBERS[Math.floor(Math.random() * NUMBERS.length)]);
  }
  if (options.symbols) {
    charset += SYMBOLS;
    guaranteedChars.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
  }

  if (charset === "") return "";

  let password = "";
  const remainingLength = Math.max(0, length - guaranteedChars.length);
  for (let i = 0; i < remainingLength; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }

  const allChars = [...guaranteedChars, ...password];
  for (let i = allChars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allChars[i], allChars[j]] = [allChars[j], allChars[i]];
  }

  return allChars.join("");
}

function getStrengthInfo(password) {
  if (!password) {
    return { label: "Generate a password", color: "#e8e8f0", width: "0%" };
  }

  let score = 0;
  const len = password.length;

  if (len >= 8) score++;
  if (len >= 12) score++;
  if (len >= 16) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) {
    return { label: "Weak", color: "#cc0000", width: "20%" };
  } else if (score <= 4) {
    return { label: "Fair", color: "#e68a00", width: "45%" };
  } else if (score <= 6) {
    return { label: "Strong", color: "#3388ff", width: "70%" };
  } else {
    return { label: "Very Strong", color: "#1a7a1a", width: "100%" };
  }
}

const CharacterOption = ({ optionKey, label, example, options, handleOptionToggle }) => (
    <button
      onClick={() => handleOptionToggle(optionKey)}
      className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all w-full text-left ${
        options[optionKey]
          ? "border-brand bg-brand-light shadow-sm"
          : "border-border bg-white opacity-70 hover:opacity-100"
      }`}
    >
      <div
        className={`w-6 h-6 rounded-md flex items-center justify-center text-sm font-bold transition-all ${
          options[optionKey] ? "bg-brand text-white" : "bg-gray-100 border-2 border-gray-300"
        }`}
      >
        {options[optionKey] && "✓"}
      </div>
      <div>
        <span className={`font-semibold ${options[optionKey] ? "text-text" : "text-text-muted"}`}>
          {label}
        </span>
        <p className="text-xs text-text-muted font-mono">{example}</p>
      </div>
    </button>
  );

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activePreset, setActivePreset] = useState("strong");
  const [options, setOptions] = useState({
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
  });

  const strength = getStrengthInfo(password);

  const applyPreset = (preset) => {
    setOptions(preset.options);
    setLength(preset.length);
    setActivePreset(preset.id);
  };

  const handleGenerate = useCallback(() => {
    const atLeastOne = options.lowercase || options.uppercase || options.numbers || options.symbols;
    if (!atLeastOne) return;
    const newPassword = generatePassword(length, options);
    setPassword(newPassword);
    setCopied(false);
  }, [length, options]);

  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
    }
  };

  const handleOptionToggle = (key) => {
    const newOptions = { ...options, [key]: !options[key] };
    const atLeastOne = newOptions.lowercase || newOptions.uppercase || newOptions.numbers || newOptions.symbols;
    if (atLeastOne) {
      setOptions(newOptions);
      setActivePreset(null);
    }
  };

  return (
    <div>
      {/* Security Level Presets */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-text mb-3">Security Level</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                activePreset === preset.id
                  ? "border-brand bg-brand-light shadow-md"
                  : "border-border bg-white hover:border-brand/50"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">
                  {preset.id === "easy" && "🔓"}
                  {preset.id === "medium" && "🔒"}
                  {preset.id === "strong" && "🔐"}
                  {preset.id === "maximum" && "🏰"}
                </span>
                <span className={`font-bold text-base ${activePreset === preset.id ? "text-brand" : "text-text"}`}>
                  {preset.label}
                </span>
              </div>
              <p className="text-xs text-text-muted">{preset.sublabel} · {preset.length} chars</p>
            </button>
          ))}
        </div>
      </div>

      {/* Customization Section */}
      <div className="bg-bg-soft rounded-xl p-5 mb-6 border border-border">
        <p className="text-sm font-semibold text-text mb-4">Customize (Optional)</p>

        {/* Length */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-text">Length: <strong>{length}</strong> characters</span>
          </div>
          <input
            type="range"
            min={6}
            max={64}
            value={length}
            onChange={(e) => {
              setLength(Number(e.target.value));
              setActivePreset(null);
            }}
            className="w-full h-2 bg-white border border-border rounded-full appearance-none cursor-pointer accent-brand"
          />
          <div className="flex justify-between text-xs text-text-muted mt-1">
            <span>6</span>
            <span>32</span>
            <span>64</span>
          </div>
        </div>

        {/* Character Types */}
        <div>
          <span className="text-sm text-text mb-3 block">Character Types</span>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
             <CharacterOption key="lowercase" optionKey="lowercase" label="Lowercase" example="abcdef" options={options} handleOptionToggle={handleOptionToggle} />
             <CharacterOption key="uppercase" optionKey="uppercase" label="Uppercase" example="ABCDEF" options={options} handleOptionToggle={handleOptionToggle} />
             <CharacterOption key="numbers" optionKey="numbers" label="Numbers" example="123456" options={options} handleOptionToggle={handleOptionToggle} />
             <CharacterOption key="symbols" optionKey="symbols" label="Symbols" example="!@#$%^" options={options} handleOptionToggle={handleOptionToggle} />
           </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="mb-6">
        <button
          onClick={handleGenerate}
          className="w-full py-4 px-6 bg-brand text-white font-bold text-base rounded-xl hover:bg-brand-dark transition-all shadow-[0_4px_14px_rgba(30,64,175,0.25)] hover:shadow-[0_6px_20px_rgba(30,64,175,0.35)] active:scale-98"
        >
          🎲 Generate Password
        </button>
      </div>

      {/* Generated Password */}
      {password && (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-text mb-2">Generated Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              readOnly
              className="w-full px-5 py-4 pr-28 rounded-xl border-2 border-border bg-white text-text font-mono text-lg tracking-wide select-all focus:border-brand focus:outline-none"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 text-xl hover:opacity-70 transition-opacity rounded-lg hover:bg-bg-soft"
                title={showPassword ? "Hide" : "Show"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
              <button
                onClick={handleCopy}
                className={`p-2 text-xl hover:opacity-70 transition-opacity rounded-lg hover:bg-bg-soft ${copied ? "text-green-600 bg-green-50" : ""}`}
                title={copied ? "Copied!" : "Copy to clipboard"}
              >
                {copied ? "✓" : "📋"}
              </button>
            </div>
          </div>
          {copied && (
            <p className="text-sm text-green-600 mt-2 font-semibold">✓ Copied to clipboard!</p>
          )}
        </div>
      )}

      {/* Strength Meter */}
      {password && (
        <div className="bg-white rounded-xl border border-border shadow-card p-5">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-text">Password Strength</span>
            <span className="text-sm font-bold" style={{ color: strength.color }}>
              {strength.label}
            </span>
          </div>
          <div className="w-full h-3 bg-bg-soft rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: strength.width, backgroundColor: strength.color }}
            />
          </div>
          <div className="mt-3 text-xs text-text-muted space-y-1">
            <p><strong>🔐 Tip:</strong> "Strong" or "Very Strong" recommended for important accounts.</p>
            <p><strong>📋 Note:</strong> All generation happens locally in your browser. Nothing is sent to any server.</p>
          </div>
        </div>
      )}
    </div>
  );
}
