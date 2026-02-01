# Spotify Web Playback Integration Guide

## Overview

This guide will walk you through setting up Spotify integration for the Mike WiLL Made-It website, enabling users to play music directly on the site without leaving for Spotify.

---

## Prerequisites

- Spotify Premium account (required for Web Playback SDK)
- Spotify Developer account
- Access to project environment variables

---

## Step 1: Create Spotify Developer App

### 1.1 Navigate to Spotify Developer Dashboard
Visit: [https://developer.spotify.com/dashboard](https://developer.spotify.com/dashboard)

### 1.2 Create New App
1. Click "Create app"
2. Fill in details:
   - **App name:** `Mike WiLL Made-It Website`
   - **App description:** `Official website music playback integration`
   - **Redirect URIs:** 
     - Development: `http://localhost:3000/api/auth/callback/spotify`
     - Production: `https://yourdomain.com/api/auth/callback/spotify`
   - **APIs used:** Web Playback SDK, Web API

### 1.3 Save App Credentials
After creating, you'll see:
- **Client ID:** (looks like `a1b2c3d4e5f6g7h8i9j0`)
- **Client Secret:** (click "Show Client Secret")

⚠️ **Keep these credentials secret!**

---

## Step 2: Configure Environment Variables

Add these to your `.env.local` file:

```bash
# Spotify Web Playback SDK
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here

# Spotify redirect URI (change for production)
NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/callback/spotify
```

---

## Step 3: Install Dependencies

```bash
npm install spotify-web-api-node @types/spotify-web-api-node
```

---

## Step 4: Implementation Files

I'll create the following files for you:

### 4.1 `/app/api/auth/callback/spotify/route.ts`
Handles OAuth callbacks from Spotify.

### 4.2 `/app/api/spotify/token/route.ts`
Exchanges authorization code for access token.

### 4.3 `/hooks/useSpotifyPlayer.ts`
React hook for Spotify Web Playback SDK.

### 4.4 `/components/SpotifyPlayer.tsx`
The actual music player UI component.

### 4.5 `/lib/spotify.ts`
Spotify API client configuration.

---

## Step 5: Testing

### 5.1 Development Testing
1. Start the dev server: `npm run dev`
2. Navigate to a discography item
3. Click "Play" button
4. You'll be redirected to Spotify login (first time only)
5. After authorization, music should play in the mini-player

### 5.2 Troubleshooting

**Issue:** "Premium required"
- **Solution:** Spotify Web Playback SDK requires Premium subscription

**Issue:** "Invalid redirect URI"
- **Solution:** Verify redirect URI matches exactly in Spotify Dashboard

**Issue:** "Playback not authorized"
- **Solution:** Check scopes in OAuth flow (`streaming`, `user-read-playback-state`, `user-modify-playback-state`)

---

## Step 6: Production Deployment

### 6.1 Update Redirect URI
In Spotify Dashboard, add production redirect URI:
```
https://youractualsite.com/api/auth/callback/spotify
```

### 6.2 Environment Variables on Vercel
1. Go to Vercel Dashboard
2. Project Settings → Environment Variables
3. Add:
   - `NEXT_PUBLIC_SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`
   - `NEXT_PUBLIC_SPOTIFY_REDIRECT_URI` (production URL)

---

## Features We'll Implement

### Phase 1: Basic Playback
- ✅ Play/Pause controls
- ✅ Track information display
- ✅ Volume control
- ✅ Progress bar

### Phase 2: Advanced Features
- ✅ Queue management
- ✅ Save to Spotify library
- ✅ Create playlist from selection
- ✅ Audio visualization sync

### Phase 3: Social Features
- ✅ Share currently playing
- ✅ Show play counts
- ✅ Collaborative playlists

---

## Security Best Practices

1. **Never commit secrets:** Always use environment variables
2. **Rotate credentials periodically:** Change Client Secret every 6 months
3. **Use HTTPS in production:** Required for OAuth
4. **Implement rate limiting:** Prevent API abuse
5. **Validate redirect URIs:** Whitelist only your domains

---

## API Rate Limits

Spotify API limits:
- **Web API:** 180 requests per minute
- **Web Playback SDK:** Real-time, no hard limit but subject to fair use

**Mitigation:**
- Cache track metadata
- Batch requests where possible
- Implement exponential backoff

---

##  Next Steps

Once you provide the Spotify credentials, I'll:

1. ✅ Create all implementation files
2. ✅ Set up OAuth flow
3. ✅ Build SpotifyPlayer component
4. ✅ Integrate with DiscographySection
5. ✅ Test playback functionality
6. ✅ Add audio visualization connection

**Estimated implementation time:** 2-3 hours

---

## Questions?

If you encounter any issues during setup, let me know and I'll help troubleshoot!
