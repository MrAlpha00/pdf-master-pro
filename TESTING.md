# Testing PDF Master Pro Mobile App

## Quick Start Testing Guide

Since this is a React Native mobile app built with Expo, you'll need to test it on a mobile device or emulator. Here are your options:

## Option 1: Test on Your Android Phone (Easiest!)

### Steps:
1. **Install Expo Go** on your Android phone from Google Play Store

2. **Start the Development Server**:
   ```bash
   cd client
   npx expo start
   ```

3. **Scan the QR Code**:
   - A QR code will appear in the terminal
   - Open Expo Go app on your phone
   - Tap "Scan QR code"
   - Point your camera at the QR code
   - The app will load on your phone!

4. **Grant Permissions**:
   - When prompted, allow camera access
   - Allow photo library access
   - These are needed for the PDF tools to work

### What to Test:
- ✅ **Camera Capture**: Take photos and convert to PDF
- ✅ **Image Upload**: Select images from gallery
- ✅ **Merge PDFs**: Combine PDF files
- ✅ **Compress PDF**: Reduce file size
- ✅ **Protect PDF**: Add password

## Option 2: Android Emulator (Requires Setup)

### Prerequisites:
- Android Studio installed
- Android emulator configured

### Steps:
```bash
cd client
npx expo start --android
```

This will automatically launch the Android emulator and install the app.

## Option 3: Build Standalone APK

### Using EAS Build:
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo (create free account if needed)
eas login

# Build APK
eas build --platform android --profile production
```

After the build completes (~10-20 minutes), you'll get a download link for the APK file that you can install directly on any Android device.

## Testing Checklist

### Home Screen
- [ ] Home screen loads with category cards
- [ ] Bottom navigation works (Home, Tools, Recent, Settings)
- [ ] Quick action buttons navigate correctly

### Camera Capture
- [ ] Camera opens when "Capture & Convert" is tapped
- [ ] Can take multiple photos
- [ ] Photos appear in preview
- [ ] Can remove individual photos
- [ ] "Convert to PDF" creates PDF successfully

### Image Upload
- [ ] "Images to PDF" opens gallery
- [ ] Can select multiple images
- [ ] Selected images display in grid
- [ ] Can remove images before conversion
- [ ] Conversion creates PDF

### Merge PDFs
- [ ] Can select multiple PDF files
- [ ] Files listed with names and sizes
- [ ] Can remove files from list
- [ ] Merge creates combined PDF

### Compress PDF
- [ ] Can select PDF file
- [ ] Compression shows file size reduction
- [ ] Displays original vs compressed size

### Protect PDF
- [ ] Can select PDF file
- [ ] Password input works
- [ ] Protected PDF created successfully

### Recent Files
- [ ] Recent operations appear in history
- [ ] Shows file name and operation type
- [ ] Can clear history

### Settings
- [ ] Settings screen loads
- [ ] Dark mode toggle works (if implemented)
- [ ] App info displays correctly

## Backend API Testing

The backend server runs on port 5000. You can test the API endpoints:

### Health Check:
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "PDF Master Pro API is running"
}
```

## Common Issues & Solutions

### Issue: "Unable to connect to server"
**Solution**: Make sure the backend server is running. Check the console for the message "🚀 PDF Master Pro Server running on port 5000"

### Issue: Camera doesn't open
**Solution**: 
- Check if camera permission was granted
- Try closing and reopening the app
- On emulator, make sure virtual camera is enabled

### Issue: Can't select PDFs
**Solution**: 
- PDF files must exist on the device
- On emulator, you may need to download sample PDFs first
- Check storage permissions

### Issue: QR code scanning not working
**Solution**:
- Make sure both phone and computer are on same Wi-Fi network
- Try manually entering the connection URL from Expo Go

## Network Configuration

### For Mobile Device Testing:
The mobile app needs to connect to your computer's server. Expo handles this automatically when both devices are on the same network.

If you have connection issues:
1. Check that both phone and computer are on same Wi-Fi
2. Check firewall settings on your computer
3. Try using tunnel mode: `npx expo start --tunnel`

## Performance Tips

- First load may take 30-60 seconds
- Subsequent loads are faster with hot reload
- Large PDF files may take longer to process
- Keep files under 10MB for best performance

## Development Mode Features

- Hot reload enabled (changes update automatically)
- Error overlay shows if something breaks
- Console logs visible in terminal
- Remote debugging available

## Production Testing

For production testing, build an APK:
```bash
eas build --platform android --profile production
```

This creates a standalone app without Expo Go dependency.

## Need Help?

1. Check the console for error messages
2. Review the logs in the Replit console
3. Make sure all permissions are granted
4. Try restarting the Expo development server

---

Happy Testing! 🎉
