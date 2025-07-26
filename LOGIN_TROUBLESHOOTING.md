# Demo Authentication Mode

If Supabase is having connectivity issues, you can enable demo mode for testing:

## Quick Fix for Testing:

1. **Demo User**: Use email `demo@test.com` with password `demo123` 
2. **Frontend**: Will create a temporary session for testing
3. **All features**: Will work except actual data persistence

## To Enable Demo Mode:

Add this to your .env file:
```
DEMO_MODE=true
```

This will bypass Supabase for authentication and use mock data.

## Production Fix:

1. Check Supabase project status at supabase.com
2. Verify project is not paused (free tier limitation)
3. Check network connectivity to Supabase servers
4. Regenerate credentials if needed

## Current Issue:
The error `ECONNRESET` indicates network connection issues to Supabase servers.
