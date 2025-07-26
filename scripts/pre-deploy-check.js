#!/usr/bin/env node

/**
 * Pre-deployment test script for Bridge Food Connect
 * This script helps verify that the project is ready for Vercel deployment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Bridge Food Connect - Pre-deployment Verification\n');

// Check if required files exist
const requiredFiles = [
  'package.json',
  'vercel.json',
  'backend/package.json',
  'backend/server.js',
  'frontend/package.json',
  'frontend/vite.config.ts',
  '.env.example'
];

console.log('📁 Checking required files...');
let missingFiles = [];

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING!`);
    missingFiles.push(file);
  }
});

if (missingFiles.length > 0) {
  console.log(`\n❌ Missing required files: ${missingFiles.join(', ')}`);
  process.exit(1);
}

// Check package.json scripts
console.log('\n📦 Checking package.json scripts...');
const rootPackage = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredScripts = ['vercel-build', 'install:all', 'build:frontend'];

requiredScripts.forEach(script => {
  if (rootPackage.scripts && rootPackage.scripts[script]) {
    console.log(`✅ ${script}: ${rootPackage.scripts[script]}`);
  } else {
    console.log(`❌ Missing script: ${script}`);
  }
});

// Check if dependencies can be installed
console.log('\n📥 Testing dependency installation...');
try {
  console.log('Installing backend dependencies...');
  execSync('cd backend && npm install', { stdio: 'pipe' });
  console.log('✅ Backend dependencies installed successfully');

  console.log('Installing frontend dependencies...');
  execSync('cd frontend && npm install', { stdio: 'pipe' });
  console.log('✅ Frontend dependencies installed successfully');
} catch (error) {
  console.log('❌ Failed to install dependencies:', error.message);
  process.exit(1);
}

// Test build process
console.log('\n🔨 Testing build process...');
try {
  console.log('Building frontend...');
  execSync('cd frontend && npm run build', { stdio: 'pipe' });
  console.log('✅ Frontend build successful');

  // Check if dist directory was created
  if (fs.existsSync('frontend/dist')) {
    console.log('✅ Frontend dist directory created');
  } else {
    console.log('❌ Frontend dist directory not found');
  }
} catch (error) {
  console.log('❌ Build failed:', error.message);
  process.exit(1);
}

// Check environment variables
console.log('\n🔧 Environment variables check...');
if (fs.existsSync('.env')) {
  console.log('⚠️  .env file found - make sure to set these variables in Vercel');
} else {
  console.log('ℹ️  No .env file found - you\'ll need to set environment variables in Vercel');
}

console.log('✅ .env.example file exists for reference');

// Verify Vercel configuration
console.log('\n⚙️  Vercel configuration check...');
const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));

if (vercelConfig.builds && vercelConfig.routes) {
  console.log('✅ Vercel configuration looks good');
} else {
  console.log('❌ Vercel configuration may be incomplete');
}

// Summary
console.log('\n🎉 Pre-deployment verification complete!');
console.log('\n📋 Next steps:');
console.log('1. Push your code to your Git repository');
console.log('2. Connect your repository to Vercel');
console.log('3. Set up environment variables in Vercel dashboard:');
console.log('   - SUPABASE_URL');
console.log('   - SUPABASE_ANON_KEY');
console.log('   - NODE_ENV=production');
console.log('   - ALLOWED_ORIGINS (your Vercel domain)');
console.log('4. Deploy your project');
console.log('\n📖 For detailed instructions, see VERCEL_DEPLOYMENT.md');
console.log('\n🚀 Good luck with your deployment!');
