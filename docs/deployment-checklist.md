# Phase 1 Deployment Checklist

## Pre-Deployment Setup

### 1. Environment Variables
Create `.env` file with the following:

```bash
# Database (Supabase)
DATABASE_URL="postgresql://..."  # Pooled connection
DIRECT_URL="postgresql://..."    # Direct connection for migrations

# NextAuth
NEXTAUTH_URL="http://localhost:3000"  # Change to production URL
NEXTAUTH_SECRET=""  # Generate: openssl rand -base64 32

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
```

### 2. Database Migration
```bash
# Run migrations
npx prisma migrate deploy

# Verify schema
npx prisma db pull

# Generate Prisma client
npx prisma generate
```

### 3. Build Verification
```bash
# Install dependencies
npm install

# Run build
npm run build

# Test locally
npm start
```

## Local Testing Checklist

- [ ] Sign in redirects unauthenticated users
- [ ] Dashboard loads with real data
- [ ] Create a note
- [ ] Create a task and toggle completion
- [ ] Start a pomodoro session
- [ ] Check streaks update after activity
- [ ] View analytics page
- [ ] Update profile in settings
- [ ] Sign out works
- [ ] All loading states appear briefly
- [ ] Error boundary works (test by breaking a query)

## Deployment Options

### Option 1: Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

**Pros:** Zero config, automatic deployments, edge functions
**Cons:** Vendor lock-in

### Option 2: Railway
1. Create new project in Railway
2. Connect GitHub repo
3. Add PostgreSQL service (or use external Supabase)
4. Add environment variables
5. Deploy

**Pros:** Includes database, good for full-stack
**Cons:** More expensive at scale

### Option 3: Fly.io
1. Install flyctl CLI
2. Run `fly launch`
3. Configure fly.toml
4. Add secrets: `fly secrets set KEY=value`
5. Deploy: `fly deploy`

**Pros:** Self-hosted control, good pricing
**Cons:** More manual configuration

## Post-Deployment Verification

- [ ] Production URL loads
- [ ] Auth redirects work
- [ ] Database connection successful
- [ ] OAuth providers work (if configured)
- [ ] All routes accessible
- [ ] No console errors
- [ ] Loading states work
- [ ] Error boundaries work

## Known Limitations for Preview

⚠️ **Auth Forms Not Functional**
- Sign in/sign up forms are static HTML
- OAuth buttons work if providers configured
- Credentials login not implemented yet

⚠️ **No Input Sanitization**
- User content not sanitized for XSS
- Don't allow untrusted users yet

⚠️ **No Rate Limiting**
- Server actions have no rate limits
- Vulnerable to abuse

⚠️ **Settings Delete Account**
- Shows alert but doesn't delete
- Placeholder only

## Security Hardening (Before Public Launch)

### Critical
- [ ] Implement functional auth forms
- [ ] Add input sanitization (DOMPurify or similar)
- [ ] Add rate limiting (Upstash or similar)
- [ ] Implement actual account deletion
- [ ] Add CSP headers
- [ ] Set up error monitoring (Sentry)
- [ ] Configure database backups

### Important
- [ ] Add session timeout handling
- [ ] Implement password reset flow
- [ ] Add email verification
- [ ] Add audit logging
- [ ] Configure CORS properly
- [ ] Add request validation middleware

## Performance Optimization (Optional)

- [ ] Add React Query for client caching
- [ ] Implement pagination for lists
- [ ] Add database query caching (Redis)
- [ ] Optimize Prisma queries (select specific fields)
- [ ] Add ISR for analytics pages
- [ ] Implement optimistic updates

## Monitoring Setup

### Recommended Tools
- **Error Tracking:** Sentry
- **Analytics:** Vercel Analytics or Plausible
- **Uptime:** UptimeRobot or Better Uptime
- **Database:** Supabase dashboard

### Key Metrics to Monitor
- Error rate
- Response times
- Database query performance
- Auth success/failure rate
- User activity (notes, tasks, sessions created)

## Rollback Plan

If deployment fails:
1. Revert to previous Git commit
2. Redeploy previous version
3. Check database migrations (may need to rollback)
4. Verify environment variables unchanged

## Support & Maintenance

### Daily
- Check error logs
- Monitor uptime

### Weekly
- Review user feedback
- Check database size/performance
- Update dependencies (security patches)

### Monthly
- Full security audit
- Performance review
- Backup verification

## Next Steps After Deployment

1. Share preview URL with 5-10 test users
2. Collect feedback on usability and bugs
3. Fix critical issues
4. Implement auth forms
5. Add security hardening
6. Plan Phase 2 features

---

**Deployment Status:** Ready for preview testing
**Production Ready:** No (needs auth and security work)
**Estimated Time to Production:** 2-3 days

*Last Updated: 2026-04-26T22:42:00Z*
