# Aletheia Website - Debugging Guide

This guide helps you debug deployment issues on Render.com using the comprehensive logging system we've implemented.

## 🚀 Quick Start

### Local Development with Debugging
```bash
# Windows
npm run debug:windows

# Mac/Linux
npm run debug
```

### View Environment Information
```bash
npm run logs
```

### Production Debug Mode
```bash
npm run render:debug
```

## 📊 Debug Endpoints

### 1. Debug API Route
Visit `/api/debug` to get comprehensive deployment information:

```bash
# Local
curl http://localhost:3000/api/debug

# Production (replace with your domain)
curl https://your-app.onrender.com/api/debug
```

This endpoint provides:
- Environment variables
- Render-specific configuration
- System information
- Request details
- Build information
- Next.js version info

### 2. Health Check
The `/api/debug` endpoint also serves as a health check for Render.

## 🔍 Understanding the Logs

### Log Levels
- **ERROR** (Red): Critical issues that prevent the app from working
- **WARN** (Yellow): Issues that don't break functionality but need attention
- **INFO** (Cyan): Important operational information
- **DEBUG** (Magenta): Detailed debugging information

### Key Log Messages to Watch For

#### Startup Logs
```
[INFO] Custom server starting...
[INFO] Environment Variables
[INFO] Server configuration
[INFO] Next.js app prepared successfully
[INFO] Server started successfully
```

#### Render-Specific Logs
```
[INFO] Render deployment detected
[INFO] Render-specific environment variables
```

#### Error Logs
```
[ERROR] Server failed to start
[ERROR] Failed to prepare Next.js app
[ERROR] Request handling error
```

## 🛠️ Common Render Issues & Solutions

### 1. Build Failures
**Symptoms:**
- Build logs show compilation errors
- App fails to deploy

**Debug Steps:**
1. Check build logs in Render dashboard
2. Run `npm run build` locally
3. Check for missing dependencies
4. Verify Node.js version compatibility

**Common Solutions:**
- Add missing dependencies to `package.json`
- Update Node.js version in Render settings
- Fix TypeScript compilation errors

### 2. Runtime Errors
**Symptoms:**
- App deploys but returns 500 errors
- Blank pages or broken functionality

**Debug Steps:**
1. Check `/api/debug` endpoint
2. Review server logs in Render dashboard
3. Look for uncaught exceptions
4. Check memory usage

**Common Solutions:**
- Fix environment variable issues
- Resolve missing static assets
- Address memory leaks

### 3. Port Configuration Issues
**Symptoms:**
- App doesn't start
- Port binding errors

**Debug Steps:**
1. Check `PORT` environment variable
2. Verify `startCommand` in Render settings
3. Review server startup logs

**Solution:**
Ensure `PORT` is set to `10000` in Render environment variables.

### 4. Static Asset Issues
**Symptoms:**
- 404 errors for images/fonts
- Broken styling

**Debug Steps:**
1. Check `/public` directory
2. Verify file paths in code
3. Check build output

**Solution:**
Add missing files to `/public` directory.

## 📋 Render Deployment Checklist

### Before Deployment
- [ ] All dependencies in `package.json`
- [ ] No TypeScript compilation errors
- [ ] Static assets in `/public` directory
- [ ] Environment variables configured
- [ ] Build command: `npm run build`
- [ ] Start command: `npm start`

### Render Settings
- [ ] **Environment**: Node
- [ ] **Build Command**: `npm run build`
- [ ] **Start Command**: `npm start`
- [ ] **Publish Directory**: (leave blank)
- [ ] **Port**: `10000`
- **Environment Variables**:
  - `NODE_ENV`: `production`
  - `PORT`: `10000`

### Post-Deployment Verification
- [ ] App starts without errors
- [ ] `/api/debug` endpoint accessible
- [ ] All pages load correctly
- [ ] Static assets load
- [ ] No console errors

## 🔧 Advanced Debugging

### Memory Monitoring
The server automatically logs memory usage every minute:
```
[DEBUG] Memory usage
Context: {
  "rss": "45 MB",
  "heapTotal": "20 MB",
  "heapUsed": "15 MB",
  "external": "2 MB"
}
```

### Request Logging
Every request is logged with details:
```
[DEBUG] Request details
Context: {
  "pathname": "/",
  "method": "GET",
  "userAgent": "Mozilla/5.0...",
  "referer": "https://..."
}
```

### Error Tracking
All errors are logged with full stack traces:
```
[ERROR] Request handling error
Context: {
  "error": "Cannot read property 'x' of undefined",
  "stack": "TypeError: Cannot read property...",
  "url": "/api/contact",
  "method": "POST"
}
```

## 🚨 Emergency Debugging

### If App Won't Start
1. Check Render logs immediately
2. Look for startup errors
3. Verify environment variables
4. Check Node.js version compatibility

### If App Returns 500 Errors
1. Visit `/api/debug` endpoint
2. Check server logs
3. Look for uncaught exceptions
4. Verify all dependencies are installed

### If Build Fails
1. Run `npm run build` locally
2. Check for TypeScript errors
3. Verify all imports are correct
4. Check for missing files

## 📞 Getting Help

When reporting issues, include:
1. Full error logs from Render dashboard
2. Output from `/api/debug` endpoint
3. Steps to reproduce the issue
4. Expected vs actual behavior

## 🔄 Continuous Monitoring

The logging system provides continuous monitoring:
- Memory usage tracking
- Request/response logging
- Error tracking with stack traces
- Environment variable monitoring
- Render-specific deployment information

Use these logs to proactively identify and resolve issues before they affect users. 