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
    <div className="relative flex flex-col items-center justify-center py-8 sm:py-10">
      <div className="mb-8 inline-flex rounded-full border border-white/8 bg-white/[0.03] p-1.5 shadow-[0_14px_32px_rgba(3,6,14,0.24)]">
        <button
          onClick={() => handleSwitchType("work")}
          disabled={state !== "idle"}
          aria-label="Switch to work session"
          aria-pressed={sessionType === "work"}
          className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
            sessionType === "work"
              ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-[0_14px_30px_rgba(6,182,212,0.26)]"
              : "text-[color:var(--foreground-muted)] hover:text-white"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Work
        </button>
        <button
          onClick={() => handleSwitchType("break")}
          disabled={state !== "idle"}
          aria-label="Switch to break session"
          aria-pressed={sessionType === "break"}
          className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
            sessionType === "break"
              ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-[0_14px_30px_rgba(16,185,129,0.26)]"
              : "text-[color:var(--foreground-muted)] hover:text-white"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Break
        </button>
      </div>

      <div className="relative mb-10 flex h-[22rem] w-[22rem] items-center justify-center sm:h-[25rem] sm:w-[25rem]">
        <div
          className={`absolute inset-0 rounded-full transition-all duration-1000 ${
            state === "running"
              ? sessionType === "work"
                ? "bg-cyan-500/18 animate-pulse"
                : "bg-emerald-500/18 animate-pulse"
              : "bg-white/[0.04]"
          }`}
          style={{
            filter: "blur(48px)",
            transform: "scale(1.18)",
          }}
        />

        <div className="absolute inset-3 rounded-full border border-white/8 bg-white/[0.02]" />

        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 320 320">
          <circle
            cx="160"
            cy="160"
            r="150"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="5"
          />
          <circle
            cx="160"
            cy="160"
            r="150"
            fill="none"
            stroke={sessionType === "work" ? "#22d3ee" : "#34d399"}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 150}`}
            strokeDashoffset={`${2 * Math.PI * 150 * (1 - progress / 100)}`}
            className="transition-all duration-300"
            style={{
              filter: state === "running" ? "drop-shadow(0 0 12px currentColor)" : "none",
            }}
          />
        </svg>

        <div
          className={`absolute inset-9 flex items-center justify-center rounded-full border backdrop-blur-md transition-all duration-500 ${
            sessionType === "work"
              ? "border-cyan-400/20 bg-gradient-to-br from-cyan-500/18 via-cyan-500/8 to-blue-500/12"
              : "border-emerald-400/20 bg-gradient-to-br from-emerald-500/18 via-emerald-500/8 to-green-500/12"
          }`}
          style={{
            transform:
              state === "running"
                ? "perspective(1000px) rotateX(7deg) rotateY(-7deg) scale(1.03)"
                : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
            boxShadow:
              state === "running"
                ? sessionType === "work"
                  ? "0 28px 80px rgba(6, 182, 212, 0.28), inset 0 0 48px rgba(6, 182, 212, 0.12)"
                  : "0 28px 80px rgba(16, 185, 129, 0.24), inset 0 0 48px rgba(16, 185, 129, 0.12)"
                : "0 18px 50px rgba(2, 6, 15, 0.44)",
          }}
        >
          <div className="text-center">
            <p className="section-label text-white/60">{state === "completed" ? "Completed" : sessionType === "work" ? "Focus Block" : "Recovery Block"}</p>
            <div
              className={`metric-numeral mt-4 text-6xl font-semibold tracking-tight sm:text-7xl ${
                sessionType === "work" ? "text-cyan-300" : "text-emerald-300"
              }`}
              style={{
                textShadow:
                  state === "running"
                    ? sessionType === "work"
                      ? "0 0 28px rgba(34, 211, 238, 0.35)"
                      : "0 0 28px rgba(52, 211, 153, 0.32)"
                    : "none",
              }}
            >
              {formatTime(timeLeft)}
            </div>
            <p className="mt-3 text-sm text-[color:var(--foreground-muted)]">
              {state === "completed"
                ? "Session complete. Take a breath, then begin again."
                : sessionType === "work"
                  ? "Stay with one meaningful thing."
                  : "Reset energy before the next block."}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {state === "idle" && (
          <button
            onClick={handleStart}
            className={`rounded-2xl px-8 py-3.5 text-sm font-medium text-white transition-all duration-200 shadow-lg ${
              sessionType === "work"
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 shadow-cyan-500/30 hover:-translate-y-0.5 hover:from-cyan-400 hover:to-blue-500"
                : "bg-gradient-to-r from-emerald-500 to-green-500 shadow-emerald-500/30 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-green-500"
            }`}
          >
            Start Session
          </button>
        )}

        {state === "running" && (
          <button
            onClick={handlePause}
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-8 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:bg-white/[0.08]"
          >
            Pause
          </button>
        )}

        {state === "paused" && (
          <>
            <button
              onClick={handleResume}
              className={`rounded-2xl px-8 py-3.5 text-sm font-medium text-white transition-all duration-200 shadow-lg ${
                sessionType === "work"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 shadow-cyan-500/30 hover:-translate-y-0.5 hover:from-cyan-400 hover:to-blue-500"
                  : "bg-gradient-to-r from-emerald-500 to-green-500 shadow-emerald-500/30 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-green-500"
              }`}
            >
              Resume
            </button>
            <button
              onClick={handleReset}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-8 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:bg-white/[0.08]"
            >
              Reset
            </button>
          </>
        )}

        {state === "completed" && (
          <button
            onClick={handleReset}
            className={`rounded-2xl px-8 py-3.5 text-sm font-medium text-white transition-all duration-200 shadow-lg ${
              sessionType === "work"
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 shadow-cyan-500/30 hover:-translate-y-0.5 hover:from-cyan-400 hover:to-blue-500"
                : "bg-gradient-to-r from-emerald-500 to-green-500 shadow-emerald-500/30 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-green-500"
            }`}
          >
            Start New Session
          </button>
        )}
      </div>
    </div>
  )
}
