# Complete Vercel Deployment Guide - Step by Step

## 🎯 Root Directory Configuration

**IMPORTANT**: Your root directory should be: `./` (or leave it empty)

This is because your project structure is:
```
Ration-Bridge/
├── package.json          ← Root level
├── vercel.json           ← Root level
├── backend/              ← Backend folder
│   ├── package.json
│   └── server.js
├── frontend/             ← Frontend folder
│   ├── package.json
│   └── vite.config.ts
└── scripts/
```

## 📋 Complete Deployment Steps

### Step 1: Prepare Your Environment Variables

First, gather these values from your Supabase project:

1. Go to your Supabase dashboard
2. Navigate to Settings → API
3. Copy these values:
   - Project URL (SUPABASE_URL)
   - Anon/Public key (SUPABASE_ANON_KEY)

### Step 2: Test Your Project Locally

Run this command to verify everything works:

```bash
npm run pre-deploy-check
```

If you get errors, fix them before proceeding.

### Step 3: Commit and Push Your Code

```bash
git add .
git commit -m "Configure project for Vercel deployment"
git push origin main
```

### Step 4: Deploy to Vercel (Method A - Dashboard)

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com
   - Sign in with your GitHub account

2. **Import Your Project**
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose your `bridge-food-connect` repository

3. **Configure Project Settings**
   ```
   Framework Preset: Other
   Root Directory: ./ (or leave empty)
   Build Command: npm run vercel-build
   Output Directory: frontend/dist
   Install Command: npm run install:all
   Node.js Version: 18.x
   ```

4. **Add Environment Variables**
   Click "Environment Variables" and add:
   ```
   SUPABASE_URL = your_supabase_project_url
   SUPABASE_ANON_KEY = your_supabase_anon_key
   NODE_ENV = production
   ALLOWED_ORIGINS = https://bridge-food-connect-2025.vercel.app
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete

### Step 5: Deploy to Vercel (Method B - CLI)

If you prefer using the command line:

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from Root Directory**
   ```bash
   # Make sure you're in the root directory
   cd "c:\VIN - NK\Ration-Bridge\Ration-Bridge"
   
   # Deploy
   vercel
   ```

4. **Follow the Prompts**
   ```
   ? Set up and deploy "~/Ration-Bridge"? [Y/n] Y
   ? Which scope do you want to deploy to? [Your Account]
   ? Link to existing project? [y/N] N
   ? What's your project's name? bridge-food-connect-2025
   ? In which directory is your code located? ./
   ```

5. **Configure Environment Variables**
   ```bash
   vercel env add SUPABASE_URL
   vercel env add SUPABASE_ANON_KEY
   vercel env add NODE_ENV
   vercel env add ALLOWED_ORIGINS
   ```

## 🔧 Detailed Configuration Breakdown

### Root Directory: `./` (Current Directory)

**Why this is correct:**
- Your `package.json` is at the root level
- Your `vercel.json` is at the root level
- Vercel needs to see these files to understand your project structure

### Build Process Flow:

1. **Install Phase**: `npm run install:all`
   - Installs dependencies in both `/backend` and `/frontend`

2. **Build Phase**: `npm run vercel-build`
   - Builds the React frontend in `/frontend`
   - Creates production build in `/frontend/dist`

3. **Deploy Phase**:
   - Backend APIs become serverless functions
   - Frontend becomes static files served from CDN

### URL Structure After Deployment:

```
https://bridge-food-connect-2025.vercel.app/
├── /                     → Frontend (React app)
├── /login               → Frontend route
├── /dashboard           → Frontend route
├── /api/auth/*          → Backend API (serverless functions)
├── /api/users/*         → Backend API (serverless functions)
├── /api/food/*          → Backend API (serverless functions)
└── /health              → Backend health check
```

## 🚨 Common Issues and Solutions

### Issue 1: "Build failed"
**Solution**: Run `npm run vercel-build` locally first to test

### Issue 2: "API routes not working"
**Solution**: 
- Check environment variables are set
- Verify CORS configuration
- Check function logs in Vercel dashboard

### Issue 3: "Frontend shows 404"
**Solution**: 
- Ensure `outputDirectory` is set to `frontend/dist`
- Check that build creates files in the correct location

### Issue 4: "Root directory error"
**Solution**: 
- Set Root Directory to `./` or leave empty
- Do NOT set it to `frontend` or `backend`

## 📊 Verification Checklist

After deployment, verify these work:

- [ ] Main site loads: `https://your-app.vercel.app`
- [ ] API health check: `https://your-app.vercel.app/health`
- [ ] Login functionality works
- [ ] Database operations work
- [ ] No CORS errors in browser console

## 🎯 Final Configuration Summary

```json
// Vercel Project Settings
{
  "Framework": "Other",
  "Root Directory": "./",
  "Build Command": "npm run vercel-build",
  "Output Directory": "frontend/dist",
  "Install Command": "npm run install:all",
  "Node.js Version": "18.x"
}
```

```json
// Environment Variables
{
  "SUPABASE_URL": "your_supabase_url",
  "SUPABASE_ANON_KEY": "your_supabase_key",
  "NODE_ENV": "production",
  "ALLOWED_ORIGINS": "https://bridge-food-connect-2025.vercel.app"
}
```

## 🚀 Deploy Now!

You're ready to deploy! Choose either Method A (Dashboard) or Method B (CLI) above.

**Your app will be live at**: `https://bridge-food-connect-2025.vercel.app`

---

**Need Help?** Check the build logs in your Vercel dashboard if anything goes wrong.
