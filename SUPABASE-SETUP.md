# Supabase + Prisma Setup Guide

## Configuration Complete ✓

The project is now configured for Supabase with proper connection string separation:
- **DATABASE_URL** (pooled/transaction mode) → Runtime queries via Prisma Client
- **DIRECT_URL** (direct/session mode) → Prisma CLI migrations

## Required Environment Variables

Add these to your local `.env` file (copy from `.env.example` first):

```bash
# 1. Database - Supabase PostgreSQL
# Get from: Supabase Dashboard > Project Settings > Database > Connection string

# Pooled connection (Transaction mode) - Port 6543
DATABASE_URL="postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-xx-xxx.pooler.supabase.com:6543/postgres"

# Direct connection (Session mode) - Port 5432
DIRECT_URL="postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-xx-xxx.pooler.supabase.com:5432/postgres"

# 2. NextAuth - REQUIRED for auth to work
# Generate with: openssl rand -base64 32
NEXTAUTH_SECRET="[GENERATE-THIS]"
NEXTAUTH_URL="http://localhost:3000"

# 3. OAuth Providers - OPTIONAL (can add later)
# Leave empty for now if not using OAuth yet
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
```

## What You Need to Provide

### 1. Supabase Connection Strings (REQUIRED)
You mentioned you already have both. Paste them into `.env`:
- **DATABASE_URL** - Your pooled connection string (port 6543)
- **DIRECT_URL** - Your direct connection string (port 5432)

### 2. NextAuth Secret (REQUIRED)
Generate a secure secret:
```bash
openssl rand -base64 32
```
Paste the output into `NEXTAUTH_SECRET` in `.env`

### 3. OAuth Credentials (OPTIONAL - can skip for now)
- Can leave Google/GitHub empty initially
- Email/password auth will work without OAuth
- Add OAuth later when needed for social login

## Next Commands to Run

Once you've added the environment variables to `.env`:

### 1. Verify Prisma can connect
```bash
npx prisma db pull
```
Expected: Should connect successfully (may show "no tables" if database is empty)

### 2. Create initial migration
```bash
npx prisma migrate dev --name init
```
Expected: Creates migration files and applies schema to Supabase

### 3. Generate Prisma Client
```bash
npx prisma generate
```
Expected: Generates TypeScript types for your schema

### 4. Verify build
```bash
npm run build
```
Expected: Build succeeds (already verified with placeholder env)

### 5. Start development server
```bash
npm run dev
```
Expected: Server starts on http://localhost:3000

## Configuration Details

### Prisma Setup (Already Done)
- `prisma.config.ts` → Uses `DIRECT_URL` for migrations
- `src/lib/prisma.ts` → Uses `DATABASE_URL` for runtime queries
- Schema has no `url` field (Prisma 7 requirement)

### Why Two Connection Strings?

**DATABASE_URL (Pooled - Port 6543)**
- Transaction mode pooling
- Used by application at runtime
- Better for serverless/edge functions
- Handles connection pooling automatically

**DIRECT_URL (Direct - Port 5432)**
- Session mode connection
- Used by Prisma CLI for migrations
- Required for schema introspection
- Needed for `prisma migrate` and `prisma db push`

### Auth Configuration
NextAuth.js is configured with:
- **Adapters**: Prisma (stores sessions in database)
- **Strategy**: JWT (sessions stored in tokens)
- **Providers**: 
  - Credentials (email/password with bcrypt)
  - Google OAuth (if configured)
  - GitHub OAuth (if configured)

## Blocking Issues Check

✅ Prisma 7 adapter configured  
✅ Supabase connection strings separated  
✅ Build passes with current config  
✅ No destructive operations pending  
✅ Schema ready for migration  

## Known Limitations

1. **OAuth providers will fail if not configured** - Auth pages reference them but won't work until you add credentials
2. **No middleware yet** - Dashboard routes are not protected (anyone can access)
3. **Auth forms are static** - Need server actions to actually submit (planned for next phase)

## Troubleshooting

**If migration fails:**
- Check DIRECT_URL is correct (port 5432)
- Verify Supabase project is active
- Ensure password has no special characters that need URL encoding

**If runtime queries fail:**
- Check DATABASE_URL is correct (port 6543)
- Verify pooler is enabled in Supabase

**If build fails:**
- Run `npx prisma generate` first
- Check both connection strings are in `.env`
- Verify NEXTAUTH_SECRET is set

## What's Next

After successful migration:
1. Test auth flow (signup/signin pages)
2. Verify database tables in Supabase dashboard
3. Begin Phase 1 feature implementation (Notes, Tasks, Pomodoro, Streaks)

---

**Status**: Configuration complete. Waiting for you to add connection strings to `.env` and run migrations.

**Date**: 2026-04-26
