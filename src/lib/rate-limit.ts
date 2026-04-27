import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null

export const authRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "15 m"),
      analytics: true,
      prefix: "@upstash/ratelimit/auth",
    })
  : null

export const actionRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(30, "1 m"),
      analytics: true,
      prefix: "@upstash/ratelimit/action",
    })
  : null

export async function checkRateLimit(
  identifier: string,
  type: "auth" | "action" = "action"
): Promise<{ success: boolean; remaining?: number }> {
  const limiter = type === "auth" ? authRateLimit : actionRateLimit

  if (!limiter) {
    return { success: true }
  }

  const { success, remaining } = await limiter.limit(identifier)

  return { success, remaining }
}
