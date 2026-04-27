# Dashboard - Personal Operating System

A premium, dark-first personal productivity platform for study, work, focus, planning, and habits.

![Phase 1 Complete](https://img.shields.io/badge/Phase%201-Complete-success)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

## Features

### Phase 1 (Complete + Hardened)
- **Authentication** - NextAuth.js with Google, GitHub, and credentials
  - Functional signup/signin forms with validation
  - Password reset flow with secure tokens
  - Rate limiting on auth endpoints
- **Notes** - Rich text editor with CRUD operations
  - XSS protection via input sanitization
- **Tasks** - Status/priority management with quick toggle
  - XSS protection on titles and descriptions
- **Pomodoro Timer** - 25/5 work/break cycles with 3D focus orb
- **Streaks** - Daily tracking with milestone badges
- **Analytics** - Aggregated productivity insights
- **Settings** - Profile management and account deletion
  - Real account deletion with confirmation flow
- **Security** - Production-ready hardening
  - Input sanitization (DOMPurify)
  - Rate limiting (Upstash Redis)
  - Security event logging
  - CSRF protection (built-in)

## Tech Stack

- **Frontend:** Next.js 16.2.4 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS 4 with custom design system
- **Backend:** Next.js Server Actions
- **Database:** PostgreSQL (Supabase) with Prisma 7
- **Auth:** NextAuth.js v5
- **ORM:** Prisma 7 with PrismaPg adapter
- **Security:** DOMPurify (XSS), Upstash (rate limiting), bcrypt (passwords)

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (Supabase recommended)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Dashboard
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```bash
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="<generate-with-openssl-rand-base64-32>"

# Optional but recommended for production
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."
```

4. Run database migrations
```bash
npx prisma migrate deploy
npx prisma generate
```

5. Start development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
Dashboard/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/auth/          # NextAuth endpoints
│   │   ├── auth/              # Sign in/sign up pages
│   │   └── dashboard/         # Protected dashboard routes
│   │       ├── notes/         # Notes module
│   │       ├── tasks/         # Tasks module
│   │       ├── focus/         # Pomodoro timer
│   │       ├── streaks/       # Streak tracking
│   │       ├── analytics/     # Analytics dashboard
│   │       └── settings/      # User settings
│   ├── components/            # React components
│   ├── lib/                   # Utilities (auth, prisma)
│   └── types/                 # TypeScript definitions
├── prisma/                    # Database schema and migrations
├── docs/                      # Documentation
│   ├── phase1-release.md     # Release summary
│   ├── deployment-checklist.md
│   ├── security.md           # Security measures and guidelines
│   └── session-state.md      # Development log
├── CLAUDE.md                  # Project instructions
└── DESIGN.md                  # Design system

```

## Documentation

- **[Security Hardening](docs/security.md)** - Security measures, configuration, and best practices
- **[Phase 1 Release Summary](docs/phase1-release.md)** - Complete architecture and status
- **[Deployment Checklist](docs/deployment-checklist.md)** - Step-by-step deployment guide
- **[Design System](DESIGN.md)** - Visual language and component guidelines
- **[Project Instructions](CLAUDE.md)** - Development guidelines

## Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

### Database Commands

```bash
npx prisma studio              # Open Prisma Studio
npx prisma migrate dev         # Create and apply migration
npx prisma migrate deploy      # Apply migrations (production)
npx prisma generate            # Generate Prisma Client
npx prisma db pull             # Pull schema from database
```

## Deployment

See [docs/deployment-checklist.md](docs/deployment-checklist.md) for detailed deployment instructions.

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Click the button above
2. Add environment variables
3. Deploy

## Known Limitations

✅ **Production-Ready** - Phase 1 is hardened for public production with documented limitations:

**Implemented Security:**
- ✅ Functional auth forms (signup, signin, password reset)
- ✅ Input sanitization (XSS protection)
- ✅ Rate limiting (auth + actions)
- ✅ Security event logging
- ✅ Real account deletion

**Remaining Limitations:**
- ⚠️ No email service (password reset tokens logged to console)
- ⚠️ No pagination (will be slow with many items)
- ⚠️ No mobile optimization
- ⚠️ No 2FA/MFA

See [docs/security.md](docs/security.md) for complete security documentation.

## Roadmap

### Phase 2 (Planned)
- Projects and workspaces
- Calendar and deadline planner
- Habit tracker
- Journal / daily review
- Notifications and reminders
- Search functionality

### Phase 3 (Future)
- Rewards, XP, levels, badges
- Forest-like focus mechanics
- Templates and workflows
- Smart summaries
- Rich analytics

## Contributing

This is a personal project currently in active development. Contributions are welcome after Phase 1 stabilization.

## License

Private project - All rights reserved

## Acknowledgments

- Design inspired by premium productivity tools and gaming dashboards
- Built with Next.js, Prisma, and Tailwind CSS
- Developed with Claude Code

---

**Status:** Phase 1 Complete + Security Hardened - Production Ready  
**Last Updated:** 2026-04-26
