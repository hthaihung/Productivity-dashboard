# Deployment Checklist

Complete checklist for pushing to GitHub and deploying to Render.

**Date:** 2026-04-27

---

## Pre-Push Checklist

### Code Quality
- [x] All lint errors fixed (`npm run lint` passes)
- [x] All TypeScript errors fixed (`npm run build` passes)
- [x] No console.log statements in production code (except intentional logging)
- [x] All tests pass (if applicable)

### Security
- [x] `.env` file is in `.gitignore`
- [x] No secrets or API keys in code
- [x] No sensitive data in git history
- [x] `.claude/` directory is ignored
- [x] `node_modules/` is ignored
- [x] `.next/` build artifacts are ignored

### Configuration
- [x] `.env.example` is up to date with all required variables
- [x] `package.json` has correct build/start commands
- [x] `package.json` specifies Node version (>=18.0.0)
- [x] Prisma schema is finalized
- [x] All dependencies are in `package.json`

### Documentation
- [x] README.md is clear and helpful
- [x] CLAUDE.md documents project structure
- [x] docs/production-setup.md exists
- [x] docs/render-deployment.md exists
- [x] docs/launch-readiness.md is current

---

## GitHub Push Checklist

### 1. Review Changes
```bash
git status
git diff
```

**Verify:**
- [ ] No `.env` file in staging
- [ ] No sensitive data visible
- [ ] Only intended files are staged

### 2. Stage Files
```bash
git add .
```

**Or selectively:**
```bash
git add src/
git add docs/
git add package.json
git add .gitignore
git add .env.example
# etc.
```

### 3. Commit
```bash
git commit -m "Initial production-ready commit

- Implemented auth, notes, tasks, pomodoro, streaks, analytics
- Added email delivery (MailerSend)
- Added error monitoring (Sentry)
- Added rate limiting (Upstash Redis)
- Premium dark-first UI redesign
- Production-ready with full documentation"
```

### 4. Create GitHub Repository
1. Go to https://github.com/new
2. Create repository (public or private)
3. **Do NOT initialize with README** (you already have one)
4. Copy the remote URL

### 5. Push to GitHub
```bash
# Add remote
git remote add origin https://github.com/yourusername/dashboard.git

# Push
git push -u origin main
```

**If your branch is named `master`:**
```bash
git branch -M main
git push -u origin main
```

### 6. Verify on GitHub
- [ ] All files are present
- [ ] `.env` is NOT visible
- [ ] README displays correctly
- [ ] No secrets in any files

---

## Pre-Deployment Checklist

### Third-Party Services Setup

#### Supabase (Database)
- [ ] Project created
- [ ] Database connection strings copied
- [ ] Migrations run: `npx prisma migrate deploy`
- [ ] Tables verified in Supabase dashboard

#### Upstash (Rate Limiting)
- [ ] Redis database created
- [ ] REST URL and token copied
- [ ] Connection tested

#### MailerSend (Email)
- [ ] Account created
- [ ] Sending domain verified
- [ ] API key generated
- [ ] Test email sent successfully

#### Sentry (Error Monitoring)
- [ ] Project created
- [ ] DSN copied
- [ ] Test error sent and received

#### OAuth Providers (Optional)
- [ ] Google OAuth app created (if using)
- [ ] Callback URLs configured

### Environment Variables Prepared
- [ ] All required variables documented
- [ ] Secrets generated (`AUTH_SECRET`)
- [ ] All values ready to paste into Render

---

## Render Deployment Checklist

### 1. Create Web Service
- [ ] Logged into Render dashboard
- [ ] Connected GitHub account
- [ ] Selected repository
- [ ] Configured service settings:
  - Name: `dashboard` (or your choice)
  - Region: Selected
  - Branch: `main`
  - Build Command: `npm install && npm run build`
  - Start Command: `npm start`
  - Instance Type: Selected (Free or Starter)

### 2. Configure Environment Variables

**Critical Variables:**
- [ ] `DATABASE_URL` (Supabase pooled connection)
- [ ] `DIRECT_URL` (Supabase direct connection)
- [ ] `AUTH_SECRET` (generated with openssl)
- [ ] `NEXTAUTH_URL` (https://your-app.onrender.com)

**Security Variables:**
- [ ] `UPSTASH_REDIS_REST_URL`
- [ ] `UPSTASH_REDIS_REST_TOKEN`

**Email Variables:**
- [ ] `MAILERSEND_API_KEY`
- [ ] `EMAIL_FROM`

**Monitoring Variables:**
- [ ] `SENTRY_DSN`
- [ ] `NEXT_PUBLIC_SENTRY_DSN`

**Optional OAuth Variables:**
- [ ] `GOOGLE_CLIENT_ID` (if using)
- [ ] `GOOGLE_CLIENT_SECRET` (if using)

### 3. Deploy
- [ ] Clicked "Create Web Service"
- [ ] Monitored build logs
- [ ] Build completed successfully
- [ ] Service is live

### 4. Update OAuth Callbacks (if using)
- [ ] Google callback URL updated to Render URL
- [ ] GitHub callback URL updated to Render URL

---

## Post-Deployment Verification

### Basic Health Check
- [ ] App loads at Render URL
- [ ] No console errors in browser
- [ ] Landing page displays correctly
- [ ] Navigation works

### Authentication Flow
- [ ] Sign up with new account works
- [ ] Sign in with created account works
- [ ] Sign out works
- [ ] Password reset request works
- [ ] Password reset email received
- [ ] Password reset completion works
- [ ] Sign in with new password works

### OAuth (if configured)
- [ ] Google sign-in works

### Core Features
- [ ] Create note works
- [ ] Edit note works
- [ ] Delete note works
- [ ] Create task works
- [ ] Complete task works
- [ ] Delete task works
- [ ] Start pomodoro timer works
- [ ] Complete pomodoro session works
- [ ] View analytics dashboard works
- [ ] Update profile works
- [ ] Delete account works (test with throwaway account)

### Monitoring Verification
- [ ] Sentry receiving events (check dashboard)
- [ ] Signup event logged
- [ ] Signin event logged
- [ ] Note created event logged
- [ ] Task completed event logged
- [ ] Pomodoro completed event logged

### Performance Check
- [ ] Page load time acceptable (<3s)
- [ ] No obvious performance issues
- [ ] Mobile responsive (test on phone)
- [ ] Lighthouse score acceptable (>80)

### Security Check
- [ ] HTTPS enabled (automatic on Render)
- [ ] Rate limiting working (try rapid requests)
- [ ] No secrets exposed in client-side code
- [ ] No sensitive data in error messages

---

## Rollback Plan (If Needed)

### If deployment fails:
1. Check Render logs for errors
2. Verify all environment variables are set
3. Check database connection
4. Try manual deploy from Render dashboard

### If app is broken in production:
1. Check Sentry for error details
2. Review recent commits
3. Roll back to previous commit:
   ```bash
   git revert HEAD
   git push origin main
   ```
4. Render will auto-deploy the rollback

### If database is corrupted:
1. Restore from Supabase backup
2. Re-run migrations if needed
3. Verify data integrity

---

## Post-Launch Monitoring (First 48 Hours)

### Hour 1
- [ ] Monitor Render logs for errors
- [ ] Check Sentry for exceptions
- [ ] Verify PostHog events flowing

### Hour 6
- [ ] Review error rate in Sentry
- [ ] Check user signup rate in logs
- [ ] Verify email delivery in MailerSend

### Hour 24
- [ ] Review all error types in Sentry
- [ ] Check database performance in Supabase
- [ ] Review rate limit hits in logs

### Hour 48
- [ ] Compile issues list
- [ ] Prioritize fixes
- [ ] Plan hotfix deployment if needed

---

## Success Criteria

### Deployment is successful when:
- [x] App is live and accessible
- [x] All core features work
- [x] Authentication flow works end-to-end
- [x] Monitoring is receiving data
- [x] No critical errors in Sentry
- [x] Performance is acceptable

### Ready for users when:
- [ ] All verification steps pass
- [ ] No critical bugs found
- [ ] Monitoring dashboards configured
- [ ] Support process defined
- [ ] Backup/restore tested

---

## Next Steps After Launch

1. **Monitor closely for 48 hours**
   - Watch Sentry for errors
   - Track user behavior in PostHog
   - Respond to issues quickly

2. **Gather feedback**
   - Set up feedback mechanism
   - Monitor user behavior
   - Identify pain points

3. **Plan improvements**
   - Review docs/roadmap.md
   - Prioritize Phase 2 features
   - Schedule regular updates

4. **Optimize performance**
   - Review Lighthouse scores
   - Optimize slow queries
   - Add caching where needed

5. **Scale as needed**
   - Monitor resource usage
   - Upgrade Render instance if needed
   - Consider CDN for static assets

---

## Emergency Contacts

- **Render Support**: https://render.com/support
- **Supabase Support**: https://supabase.com/support
- **Sentry Support**: https://sentry.io/support
- **MailerSend Support**: https://mailersend.com/help

---

## Notes

- Keep this checklist updated as deployment process evolves
- Document any issues encountered and solutions
- Share learnings with team
- Celebrate successful deployment! 🎉
