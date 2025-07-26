# 🚀 Quick Vercel Deployment Reference

## ⚙️ EXACT VERCEL SETTINGS

Copy these settings exactly when deploying:

### Project Configuration
```
Framework Preset: Other
Root Directory: ./
Build Command: npm run vercel-build
Output Directory: frontend/dist
Install Command: npm run install:all
Node.js Version: 18.x
```

### Environment Variables
```
Name: SUPABASE_URL
Value: [Your Supabase Project URL]

Name: SUPABASE_ANON_KEY  
Value: [Your Supabase Anon Key]

Name: NODE_ENV
Value: production

Name: ALLOWED_ORIGINS
Value: https://bridge-food-connect-2025.vercel.app
```

## 📁 Root Directory Explanation

**Set Root Directory to: `./` (or leave empty)**

Why? Because your project structure is:
```
Your Repository Root/
├── package.json          ← Vercel needs to see this
├── vercel.json           ← Vercel needs to see this  
├── backend/              ← API code
├── frontend/             ← React app
└── scripts/              ← Build scripts
```

## 🔄 Deployment Process

1. **Import Project**: Choose your `bridge-food-connect` repo
2. **Configure Settings**: Use the exact settings above
3. **Add Environment Variables**: All 4 variables listed above
4. **Deploy**: Click the Deploy button
5. **Wait**: Build takes 2-3 minutes
6. **Test**: Visit your live URL

## 🌐 Your Live URLs

After deployment:
- **Main App**: https://bridge-food-connect-2025.vercel.app
- **API Health**: https://bridge-food-connect-2025.vercel.app/health
- **API Endpoints**: https://bridge-food-connect-2025.vercel.app/api/*

## ✅ Pre-Deployment Checklist

- [✅] Pre-deployment check passed
- [✅] Dependencies install successfully  
- [✅] Frontend builds successfully
- [✅] All required files present
- [✅] Vercel.json configured correctly
- [✅] Environment variables documented

## 🚨 If Something Goes Wrong

1. **Check Build Logs**: In Vercel dashboard → Functions tab
2. **Verify Environment Variables**: Settings → Environment Variables
3. **Test Locally**: Run `npm run vercel-build` 
4. **Check Console**: Browser dev tools for frontend errors

---

**You're ready to deploy! 🚀**
