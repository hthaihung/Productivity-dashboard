type SecurityEvent =
  | "auth_signin_failed"
  | "auth_signup_failed"
  | "auth_signin_success"
  | "auth_signup_success"
  | "rate_limit_exceeded"
  | "account_deleted"
  | "unauthorized_access"
  | "password_reset_requested"

interface SecurityLogEntry {
  timestamp?: string
  event: SecurityEvent
  userId?: string
  email?: string
  ip?: string
  userAgent?: string
  details?: string
}

export function logSecurityEvent(entry: SecurityLogEntry) {
  const logEntry = {
    ...entry,
    timestamp: entry.timestamp || new Date().toISOString(),
  }

  console.warn("[SECURITY]", JSON.stringify(logEntry))
}
