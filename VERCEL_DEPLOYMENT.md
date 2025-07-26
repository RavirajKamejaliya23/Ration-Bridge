# Vercel Deployment Guide for Bridge Food Connect

This guide will help you deploy your full-stack Bridge Food Connect application to Vercel.

## Prerequisites

1. A Vercel account (https://vercel.com)
2. Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)
3. Supabase project set up with your database

## Environment Variables Setup

Before deploying, you need to set up the following environment variables in your Vercel project:

### Required Environment Variables

1. **SUPABASE_URL** - Your Supabase project URL
2. **SUPABASE_ANON_KEY** - Your Supabase anonymous/public key
3. **NODE_ENV** - Set to `production`
4. **ALLOWED_ORIGINS** - Your Vercel domain (e.g., `https://your-app.vercel.app`)

### How to Add Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable with the appropriate values

## Deployment Steps

### Method 1: Deploy via Vercel Dashboard

1. Go to https://vercel.com and log in
2. Click "New Project"
3. Import your Git repository
4. Configure the following settings:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave empty for root)
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: `npm run install:all`

5. Add your environment variables in the Environment Variables section
6. Click "Deploy"

### Method 2: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. From your project root directory, run:
   ```bash
   vercel
   ```

4. Follow the prompts and configure your project settings

## Project Structure

Your project is configured as a monorepo with:
- **Backend**: Node.js/Express API in `/backend`
- **Frontend**: React/Vite application in `/frontend`
- **Serverless Functions**: Backend APIs deployed as Vercel functions

## API Routes

After deployment, your API will be available at:
- `https://your-app.vercel.app/api/auth/*` - Authentication routes
- `https://your-app.vercel.app/api/users/*` - User management routes
- `https://your-app.vercel.app/api/food/*` - Food request routes
- `https://your-app.vercel.app/health` - Health check endpoint

## Frontend Routes

Your React application will handle client-side routing for:
- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/donor` - Donor dashboard
- `/volunteer` - Volunteer dashboard
- `/admin` - Admin dashboard
- And other routes defined in your React Router setup

## Build Process

The deployment process will:

1. Install dependencies for both frontend and backend
2. Build the React frontend with Vite
3. Deploy the backend as Vercel serverless functions
4. Serve the frontend as static files
5. Configure routing to handle both API and frontend routes

## Troubleshooting

### Common Issues

1. **Build Failures**: 
   - Check that all dependencies are listed in package.json
   - Ensure TypeScript compilation succeeds locally

2. **API Not Working**:
   - Verify environment variables are set correctly
   - Check Supabase connection and credentials
   - Review function logs in Vercel dashboard

3. **Frontend 404 Errors**:
   - Ensure `vercel.json` routing configuration is correct
   - Check that build output is in the correct directory

4. **CORS Issues**:
   - Update `ALLOWED_ORIGINS` environment variable
   - Verify CORS configuration in backend server

### Monitoring and Logs

- Use Vercel dashboard to monitor deployments
- Check function logs for backend issues
- Use browser developer tools for frontend debugging

## Custom Domain (Optional)

1. Go to your Vercel project settings
2. Navigate to Domains
3. Add your custom domain
4. Update DNS settings as instructed
5. Update `ALLOWED_ORIGINS` environment variable

## Security Considerations

1. Never commit `.env` files with real credentials
2. Use environment variables for all sensitive data
3. Regularly rotate API keys and database credentials
4. Enable appropriate CORS policies
5. Consider implementing rate limiting for production

## Performance Optimization

1. The build process includes code splitting for better performance
2. Static assets are cached by Vercel's CDN
3. Serverless functions auto-scale based on demand
4. Consider implementing caching strategies for database queries

## Support

If you encounter issues:
1. Check Vercel documentation: https://vercel.com/docs
2. Review build logs in Vercel dashboard
3. Test the application locally before deploying
4. Ensure all environment variables are correctly set

---

**Note**: Make sure to test your deployment thoroughly, including all API endpoints and frontend functionality, before considering it production-ready.
