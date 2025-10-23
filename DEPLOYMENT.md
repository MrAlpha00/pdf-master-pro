# PDF Master Pro - Deployment Guide

## Quick Deployment Checklist

### Pre-Deployment
- [x] Backend API running on port 5000
- [x] All screens implemented (working + placeholder)
- [x] Navigation properly configured
- [x] API URL configuration dynamic for dev/prod
- [x] File URLs properly normalized
- [x] EAS configuration ready

### Build & Deploy Steps

## Step 1: Test Locally (IMPORTANT!)

Before building for production, test on a real Android device:

```bash
# Terminal 1: Start backend
cd server && npm start

# Terminal 2: Start mobile app
cd client && npx expo start
```

Then:
1. Scan QR code with Expo Go app on Android phone
2. Test these critical features:
   - Camera capture → PDF
   - Images to PDF from gallery
   - Merge PDFs
   - Split PDF
   - Rotate PDF
   - Compress PDF
   - Protect PDF
3. Verify all navigation works (including placeholder screens)

## Step 2: Configure Production API URL

### Option A: Deploy Backend First (Recommended)

1. Deploy your backend server to a hosting service:
   - **Render.com** (free tier available)
   - **Railway.app** (free tier available)
   - **Heroku** (paid)
   - Or any Node.js hosting

2. Update `client/src/utils/config.ts`:
   ```typescript
   if (__DEV__) {
     // development code stays same
   }
   
   // Change this line:
   return 'https://your-actual-backend-url.com/api';
   ```

3. Replace `your-actual-backend-url.com` with your deployed backend URL

### Option B: Use ngrok for Testing

For quick testing without deploying backend:

```bash
# Install ngrok: https://ngrok.com/download

# Expose local backend
ngrok http 5000

# Update config.ts with ngrok URL (e.g., https://abc123.ngrok.io/api)
```

## Step 3: Build Android APK with EAS

### First Time Setup

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to Expo (create free account if needed)
eas login

# Configure project for EAS
cd client
eas build:configure
```

### Build Production APK

```bash
# Build APK (takes 10-20 minutes)
eas build --platform android --profile production

# Or for faster preview build:
eas build --platform android --profile preview
```

### Download and Install

1. Wait for build to complete
2. Download APK from provided link
3. Transfer to Android device
4. Enable "Install from Unknown Sources" in Android settings
5. Install APK

## Step 4: Production Considerations

### Backend Deployment Checklist

When deploying backend to production:

- [ ] Set environment variables:
  ```
  PORT=5000
  NODE_ENV=production
  ```
- [ ] Configure CORS to allow your mobile app domain
- [ ] Set up file storage (uploads/output directories)
- [ ] Consider file size limits and cleanup
- [ ] Monitor server logs for errors

### Mobile App Configuration

- [ ] Update API URL in config.ts
- [ ] Test on multiple Android devices/versions
- [ ] Verify camera and storage permissions
- [ ] Test offline functionality
- [ ] Verify file sharing works

## Alternative Deployment Options

### Expo EAS Update (OTA Updates)

For quick fixes without full rebuild:

```bash
eas update --branch production
```

### Internal Distribution

Share with testers before public release:

```bash
eas build --platform android --profile preview
```

This creates an APK you can share directly.

### Google Play Store

For public release:

```bash
# Build AAB (Android App Bundle)
eas build --platform android --profile production --auto-submit
```

Then follow Google Play Console instructions.

## Environment-Specific Builds

### Development Build (for testing with Expo Dev Client)

```bash
eas build --platform android --profile development
```

Includes development tools and debugging.

### Preview Build (for internal testing)

```bash
eas build --platform android --profile preview
```

APK format, can be installed directly.

### Production Build (for release)

```bash
eas build --platform android --profile production
```

Optimized and minified for app stores or direct distribution.

## Common Issues & Solutions

### Issue: "Could not connect to server"

**Solution**: 
- Verify backend is running and accessible
- Check API URL in config.ts
- On Android emulator, use `http://10.0.2.2:5000/api`
- On physical device, both device and computer must be on same Wi-Fi

### Issue: "Build failed"

**Solution**:
- Check eas build logs for specific error
- Verify app.json configuration
- Ensure all dependencies are compatible
- Try `npm install` in client directory

### Issue: "App crashes on launch"

**Solution**:
- Check if all native dependencies are installed
- Verify app.json has correct permissions
- Review Expo build logs for native errors

## Backend Hosting Recommendations

### Render.com (Free Tier)
- Free 750 hours/month
- Auto-deploys from Git
- Easy Node.js setup

```bash
# Add to server/package.json
"engines": {
  "node": ">=20.0.0"
}
```

### Railway.app (Free $5 Credit/month)
- Generous free tier
- Auto-deploys from Git
- Simple dashboard

### Replit Deployments
- Can deploy backend directly from Replit
- Use Replit Deployments feature
- Get a public URL automatically

## Testing on Real Device

### Via Expo Go (Development)
1. Install Expo Go from Play Store
2. `cd client && npx expo start`
3. Scan QR code with Expo Go
4. Test all features

### Via APK (Production-like)
1. Build with EAS (see Step 3)
2. Install APK on device
3. Test all features
4. Verify API calls work

## Final Checklist Before Public Release

- [ ] All implemented features tested on real device
- [ ] Backend deployed and stable
- [ ] Production API URL configured
- [ ] App permissions working (camera, storage)
- [ ] Error handling tested
- [ ] File operations successful
- [ ] Recent files saving properly
- [ ] Settings persisting correctly
- [ ] App doesn't crash on common operations
- [ ] Privacy policy added (if required)
- [ ] App icon and splash screen configured

## Support & Maintenance

After deployment:

1. **Monitor Backend Logs**: Watch for API errors
2. **User Feedback**: Collect and address issues
3. **Updates**: Use EAS Update for quick fixes
4. **New Features**: Build and deploy new versions

## Need Help?

- Expo Docs: https://docs.expo.dev
- EAS Build Docs: https://docs.expo.dev/build/introduction/
- Replit Deployments: https://docs.replit.com/deployments

---

You're ready to deploy PDF Master Pro! 🚀
