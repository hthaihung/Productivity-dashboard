"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { createPomodoroSession } from "@/app/dashboard/focus/actions"

type TimerState = "idle" | "running" | "paused" | "completed"
type SessionType = "work" | "break"

const WORK_DURATION = 25 * 60 // 25 minutes in seconds
const BREAK_DURATION = 5 * 60 // 5 minutes in seconds

export function FocusTimer() {
  const [state, setState] = useState<TimerState>("idle")
  const [sessionType, setSessionType] = useState<SessionType>("work")
  const [timeLeft, setTimeLeft] = useState(WORK_DURATION)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  const duration = sessionType === "work" ? WORK_DURATION : BREAK_DURATION
  const progress = ((duration - timeLeft) / duration) * 100

  const playCompletionSound = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
    }

    const ctx = audioContextRef.current
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.frequency.value = 800
    oscillator.type = "sine"

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.5)
  }, [])

  const handleComplete = useCallback(async () => {
    setState("completed")
    playCompletionSound()

    try {
      const durationMinutes = Math.round(duration / 60)
      await createPomodoroSession(durationMinutes, sessionType === "work" ? "focus" : "short_break")
    } catch (error) {
      console.error("Failed to save session:", error)
    }
  }, [duration, playCompletionSound, sessionType])

  useEffect(() => {
    if (state === "running" && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            void handleComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [handleComplete, state, timeLeft])

  const handleStart = () => {
    setState("running")
  }

  const handlePause = () => {
    setState("paused")
  }

  const handleResume = () => {
    setState("running")
  }

  const handleReset = () => {
    setState("idle")
    setTimeLeft(sessionType === "work" ? WORK_DURATION : BREAK_DURATION)
  }

  const handleSwitchType = (type: SessionType) => {
    if (state !== "idle") return
    setSessionType(type)
    setTimeLeft(type === "work" ? WORK_DURATION : BREAK_DURATION)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="relative flex flex-col items-center justify-center py-10 sm:py-12">
      <div className="mb-10 inline-flex rounded-full border border-white/10 bg-white/[0.04] p-2 shadow-[0_16px_40px_rgba(3,6,14,0.28)] backdrop-blur-sm">
        <button
          onClick={() => handleSwitchType("work")}
          disabled={state !== "idle"}
          aria-label="Switch to work session"
          aria-pressed={sessionType === "work"}
          className={`rounded-full px-7 py-3 text-sm font-semibold transition-all duration-300 ${
            sessionType === "work"
              ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-[0_16px_36px_rgba(6,182,212,0.32)] scale-105"
              : "text-[color:var(--foreground-muted)] hover:text-white hover:bg-white/[0.04]"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Work
        </button>
        <button
          onClick={() => handleSwitchType("break")}
          disabled={state !== "idle"}
          aria-label="Switch to break session"
          aria-pressed={sessionType === "break"}
          className={`rounded-full px-7 py-3 text-sm font-semibold transition-all duration-300 ${
            sessionType === "break"
              ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-[0_16px_36px_rgba(16,185,129,0.32)] scale-105"
              : "text-[color:var(--foreground-muted)] hover:text-white hover:bg-white/[0.04]"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Break
        </button>
      </div>

      <div className="relative mb-12 flex h-[20rem] w-[20rem] items-center justify-center sm:h-[24rem] sm:w-[24rem] lg:h-[28rem] lg:w-[28rem] xl:h-[30rem] xl:w-[30rem]">
        {/* Outer glow effect */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-1000 ${
            state === "running"
              ? sessionType === "work"
                ? "bg-cyan-500/20 animate-pulse-glow"
                : "bg-emerald-500/18 animate-pulse-glow"
              : "bg-white/[0.03]"
          }`}
          style={{
            filter: "blur(60px)",
            transform: "scale(1.25)",
          }}
        />

        {/* Ambient particles effect - hidden on mobile/tablet */}
        {state === "running" && (
          <>
            <div
              className="absolute inset-0 rounded-full opacity-40 hidden lg:block"
              style={{
                background: `radial-gradient(circle at 30% 20%, ${sessionType === "work" ? "rgba(6,182,212,0.15)" : "rgba(16,185,129,0.15)"}, transparent 50%)`,
                animation: "pulse-glow 3s ease-in-out infinite",
              }}
            />
            <div
              className="absolute inset-0 rounded-full opacity-30 hidden lg:block"
              style={{
                background: `radial-gradient(circle at 70% 80%, ${sessionType === "work" ? "rgba(34,211,238,0.12)" : "rgba(52,211,153,0.12)"}, transparent 50%)`,
                animation: "pulse-glow 4s ease-in-out infinite 1s",
              }}
            />
          </>
        )}

        {/* Background ring */}
        <div className="absolute inset-4 rounded-full border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm" />

        {/* Progress ring SVG */}
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 320 320">
          <circle
            cx="160"
            cy="160"
            r="150"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="6"
          />
          <circle
            cx="160"
            cy="160"
            r="150"
            fill="none"
            stroke={sessionType === "work" ? "url(#cyan-gradient)" : "url(#emerald-gradient)"}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 150}`}
            strokeDashoffset={`${2 * Math.PI * 150 * (1 - progress / 100)}`}
            className="transition-all duration-500"
            style={{
              filter: state === "running" ? "drop-shadow(0 0 16px currentColor)" : "none",
            }}
          />
          <defs>
            <linearGradient id="cyan-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="emerald-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
        </svg>

        {/* Central focus orb */}
        <div
          className={`absolute inset-10 flex items-center justify-center rounded-full border backdrop-blur-xl transition-all duration-700 ${
            sessionType === "work"
              ? "border-cyan-400/25 bg-gradient-to-br from-cyan-500/20 via-cyan-500/10 to-blue-500/15"
              : "border-emerald-400/25 bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-green-500/15"
          }`}
          style={{
            transform:
              state === "running"
                ? "scale(1.04)"
                : state === "completed"
                  ? "scale(1.08)"
                  : "scale(1)",
            boxShadow:
              state === "running"
                ? sessionType === "work"
                  ? "0 32px 90px rgba(6, 182, 212, 0.32), inset 0 0 60px rgba(6, 182, 212, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)"
                  : "0 32px 90px rgba(16, 185, 129, 0.28), inset 0 0 60px rgba(16, 185, 129, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)"
                : state === "completed"
                  ? sessionType === "work"
                    ? "0 40px 100px rgba(6, 182, 212, 0.4), inset 0 0 80px rgba(6, 182, 212, 0.2)"
                    : "0 40px 100px rgba(16, 185, 129, 0.35), inset 0 0 80px rgba(16, 185, 129, 0.2)"
                  : "0 20px 60px rgba(2, 6, 15, 0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <div className="text-center">
            <p className="section-label text-white/70">
              {state === "completed" ? "✓ Completed" : sessionType === "work" ? "Focus Block" : "Recovery Block"}
            </p>
            <div
              className={`metric-numeral mt-5 text-6xl font-bold tracking-tighter sm:text-7xl lg:text-8xl ${
                sessionType === "work" ? "text-cyan-200" : "text-emerald-200"
              } transition-all duration-500`}
              style={{
                textShadow:
                  state === "running"
                    ? sessionType === "work"
                      ? "0 0 32px rgba(34, 211, 238, 0.4), 0 0 64px rgba(6, 182, 212, 0.2)"
                      : "0 0 32px rgba(52, 211, 153, 0.35), 0 0 64px rgba(16, 185, 129, 0.2)"
                    : state === "completed"
                      ? sessionType === "work"
                        ? "0 0 48px rgba(34, 211, 238, 0.5)"
                        : "0 0 48px rgba(52, 211, 153, 0.45)"
                      : "none",
              }}
            >
              {formatTime(timeLeft)}
            </div>
            <p className="mt-4 px-6 text-sm leading-relaxed text-[color:var(--foreground-muted)]">
              {state === "completed"
                ? "Session complete. Take a breath, then begin again."
                : sessionType === "work"
                  ? "Stay with one meaningful thing."
                  : "Reset energy before the next block."}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {state === "idle" && (
          <button
            onClick={handleStart}
            className={`group rounded-[22px] px-10 py-4 text-base font-semibold text-white transition-all duration-300 shadow-xl ${
              sessionType === "work"
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 shadow-cyan-500/40 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(6,182,212,0.45)] hover:from-cyan-400 hover:to-blue-500"
                : "bg-gradient-to-r from-emerald-500 to-green-500 shadow-emerald-500/35 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(16,185,129,0.4)] hover:from-emerald-400 hover:to-green-500"
            }`}
          >
            <span className="flex items-center gap-2">
              Start Session
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </button>
        )}

        {state === "running" && (
          <button
            onClick={handlePause}
            className="rounded-[22px] border border-white/12 bg-white/[0.05] px-10 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.1] hover:border-white/20"
          >
            Pause
          </button>
        )}

        {state === "paused" && (
          <>
            <button
              onClick={handleResume}
              className={`rounded-[22px] px-10 py-4 text-base font-semibold text-white transition-all duration-300 shadow-xl ${
                sessionType === "work"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 shadow-cyan-500/40 hover:-translate-y-1 hover:from-cyan-400 hover:to-blue-500"
                  : "bg-gradient-to-r from-emerald-500 to-green-500 shadow-emerald-500/35 hover:-translate-y-1 hover:from-emerald-400 hover:to-green-500"
              }`}
            >
              Resume
            </button>
            <button
              onClick={handleReset}
              className="rounded-[22px] border border-white/12 bg-white/[0.05] px-10 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.1] hover:border-white/20"
            >
              Reset
            </button>
          </>
        )}

        {state === "completed" && (
          <button
            onClick={handleReset}
            className={`group rounded-[22px] px-10 py-4 text-base font-semibold text-white transition-all duration-300 shadow-xl ${
              sessionType === "work"
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 shadow-cyan-500/40 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(6,182,212,0.45)]"
                : "bg-gradient-to-r from-emerald-500 to-green-500 shadow-emerald-500/35 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(16,185,129,0.4)]"
            }`}
          >
            <span className="flex items-center gap-2">
              Start New Session
              <svg className="h-5 w-5 transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </span>
          </button>
        )}
      </div>
    </div>
  )
}
