"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function formatNumber(num) {
  return num.toString().padStart(2, "0");
}

function getTimeLeft(targetDate) {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, isComplete: false };
}

function getProgress(startDate, targetDate) {
  const now = new Date();
  const totalDuration = targetDate - startDate;
  const elapsed = now - startDate;

  if (totalDuration <= 0) return 100;
  if (elapsed >= totalDuration) return 100;
  if (elapsed < 0) return 0;

  return Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
}

export default function CountdownTimer() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(12, 0, 0, 0);

  const futureYears = Array.from({ length: 100 }, (_, i) => now.getFullYear() + i);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const [targetDate, setTargetDate] = useState({
    month: tomorrow.getMonth(),
    day: tomorrow.getDate(),
    year: tomorrow.getFullYear(),
  });

  const [targetTime, setTargetTime] = useState("12:00");
  const [eventLabel, setEventLabel] = useState("Countdown");
  const [isActive, setIsActive] = useState(false);
  const [savedTarget, setSavedTarget] = useState(null);
  const [savedStart, setSavedStart] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [tickAnimation, setTickAnimation] = useState(false);
  const [showTopControls, setShowTopControls] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [topControlsTimeout, setTopControlsTimeout] = useState(null);
  const [hasAlertFired, setHasAlertFired] = useState(false);

  const containerRef = useRef(null);
  const timerRef = useRef(null);

  const actualDaysInMonth = getDaysInMonth(targetDate.year, targetDate.month);

  const playBeep = useCallback((delay = 0) => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      const audioCtx = new AudioContextClass();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.frequency.value = 880;
      oscillator.type = "sine";

      const startTime = audioCtx.currentTime + delay;
      gainNode.gain.setValueAtTime(0.15, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.25);
    } catch (e) {
    }
  }, []);

  const playCompletionAlert = useCallback(() => {
    playBeep(0);
    playBeep(0.4);
    playBeep(0.8);
  }, [playBeep]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (targetDate.day > actualDaysInMonth) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTargetDate((prev) => ({ ...prev, day: actualDaysInMonth }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate.month, targetDate.year, actualDaysInMonth]);

  const startCountdown = useCallback(() => {
    const target = new Date(
      targetDate.year,
      targetDate.month,
      targetDate.day
    );

    const [hours, minutes] = targetTime.split(":").map(Number);
    target.setHours(hours, minutes, 0, 0);

    const now = new Date();

    if (target <= now) {
      return;
    }

    setSavedTarget(target);
    setSavedStart(now);
    setIsActive(true);
    setTimeLeft(getTimeLeft(target));
    setProgress(getProgress(now, target));
  }, [targetDate, targetTime]);

  const resetCountdown = useCallback(() => {
    setIsActive(false);
    setSavedTarget(null);
    setSavedStart(null);
    setTimeLeft(null);
    setProgress(0);
    setHasAlertFired(false);
  }, []);

  useEffect(() => {
    if (!isActive || !savedTarget) return;

    timerRef.current = setInterval(() => {
      const newTimeLeft = getTimeLeft(savedTarget);
      setTimeLeft(newTimeLeft);

      if (savedStart) {
        setProgress(getProgress(savedStart, savedTarget));
      }

      setTickAnimation(true);
      setTimeout(() => setTickAnimation(false), 300);

      if (newTimeLeft.isComplete && !hasAlertFired) {
        clearInterval(timerRef.current);
        setHasAlertFired(true);
        playCompletionAlert();
      } else if (newTimeLeft.isComplete) {
        clearInterval(timerRef.current);
      }
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, savedTarget, savedStart, hasAlertFired, playCompletionAlert]);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement && containerRef.current) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else if (document.fullscreenElement) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (e) {
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleMouseEnterTop = useCallback(() => {
    if (isMobile) return;
    if (topControlsTimeout) {
      clearTimeout(topControlsTimeout);
    }
    setShowTopControls(true);
  }, [isMobile, topControlsTimeout]);

  const handleMouseLeaveTop = useCallback(() => {
    if (isMobile) return;
    const timeout = setTimeout(() => {
      setShowTopControls(false);
    }, 1000);
    setTopControlsTimeout(timeout);
  }, [isMobile]);

  const getDisplayDate = () => {
    if (!savedTarget) return "";
    return savedTarget.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDisplayTime = () => {
    if (!savedTarget) return "";
    return savedTarget.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const totalDays = timeLeft ? timeLeft.days : 0;
  const totalHours = timeLeft ? totalDays * 24 + timeLeft.hours : 0;
  const totalMinutes = timeLeft ? totalHours * 60 + timeLeft.minutes : 0;
  const totalSeconds = timeLeft ? totalMinutes * 60 + timeLeft.seconds : 0;

  return (
    <div
      ref={containerRef}
      className={isFullscreen ? "bg-gray-900 min-h-screen relative overflow-hidden" : ""}
    >
      {/* Fullscreen Top Controls */}
      {isFullscreen && (
        <div
          onMouseEnter={handleMouseEnterTop}
          onMouseLeave={handleMouseLeaveTop}
          className="absolute top-0 left-0 right-0 z-50 h-20"
          style={{
            background: showTopControls || isMobile
              ? "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)"
              : "transparent",
            transition: "background 0.3s ease",
          }}
        >
          <div
            className="flex items-center justify-between px-6 py-3"
            style={{
              opacity: showTopControls || isMobile ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <div className="text-white font-medium text-sm">
              {eventLabel || "Countdown"}
            </div>
            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-semibold transition-all backdrop-blur-sm border border-white/10"
            >
              <span>✕</span>
              <span className="hidden sm:inline">Exit</span>
            </button>
          </div>
        </div>
      )}

      {/* Non-fullscreen Exit Button */}
      {isFullscreen && !isActive ? (
        <div className="flex items-center justify-center h-screen bg-gray-900">
          <div className="text-center">
            <p className="text-white text-xl mb-6">Start a countdown first to use Fullscreen Mode</p>
            <button
              onClick={toggleFullscreen}
              className="px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-dark transition-all"
            >
              Exit Fullscreen
            </button>
          </div>
        </div>
      ) : !isFullscreen ? (
        /* Normal (Non-Fullscreen) View */
        <div>
          {!isActive ? (
            <div>
              {/* Setup Section */}
              <div className="bg-white rounded-2xl border border-border shadow-card p-6 md:p-8 mb-6">
                <h3 className="font-semibold text-text text-lg mb-6 text-center">
                  ⏰ Set Your Countdown
                </h3>

                {/* Event Label */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-text mb-2">
                    Event Name
                  </label>
                  <input
                    type="text"
                    value={eventLabel}
                    onChange={(e) => setEventLabel(e.target.value)}
                    placeholder="e.g., New Year, Birthday, Meeting..."
                    className="w-full px-5 py-4 rounded-xl border border-border focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-text bg-white text-lg"
                  />
                </div>

                {/* Target Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-text mb-2">
                      Target Date
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <select
                        value={targetDate.month}
                        onChange={(e) => setTargetDate({ ...targetDate, month: parseInt(e.target.value) })}
                        className="px-3 py-3 rounded-xl border border-border focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-sm bg-white font-medium"
                      >
                        {monthNames.map((m, i) => (
                          <option key={i} value={i}>
                            {m}
                          </option>
                        ))}
                      </select>
                      <select
                        value={targetDate.day}
                        onChange={(e) => setTargetDate({ ...targetDate, day: parseInt(e.target.value) })}
                        className="px-3 py-3 rounded-xl border border-border focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-sm bg-white font-medium"
                      >
                        {days.slice(0, actualDaysInMonth).map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                      <select
                        value={targetDate.year}
                        onChange={(e) => setTargetDate({ ...targetDate, year: parseInt(e.target.value) })}
                        className="px-3 py-3 rounded-xl border border-border focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-sm bg-white font-medium"
                      >
                        {futureYears.map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Target Time */}
                  <div>
                    <label className="block text-sm font-semibold text-text mb-2">
                      Target Time
                    </label>
                    <input
                      type="time"
                      value={targetTime}
                      onChange={(e) => setTargetTime(e.target.value)}
                      className="w-full px-5 py-3 rounded-xl border border-border focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-text bg-white text-lg"
                    />
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-text mb-2">
                    ⚡ Quick Presets
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "1 Hour", hours: 1 },
                      { label: "6 Hours", hours: 6 },
                      { label: "12 Hours", hours: 12 },
                      { label: "Tomorrow", days: 1 },
                      { label: "3 Days", days: 3 },
                      { label: "1 Week", days: 7 },
                    ].map((preset) => {
                      const presetDate = new Date(now);
                      if (preset.hours) {
                        presetDate.setHours(presetDate.getHours() + preset.hours);
                      } else {
                        presetDate.setDate(presetDate.getDate() + preset.days);
                      }

                      return (
                        <button
                          key={preset.label}
                          onClick={() => {
                            setTargetDate({
                              month: presetDate.getMonth(),
                              day: presetDate.getDate(),
                              year: presetDate.getFullYear(),
                            });
                            setTargetTime(
                              `${formatNumber(presetDate.getHours())}:${formatNumber(presetDate.getMinutes())}`
                            );
                          }}
                          className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-white border-2 border-border hover:border-brand hover:text-brand transition-all"
                        >
                          {preset.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Start Button */}
                <div className="text-center">
                  <button
                    onClick={startCountdown}
                    className="px-12 py-4 bg-brand text-white font-bold text-lg rounded-xl hover:bg-brand-dark transition-all shadow-[0_4px_14px_rgba(30,64,175,0.25)]"
                  >
                    ▶ Start Countdown
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* Active Countdown Display */}

              {/* Event Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-light text-brand text-sm font-semibold mb-2">
                  ⏰ Counting Down
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-text">
                  {eventLabel || "Countdown"}
                </h2>
                {savedTarget && (
                  <p className="text-text-muted mt-2">
                    {getDisplayDate()} at {getDisplayTime()}
                  </p>
                )}
              </div>

              {/* Main Timer Display - Futuristic Style */}
              <div
                className={`bg-gray-900 rounded-2xl p-6 md:p-8 mb-6 transition-all ${
                  tickAnimation ? "scale-101" : "scale-100"
                }`}
                style={{
                  boxShadow: "0 0 60px rgba(30, 64, 175, 0.15), inset 0 0 30px rgba(0, 0, 0, 0.5)",
                }}
              >
                {timeLeft && timeLeft.isComplete ? (
                  <div className="text-center py-8" style={{
                    animation: "countdownPulse 1.5s ease-in-out infinite",
                  }}>
                    <div className="text-6xl mb-4" style={{
                      animation: "countdownBounce 0.6s ease-in-out infinite",
                    }}>🎉</div>
                    <h2 className="text-3xl font-extrabold text-green-400 mb-2" style={{
                      textShadow: "0 0 20px rgba(74, 222, 128, 0.5), 0 0 40px rgba(74, 222, 128, 0.3)",
                      animation: "countdownGlow 2s ease-in-out infinite",
                    }}>
                      COUNTDOWN COMPLETE!
                    </h2>
                    <p className="text-gray-400 text-lg">
                      {eventLabel || "Your event"} has arrived!
                    </p>
                  </div>
                ) : timeLeft ? (
                  <div className="grid grid-cols-4 gap-3 md:gap-5">
                    {/* Days */}
                    <div className="text-center">
                      <div
                        className={`bg-gray-800 rounded-xl p-3 md:p-5 mb-2 transition-all ${
                          tickAnimation ? "bg-gray-750" : ""
                        }`}
                        style={{
                          boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5), 0 0 20px rgba(30, 64, 175, 0.08)",
                        }}
                      >
                        <div
                          className="text-4xl md:text-6xl font-mono font-black tracking-tight"
                          style={{
                            color: "#1e40af",
                            textShadow: "0 0 20px rgba(30, 64, 175, 0.5)",
                          }}
                        >
                          {formatNumber(timeLeft.days)}
                        </div>
                      </div>
                      <div className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-widest">
                        Days
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="text-center">
                      <div
                        className={`bg-gray-800 rounded-xl p-3 md:p-5 mb-2 transition-all ${
                          tickAnimation ? "bg-gray-750" : ""
                        }`}
                        style={{
                          boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5), 0 0 20px rgba(30, 64, 175, 0.08)",
                        }}
                      >
                        <div
                          className="text-4xl md:text-6xl font-mono font-black tracking-tight"
                          style={{
                            color: "#1e40af",
                            textShadow: "0 0 20px rgba(30, 64, 175, 0.5)",
                          }}
                        >
                          {formatNumber(timeLeft.hours)}
                        </div>
                      </div>
                      <div className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-widest">
                        Hours
                      </div>
                    </div>

                    {/* Minutes */}
                    <div className="text-center">
                      <div
                        className={`bg-gray-800 rounded-xl p-3 md:p-5 mb-2 transition-all ${
                          tickAnimation ? "bg-gray-750" : ""
                        }`}
                        style={{
                          boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5), 0 0 20px rgba(30, 64, 175, 0.08)",
                        }}
                      >
                        <div
                          className="text-4xl md:text-6xl font-mono font-black tracking-tight"
                          style={{
                            color: "#1e40af",
                            textShadow: "0 0 20px rgba(30, 64, 175, 0.5)",
                          }}
                        >
                          {formatNumber(timeLeft.minutes)}
                        </div>
                      </div>
                      <div className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-widest">
                        Mins
                      </div>
                    </div>

                    {/* Seconds */}
                    <div className="text-center">
                      <div
                        className={`bg-gray-800 rounded-xl p-3 md:p-5 mb-2 transition-all ${
                          tickAnimation ? "bg-gray-750" : ""
                        }`}
                        style={{
                          boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5), 0 0 20px rgba(30, 64, 175, 0.08)",
                        }}
                      >
                        <div
                          className="text-4xl md:text-6xl font-mono font-black tracking-tight"
                          style={{
                            color: "#1e40af",
                            textShadow: "0 0 20px rgba(30, 64, 175, 0.5)",
                          }}
                        >
                          {formatNumber(timeLeft.seconds)}
                        </div>
                      </div>
                      <div className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-widest">
                        Secs
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-text-muted font-semibold">Progress</span>
                  <span className="text-sm font-bold text-brand">{progress.toFixed(1)}%</span>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-linear"
                    style={{
                      width: `${progress}%`,
                      background: `linear-gradient(90deg, #1e40af, #3b82f6)`,
                      boxShadow: "0 0 10px rgba(30, 64, 175, 0.3)",
                    }}
                  />
                </div>
              </div>

              {/* Stats Breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <div className="bg-white rounded-xl border border-border p-4 text-center">
                  <div className="text-2xl font-mono font-bold text-brand">
                    {totalDays.toLocaleString()}
                  </div>
                  <div className="text-xs text-text-muted font-semibold uppercase tracking-wide">
                    Total Days
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-border p-4 text-center">
                  <div className="text-2xl font-mono font-bold text-brand">
                    {totalHours.toLocaleString()}
                  </div>
                  <div className="text-xs text-text-muted font-semibold uppercase tracking-wide">
                    Total Hours
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-border p-4 text-center">
                  <div className="text-2xl font-mono font-bold text-brand">
                    {totalMinutes.toLocaleString()}
                  </div>
                  <div className="text-xs text-text-muted font-semibold uppercase tracking-wide">
                    Total Minutes
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-border p-4 text-center">
                  <div className="text-2xl font-mono font-bold text-brand">
                    {totalSeconds.toLocaleString()}
                  </div>
                  <div className="text-xs text-text-muted font-semibold uppercase tracking-wide">
                    Total Seconds
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={toggleFullscreen}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-border rounded-xl font-semibold text-text hover:border-brand hover:text-brand transition-all"
                >
                  {isFullscreen ? "🗗 Exit Fullscreen" : "🗖 Fullscreen Mode"}
                </button>
                <button
                  onClick={resetCountdown}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-red-200 rounded-xl font-semibold text-red-600 hover:bg-red-50 transition-all"
                >
                  🔄 New Countdown
                </button>
              </div>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-8 bg-bg-soft rounded-xl p-5 border border-border">
            <h3 className="font-semibold text-text mb-2">💡 Tips</h3>
            <ul className="text-sm text-text-muted space-y-1.5">
              <li>✓ <strong>Fullscreen Mode</strong> — Great for presentations, events, and monitoring</li>
              <li>✓ <strong>Live Updates</strong> — Counts down in real-time, every second</li>
              <li>✓ <strong>Quick Presets</strong> — One-click setup for common durations</li>
              <li>✓ <strong>Progress Bar</strong> — Visual indicator of how much time has passed</li>
              <li>✓ <strong>Date Validation</strong> — Automatically adjusts days per month (including leap years)</li>
            </ul>
          </div>
        </div>
      ) : (
        /* Fullscreen Active Countdown View */
        <div className="flex flex-col items-center justify-center h-screen px-4">
          {/* Event Label */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-2">
              {eventLabel || "Countdown"}
            </h2>
            {savedTarget && (
              <p className="text-gray-400 text-sm md:text-base">
                {getDisplayDate()} at {getDisplayTime()}
              </p>
            )}
          </div>

          {/* Main Timer */}
          {timeLeft && timeLeft.isComplete ? (
            <div className="text-center" style={{
              animation: "countdownPulse 1.5s ease-in-out infinite",
            }}>
              <div className="text-8xl md:text-9xl mb-6" style={{
                animation: "countdownBounce 0.6s ease-in-out infinite",
              }}>🎉</div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-green-400 mb-4" style={{
                textShadow: "0 0 30px rgba(74, 222, 128, 0.6), 0 0 60px rgba(74, 222, 128, 0.4)",
                animation: "countdownGlow 2s ease-in-out infinite",
              }}>
                COUNTDOWN COMPLETE!
              </h2>
              <p className="text-gray-400 text-xl md:text-2xl">
                {eventLabel || "Your event"} has arrived!
              </p>
            </div>
          ) : timeLeft ? (
            <div className="grid grid-cols-4 gap-3 md:gap-8">
              {/* Days */}
              <div className="text-center">
                <div
                  className={`bg-gray-800 rounded-2xl p-4 md:p-8 mb-3 transition-all ${
                    tickAnimation ? "bg-gray-750" : ""
                  }`}
                  style={{
                    boxShadow: "inset 0 4px 20px rgba(0,0,0,0.6), 0 0 40px rgba(30, 64, 175, 0.1)",
                  }}
                >
                  <div
                    className="text-5xl md:text-8xl lg:text-9xl font-mono font-black tracking-tight"
                    style={{
                      color: "#1e40af",
                      textShadow: "0 0 30px rgba(30, 64, 175, 0.6)",
                    }}
                  >
                    {formatNumber(timeLeft.days)}
                  </div>
                </div>
                <div className="text-sm md:text-lg font-semibold text-gray-400 uppercase tracking-widest">
                  Days
                </div>
              </div>

              {/* Hours */}
              <div className="text-center">
                <div
                  className={`bg-gray-800 rounded-2xl p-4 md:p-8 mb-3 transition-all ${
                    tickAnimation ? "bg-gray-750" : ""
                  }`}
                  style={{
                    boxShadow: "inset 0 4px 20px rgba(0,0,0,0.6), 0 0 40px rgba(30, 64, 175, 0.1)",
                  }}
                >
                  <div
                    className="text-5xl md:text-8xl lg:text-9xl font-mono font-black tracking-tight"
                    style={{
                      color: "#1e40af",
                      textShadow: "0 0 30px rgba(30, 64, 175, 0.6)",
                    }}
                  >
                    {formatNumber(timeLeft.hours)}
                  </div>
                </div>
                <div className="text-sm md:text-lg font-semibold text-gray-400 uppercase tracking-widest">
                  Hours
                </div>
              </div>

              {/* Minutes */}
              <div className="text-center">
                <div
                  className={`bg-gray-800 rounded-2xl p-4 md:p-8 mb-3 transition-all ${
                    tickAnimation ? "bg-gray-750" : ""
                  }`}
                  style={{
                    boxShadow: "inset 0 4px 20px rgba(0,0,0,0.6), 0 0 40px rgba(30, 64, 175, 0.1)",
                  }}
                >
                  <div
                    className="text-5xl md:text-8xl lg:text-9xl font-mono font-black tracking-tight"
                    style={{
                      color: "#1e40af",
                      textShadow: "0 0 30px rgba(30, 64, 175, 0.6)",
                    }}
                  >
                    {formatNumber(timeLeft.minutes)}
                  </div>
                </div>
                <div className="text-sm md:text-lg font-semibold text-gray-400 uppercase tracking-widest">
                  Mins
                </div>
              </div>

              {/* Seconds */}
              <div className="text-center">
                <div
                  className={`bg-gray-800 rounded-2xl p-4 md:p-8 mb-3 transition-all ${
                    tickAnimation ? "bg-gray-750" : ""
                  }`}
                  style={{
                    boxShadow: "inset 0 4px 20px rgba(0,0,0,0.6), 0 0 40px rgba(30, 64, 175, 0.1)",
                  }}
                >
                  <div
                    className="text-5xl md:text-8xl lg:text-9xl font-mono font-black tracking-tight"
                    style={{
                      color: "#1e40af",
                      textShadow: "0 0 30px rgba(30, 64, 175, 0.6)",
                    }}
                  >
                    {formatNumber(timeLeft.seconds)}
                  </div>
                </div>
                <div className="text-sm md:text-lg font-semibold text-gray-400 uppercase tracking-widest">
                  Secs
                </div>
              </div>
            </div>
          ) : null}

          {/* Small Progress Bar in Fullscreen */}
          {timeLeft && !timeLeft.isComplete && (
            <div className="w-full max-w-2xl mt-12">
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-linear"
                  style={{
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, #1e40af, #3b82f6)`,
                    boxShadow: "0 0 15px rgba(30, 64, 175, 0.5)",
                  }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-500">Progress</span>
                <span className="text-xs text-gray-400 font-mono">{progress.toFixed(1)}%</span>
              </div>
             </div>
            )}
          </div>
        )}

        <style>{`
          @keyframes countdownPulse {
            0%, 100% {
             transform: scale(1);
            }
            50% {
             transform: scale(1.03);
            }
          }

          @keyframes countdownBounce {
            0%, 100% {
             transform: translateY(0) scale(1);
            }
            50% {
             transform: translateY(-15px) scale(1.1);
            }
          }

          @keyframes countdownGlow {
            0%, 100% {
             opacity: 1;
             text-shadow: 0 0 20px rgba(74, 222, 128, 0.5), 0 0 40px rgba(74, 222, 128, 0.3);
            }
            50% {
             opacity: 0.95;
             text-shadow: 0 0 40px rgba(74, 222, 128, 0.8), 0 0 70px rgba(74, 222, 128, 0.5);
            }
          }
        `}</style>
      </div>
    );
  }
