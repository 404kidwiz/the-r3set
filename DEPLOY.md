# Deployment Guide - THE R3SET

This guide outlines the steps to deploy the project to Vercel.

## Prerequisites
- Vercel CLI installed (`npm install -g vercel`)
- Stripe account (Production keys)
- PostHog account (API key and Host)
- GA4 Measurement ID

## Environment Variables
Ensure the following variables are configured in the Vercel project settings:

| Variable | Description |
|----------|-------------|
| `STRIPE_SECRET_KEY` | Stripe Secret Key (sk_...) |
| `NEXT_PUBLIC_STRIPE_KEY` | Stripe Publishable Key (pk_...) |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhook Secret (whsec_...) |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog Project API Key |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog Host (default: https://app.posthog.com) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 Measurement ID |
| `VAULT_PASSCODE` | Passcode for the /vault section |

## Deployment Steps

1. **Local Build Check**
   ```bash
   npm run build
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Link Project**
   ```bash
   vercel link
   ```

4. **Deploy to Preview**
   ```bash
   vercel
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Post-Deployment Checklist
- [ ] Verify Stripe Checkout flow on production.
- [ ] Check PostHog dashboard for initial events.
- [ ] Run Lighthouse audit on the production URL.
- [ ] Verify `/vault` access with the production passcode.
