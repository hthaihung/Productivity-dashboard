# Render Deployment Guide

This guide covers deploying the Dashboard app to Render as a single Next.js Web Service.

## Prerequisites

- GitHub account with repo pushed
- Render account (free tier available)
- All third-party services configured (Supabase, Upstash, Resend, Sentry, PostHog)

---

## Step 1: Prepare Database

### Run Migrations on Supabase

Before deploying, ensure your production database has all tables:

```bash
# Set your production DATABASE_URL temporarily
export DATABASE_URL="your-production-database-url"

# Run migrations
npx prisma migrate deploy

# Verify
npx prisma studio
```

---

## Step 2: Create Render Web Service

1. Go to https://dashboard.render.com/
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure the service:

### Basic Settings

| Setting | Value |
|---------|-------|
| **Name** | `dashboard` (or your preferred name) |
| **Region** | Choose closest to your users |
| **Branch** | `main` (or `master`) |
| **Root Directory** | (leave blank) |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Instance Type** | Free (or paid for production) |

### Advanced Settings

- **Auto-Deploy**: Yes (recommended)
- **Health Check Path**: `/` (optional but recommended)

---

## Step 3: Configure Environment Variables

In Render dashboard, go to **Environment** tab and add all variables:

### Required Variables

```bash
# Database (from Supabase)
DATABASE_URL=postgresql://postgres.xxxxx:[password]@aws-0-xx-xxx.pooler.supabase.com:6543/postgres
DIRECT_URL=postgresql://postgres.xxxxx:[password]@aws-0-xx-xxx.pooler.supabase.com:5432/postgres

# Auth (generate with: openssl rand -base64 32)
AUTH_SECRET=your-generated-secret-here
NEXTAUTH_URL=https://your-app-name.onrender.com

# Rate Limiting (from Upstash)
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here

# Email (from Resend)
RESEND_API_KEY=re_your_key_here
EMAIL_FROM=noreply@yourdomain.com

# Error Monitoring (from Sentry)
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id

# Analytics (from PostHog)
NEXT_PUBLIC_POSTHOG_KEY=phc_your_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### Optional OAuth Variables

```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

**Important:** Update OAuth callback URLs in provider dashboards:
- Google: `https://your-app-name.onrender.com/api/auth/callback/google`
- GitHub: `https://your-app-name.onrender.com/api/auth/callback/github`

---

## Step 4: Deploy

1. Click **Create Web Service**
2. Render will:
   - Clone your repo
   - Install dependencies
   - Generate Prisma client
   - Build Next.js app
   - Start the server

Monitor the build logs for any errors.

---

## Step 5: Post-Deployment Verification

### Check Service Health

1. Visit your Render URL: `https://your-app-name.onrender.com`
2. Verify the landing page loads

### Test Authentication

1. Sign up with a new account
2. Verify you receive a welcome/confirmation (if implemented)
3. Sign in with the account
4. Request password reset
5. Check email for reset link
6. Complete password reset

### Test Core Features

1. Create a note
2. Create a task
3. Complete a task
4. Start and complete a pomodoro session
5. View analytics dashboard
6. Update profile settings

### Verify Monitoring

1. **Sentry**: Check for any errors at https://sentry.io
2. **PostHog**: Verify events are being tracked at https://posthog.com
3. **Render Logs**: Check for any warnings in Render dashboard logs

---

## Troubleshooting

### Build Fails: "Prisma Client not generated"

**Solution:** The `postinstall` script should handle this, but if it fails:
- Check that `prisma` is in `dependencies` (not `devDependencies`)
- Verify `DATABASE_URL` is set in environment variables

### Build Fails: "Module not found"

**Solution:**
- Ensure all dependencies are in `package.json`
- Try clearing Render's build cache (Settings → Clear build cache & deploy)

### App Crashes on Start

**Solution:**
- Check Render logs for error details
- Verify all required environment variables are set
- Ensure `DATABASE_URL` is accessible from Render's IP

### Database Connection Fails

**Solution:**
- Verify Supabase allows connections from Render
- Check that `DATABASE_URL` uses the pooled connection (port 6543)
- Ensure password is URL-encoded if it contains special characters

### OAuth Sign-in Fails

**Solution:**
- Verify `NEXTAUTH_URL` matches your Render URL exactly
- Update OAuth callback URLs in provider dashboards
- Ensure OAuth credentials are set in environment variables

### Password Reset Emails Not Sending

**Solution:**
- Verify `RESEND_API_KEY` is correct
- Ensure `EMAIL_FROM` uses a verified domain in Resend
- Check Resend dashboard for delivery logs

### Rate Limiting Not Working

**Solution:**
- Verify Upstash Redis credentials
- Test Redis connection from Render (check logs)
- Ensure `UPSTASH_REDIS_REST_URL` includes `https://`

---

## Performance Optimization

### Enable Persistent Disk (Optional)

For better performance with file uploads or caching:
1. Go to **Settings** → **Disks**
2. Add a disk mounted at `/app/cache`
3. Update Next.js config to use this path for cache

### Scale Up Instance

Free tier may be slow for production:
1. Go to **Settings** → **Instance Type**
2. Upgrade to Starter ($7/month) or higher
3. Redeploy

### Enable Auto-Scaling (Paid Plans)

For high traffic:
1. Go to **Settings** → **Scaling**
2. Configure min/max instances
3. Set scaling rules

---

## Monitoring and Maintenance

### View Logs

- **Real-time**: Render dashboard → Logs tab
- **Historical**: Render dashboard → Metrics tab

### Set Up Alerts

1. Go to **Settings** → **Notifications**
2. Add email or Slack webhook
3. Configure alert conditions (deploy failures, crashes)

### Database Backups

Supabase handles automatic backups:
1. Go to Supabase dashboard → Database → Backups
2. Verify daily backups are enabled
3. Test restore procedure

### Update Deployment

Push to GitHub main branch → Render auto-deploys

Or manually:
1. Go to Render dashboard
2. Click **Manual Deploy** → **Deploy latest commit**

---

## Custom Domain Setup (Optional)

1. Go to **Settings** → **Custom Domains**
2. Add your domain
3. Update DNS records as instructed by Render
4. Update `NEXTAUTH_URL` to your custom domain
5. Update OAuth callback URLs to use custom domain

---

## Cost Estimate

### Free Tier
- Web Service: Free (with limitations: sleeps after 15min inactivity)
- Suitable for: Development, testing, low-traffic demos

### Production Tier (Recommended)
- Web Service Starter: $7/month
- Supabase Pro: $25/month (optional, free tier may suffice)
- Upstash Redis: Free tier sufficient for most use cases
- Resend: Free tier (100 emails/day)
- Sentry: Free tier (5k events/month)
- PostHog: Free tier (1M events/month)

**Total minimum for production: ~$7-32/month**

---

## Security Checklist

- [ ] All environment variables set
- [ ] `AUTH_SECRET` is strong and unique
- [ ] Database credentials are secure
- [ ] OAuth callback URLs are correct
- [ ] Email sending domain is verified
- [ ] Sentry is receiving errors
- [ ] PostHog is tracking events
- [ ] Rate limiting is working
- [ ] HTTPS is enabled (automatic on Render)
- [ ] No secrets in git history

---

## Support

- **Render Docs**: https://render.com/docs
- **Render Community**: https://community.render.com
- **Render Status**: https://status.render.com

For app-specific issues, check:
- Sentry for errors
- Render logs for deployment issues
- PostHog for user behavior insights
