"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

const themeCycle = ["light", "dark", "system"];

function NextIcon({ theme }) {
  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;
  return <Icon className="w-5 h-5" />;
}

const labels = {
  light: { next: "Switch to dark mode", current: "Light mode" },
  dark: { next: "Switch to system mode", current: "Dark mode" },
  system: { next: "Switch to light mode", current: "System mode" },
};

export function ThemeToggle({ className = "" }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className={`flex items-center justify-center w-10 h-10 rounded-lg border-2 border-border bg-bg-soft/40 ${className}`}
        aria-label="Toggle theme"
        disabled
      >
        <div className="w-4 h-4 rounded-full bg-border/60" />
      </button>
    );
  }

  const nextTheme = themeCycle[(themeCycle.indexOf(theme) + 1) % themeCycle.length];
  const label = labels[theme]?.next ?? "Switch theme";

  return (
    <button
      onClick={() => setTheme(nextTheme)}
      className={`relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 hover:bg-bg-soft dark:hover:bg-border focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 ${className}`}
      aria-label={label}
      title={label}
    >
      <NextIcon theme={theme} />
    </button>
  );
}

export function ThemeSelector({ className = "" }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`flex items-center gap-1 p-1 bg-bg-soft dark:bg-border rounded-lg ${className}`}>
        <div className="px-3 py-1.5 rounded-md text-sm font-medium">Light</div>
        <div className="px-3 py-1.5 rounded-md text-sm font-medium">Auto</div>
        <div className="px-3 py-1.5 rounded-md text-sm font-medium">Dark</div>
      </div>
    );
  }

  const options = [
    { key: "light", icon: Sun, label: "Light" },
    { key: "system", icon: Monitor, label: "Auto" },
    { key: "dark", icon: Moon, label: "Dark" },
  ];

  return (
    <div className={`flex items-center gap-1 p-1 bg-bg-soft dark:bg-border rounded-lg ${className}`}>
      {options.map(({ key, icon: Icon, label }) => (
        <button
          key={key}
          onClick={() => setTheme(key)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
            theme === key
              ? "bg-white dark:bg-bg shadow-sm text-text"
              : "text-text-muted hover:text-text"
          }`}
          aria-pressed={theme === key}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>
  );
}
