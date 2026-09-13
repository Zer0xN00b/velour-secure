# Security Audit: Authentication System

## Summary

The initial version of this site was scaffolded with an AI website
builder. When the tool ran out of generation credits partway through,
the authentication feature was completed by a different AI tool,
which silently fell back to a client-side-only auth implementation —
despite "Neon + Better Auth" (a real backend) having been selected
during setup. This document records the vulnerabilities found in that
version, the fixes applied, and how each fix was verified.

## Findings (Before)

| # | Finding | Risk |
|---|---------|------|
| 1 | Passwords stored in plain text in browser `localStorage` | Anyone with access to the browser (or a simple XSS bug) could read every user's password directly |
| 2 | "Session" was a JSON object sitting in `localStorage` | A user's login state could be forged by manually creating that object — no server ever checked it |
| 3 | No server-side auth logic at all | All "authentication" happened in client-side JavaScript, which is fully visible and editable by anyone using the site |
| 4 | No rate limiting on login attempts | Nothing prevented scripted, repeated password guessing |

These issues are notable because the AI-generated code was
functionally complete and visually convincing — it looked and behaved
like real authentication, which is precisely what made it dangerous:
nothing about using the site would have revealed the problem without
inspecting the underlying code.

## Fix (After)

Replaced the client-side auth system with a real backend:

- **[Better Auth](https://www.better-auth.com/)** for authentication logic, backed by a real **Neon Postgres** database
- Passwords are hashed (scrypt) server-side before storage — the raw password is never stored anywhere
- Sessions are issued and validated server-side, signed with a secret key (`BETTER_AUTH_SECRET`) never exposed to the client
- Built-in rate limiting on sign-in attempts
- All secrets (`DATABASE_URL`, `BETTER_AUTH_SECRET`) live only in environment variables — never committed to source control

## Verification (Not Just Claimed — Tested)

| Finding | How it was verified |
|---|---|
| Password hashing | Queried the database directly (`SELECT * FROM "account"`) and confirmed the stored password field is a long hashed string, not the original password |
| Session forgery | Manually edited the session cookie in browser DevTools; confirmed the app immediately treated the session as invalid and logged out |
| Server-side auth | Confirmed no password comparison logic exists in any client-side file — sign-in is a network request to `/api/auth/sign-in/email`, resolved entirely server-side |
| Rate limiting | Attempted repeated failed logins in quick succession and observed enforced delay/throttling behavior |

## Known Limitations (Still Open)

- Password reset via email is wired up on the client, but no email-sending provider (e.g. Resend) is configured yet — so reset emails are not currently delivered. This is a planned next step, not an oversight.
- "Order history" and "favorites" features shown on the dashboard/menu pages are still placeholder demo data, unrelated to the auth fix, and not backed by real storage yet.

## Stack

- **Frontend:** Next.js (React)
- **Auth:** Better Auth
- **Database:** Neon (serverless Postgres)
- **Hosting:** Vercel
