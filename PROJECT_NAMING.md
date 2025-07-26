# Project Name Configuration for Vercel Deployment

If you encounter a "project already exists" error, here are several unique project name options you can use:

## Option 1: Use Current Configuration
The project is now configured with the name: `bridge-food-connect-2025`

## Option 2: Alternative Project Names

If the current name is still taken, you can choose from these alternatives:

1. `bridge-food-connect-[your-initials]` (e.g., `bridge-food-connect-akn`)
2. `ration-bridge-app-2025`
3. `food-donation-bridge-2025`
4. `community-food-connector`
5. `bridge-food-share-platform`
6. `ration-distribution-system`

## How to Change the Project Name

### Method 1: Update vercel.json
Edit the `name` field in `vercel.json`:
```json
{
  "name": "your-unique-project-name",
  "version": 2,
  ...
}
```

### Method 2: Use Vercel CLI with Custom Name
```bash
vercel --name your-unique-project-name
```

### Method 3: Rename During Vercel Dashboard Import
1. When importing from Git in Vercel dashboard
2. Change the project name in the "Project Name" field
3. The name in vercel.json will be overridden

## Quick Name Generator
You can also use this pattern:
- `bridge-food-[random-word]-2025`
- `ration-bridge-[your-city]-2025`
- `food-connect-[your-username]`

## Current Configuration
Your project is currently set up with:
- **Project Name**: `bridge-food-connect-2025`
- **Root Package**: `bridge-food-connect-2025`
- **Backend Package**: `bridge-food-connect-backend-2025`
- **Frontend Package**: `bridge-food-connect-frontend-2025`

## Deployment Steps with New Name

1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Update project name for Vercel deployment"
   git push
   ```

2. **Deploy to Vercel:**
   - The project name is now unique and should work
   - If you still get an error, try one of the alternative names above

3. **Verify deployment:**
   - Your app will be available at: `https://bridge-food-connect-2025.vercel.app`
   - Or with your custom name: `https://your-chosen-name.vercel.app`

## Note
The project name only affects the Vercel project identifier and URL. It doesn't change the functionality of your application.
