# Render Deployment Configuration

## Backend Deployment (render.com)
- Service Type: Web Service
- Build Command: `cd backend && npm install`
- Start Command: `cd backend && npm start`
- Environment Variables:
  - NODE_ENV=production
  - SUPABASE_URL=your_supabase_url
  - SUPABASE_ANON_KEY=your_supabase_anon_key

## Frontend Deployment (GitHub Pages)
The frontend will be deployed to GitHub Pages automatically via the workflow.

## Full Stack URLs:
- Frontend: https://aknursumar.github.io/bridge-food-connect
- Backend API: https://your-app-name.onrender.com

## Setup Instructions:
1. Enable GitHub Pages in repository settings
2. Create account on render.com
3. Connect this repository
4. Deploy backend as Web Service
5. Update frontend API calls to use Render backend URL
