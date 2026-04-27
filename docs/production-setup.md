# Production Setup Guide

This guide walks through deploying the Dashboard app to production.

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (Supabase recommended)
- Domain name configured
- Access to third-party service dashboards

---

## Step 1: Database Setup

### Using Supabase (Recommended)

1. Create a new project at https://supabase.com
2. Navigate to **Settings > Database**
3. Copy both connection strings:
   - **Transaction mode (pooled)** → `DATABASE_URL`
   - **Session mode (direct)** → `DIRECT_URL`

### Run Migrations

```bash
npx prisma migrate deploy
```

This creates all required tables in your production database.

---

## Step 2: Environment Variables

Copy `.env.example` to `.env` and configure:

### Required Variables

```bash
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Auth (generate secret with: openssl rand -base64 32)
AUTH_SECRET="your-generated-secret"
NEXTAUTH_URL="https://yourdomain.com"

# Rate Limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."

# Email (MailerSend)
MAILERSEND_API_KEY="..."
EMAIL_FROM="noreply@yourdomain.com"

# Error Monitoring (Sentry)
SENTRY_DSN="https://..."
NEXT_PUBLIC_SENTRY_DSN="https://..."
```

### Optional OAuth Providers

```bash
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

---

## Step 3: Third-Party Service Setup

### Upstash Redis (Rate Limiting)

1. Create account at https://upstash.com
2. Create a new Redis database
3. Copy **REST URL** and **REST Token** to env vars

### MailerSend (Email Delivery)

1. Create account at https://mailersend.com
2. Add and verify your sending domain
3. Create an API key
4. Set `MAILERSEND_API_KEY` and `EMAIL_FROM` (must use verified domain)

### Sentry (Error Monitoring)

1. Create account at https://sentry.io
2. Create a new Next.js project
3. Copy the DSN to both `SENTRY_DSN` and `NEXT_PUBLIC_SENTRY_DSN`

### OAuth Providers (Optional)

#### Google OAuth
1. Go to https://console.cloud.google.com/
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `https://yourdomain.com/api/auth/callback/google`
6. Copy Client ID and Client Secret

---

## Step 4: Build and Deploy

### Local Build Test

```bash
npm install
npm run build
npm start
```

Visit `http://localhost:3000` to verify the build works.

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project at https://vercel.com
3. Add all environment variables in Vercel dashboard
4. Deploy

Vercel will automatically:
- Run `npm run build`
- Set up serverless functions
- Configure edge runtime
- Enable automatic deployments on push

### Deploy to Other Platforms

For platforms like Railway, Render, or DigitalOcean:

1. Set all environment variables in platform dashboard
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Ensure Node.js 18+ is selected

---

## Step 5: Post-Deployment Verification

### Authentication Flow
- [ ] Sign up with new account
- [ ] Sign in with created account
- [ ] Request password reset
- [ ] Receive reset email
- [ ] Complete password reset
- [ ] Sign in with new password

### Core Features
- [ ] Create a note
- [ ] Create a task
- [ ] Complete a task
- [ ] Start and complete a pomodoro session
- [ ] View analytics dashboard
- [ ] Update profile settings

### Monitoring
- [ ] Check Sentry for any errors
- [ ] Verify rate limiting works (try rapid requests)

### OAuth (if configured)
- [ ] Sign in with Google

---

## Step 6: Production Checklist

- [ ] Database migrations deployed
- [ ] All required env vars set
- [ ] Domain DNS configured
- [ ] SSL certificate active
- [ ] Email sending domain verified
- [ ] Sentry is receiving errors
- [ ] Rate limiting tested
- [ ] Password reset flow tested
- [ ] OAuth providers tested (if configured)
- [ ] Mobile responsiveness verified
- [ ] Performance tested (Lighthouse)

---

## Troubleshooting

### Build fails with "Module not found"
- Run `npm install` to ensure all dependencies are installed
- Check that `node_modules` is not in `.gitignore` if deploying from local build

### "Invalid environment variable" errors
- Verify all required env vars are set
- Check for typos in variable names
- Ensure no trailing spaces in values

### Password reset emails not sending
- Verify `MAILERSEND_API_KEY` is correct
- Ensure `EMAIL_FROM` uses a verified domain in MailerSend
- Check MailerSend dashboard for delivery logs

### Rate limiting not working
- Verify Upstash Redis credentials are correct
- Test Redis connection with Upstash dashboard
- Check that `UPSTASH_REDIS_REST_URL` includes `https://`

### OAuth sign-in fails
- Verify callback URLs match exactly in provider dashboards
- Ensure `NEXTAUTH_URL` matches your production domain
- Check that OAuth credentials are for production (not localhost)

### Sentry not receiving errors
- Verify both `SENTRY_DSN` and `NEXT_PUBLIC_SENTRY_DSN` are set
- Check Sentry project settings for correct DSN
- Trigger a test error to verify integration

---

## Security Recommendations

1. **Rotate secrets regularly**
   - `AUTH_SECRET` every 90 days
   - API keys every 6 months

2. **Monitor security logs**
   - Check Sentry for suspicious patterns
   - Review rate limit exceeded events

3. **Keep dependencies updated**
   - Run `npm audit` monthly
   - Update Next.js and security-critical packages

4. **Enable 2FA**
   - Enable on all third-party service accounts
   - Enable on deployment platform

5. **Backup database**
   - Configure automatic backups (Supabase has this built-in)
   - Test restore procedure quarterly

---

## Performance Optimization

1. **Enable caching**
   - Configure CDN caching for static assets
   - Use Vercel Edge Network if on Vercel

2. **Monitor performance**
   - Run Lighthouse audits monthly
   - Track Core Web Vitals in PostHog

3. **Optimize images**
   - Use Next.js Image component for user uploads
   - Configure image optimization in next.config.ts

4. **Database optimization**
   - Add indexes for frequently queried fields
   - Monitor slow queries in Supabase dashboard

---

## Support and Maintenance

### Regular Tasks
- Weekly: Review Sentry errors
- Weekly: Check PostHog analytics
- Monthly: Review and rotate logs
- Monthly: Update dependencies
- Quarterly: Security audit
- Quarterly: Performance audit

### Monitoring Dashboards
- Sentry: https://sentry.io/organizations/your-org/issues/
- Upstash: https://console.upstash.com/
- MailerSend: https://app.mailersend.com/

### Incident Response
1. Check Sentry for error details
2. Review recent deployments
3. Check third-party service status pages
4. Roll back if necessary
5. Document incident and resolution

---

## Next Steps

After successful production launch:

1. **Monitor for 48 hours**
   - Watch error rates in Sentry
   - Track user signups in logs
   - Verify email delivery in MailerSend

2. **Gather user feedback**
   - Set up feedback mechanism
   - Monitor support channels

3. **Plan Phase 2 features**
   - Review `docs/roadmap.md`
   - Prioritize based on user feedback

4. **Optimize based on data**
   - Review analytics from logs
   - Identify drop-off points
   - A/B test improvements
