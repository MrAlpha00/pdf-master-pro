# PDF Master Pro

A comprehensive Android mobile application for all your PDF needs, built with Expo and React Native.

## Features

### 📸 Camera & Image to PDF
- **Camera Capture**: Take photos and instantly convert them to PDF
- **Image Upload**: Select multiple images from gallery and create multi-page PDFs
- Automatic image optimization and compression

### 📄 PDF Organization
- **Merge PDFs**: Combine multiple PDF files into one
- **Split PDF**: Extract specific pages or ranges
- **Compress PDF**: Reduce file size while maintaining quality
- **Extract Pages**: Pull out specific pages from PDFs

### 🔄 PDF Conversion
- **Images to PDF**: JPG, PNG to PDF conversion
- **PDF to Images**: Export PDF pages as images
- (Future: WORD, EXCEL, POWERPOINT conversions)

### ✏️ PDF Editing
- **Rotate Pages**: Rotate individual or all pages
- **Add Watermark**: Text watermarks for branding
- **Add Page Numbers**: Automatic page numbering
- **Crop PDF**: Trim PDF pages (coming soon)

### 🔐 PDF Security
- **Protect PDF**: Add password encryption
- **Unlock PDF**: Remove password protection
- **Sign PDF**: Digital signatures (coming soon)
- **Redact PDF**: Hide sensitive content (coming soon)

### 🎯 Additional Features
- Recent files history with quick access
- Offline-first architecture - most tools work without internet
- Clean, modern UI with Material Design
- Progress indicators for all operations
- File sharing capabilities
- Dark mode support

## Technology Stack

### Frontend (Mobile App)
- **Framework**: Expo SDK 54 + React Native
- **Language**: TypeScript
- **UI Library**: React Native Paper
- **Navigation**: React Navigation (Bottom Tabs + Stack)
- **State Management**: Zustand
- **Icons**: Material Community Icons
- **Storage**: AsyncStorage

### Backend (API Server)
- **Runtime**: Node.js
- **Framework**: Express.js
- **PDF Processing**: pdf-lib
- **File Upload**: Multer
- **Compression**: Compression middleware

## Project Structure

```
pdf-master-pro/
├── client/                  # React Native mobile app
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── navigation/      # Navigation configuration
│   │   ├── screens/         # All app screens
│   │   ├── store/           # Zustand state management
│   │   ├── types/           # TypeScript type definitions
│   │   └── utils/           # Helper functions and API calls
│   ├── assets/              # Images, icons, fonts
│   ├── App.tsx              # Root component
│   └── app.json             # Expo configuration
├── server/                  # Express backend API
│   ├── src/
│   │   ├── routes/          # API route handlers
│   │   └── index.js         # Server entry point
│   ├── uploads/             # Temporary file uploads
│   └── output/              # Processed PDF outputs
├── eas.json                 # EAS Build configuration
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js 20.x or higher
- npm or yarn
- Expo CLI
- EAS CLI (for building Android APK)

### Backend Setup
```bash
cd server
npm install
npm start
```

The server will run on http://localhost:5000

### Mobile App Setup
```bash
cd client
npm install
npx expo start
```

Scan the QR code with Expo Go app on your Android device or use an Android emulator.

## Building for Android with EAS

### 1. Install EAS CLI
```bash
npm install -g eas-cli
```

### 2. Login to Expo
```bash
eas login
```

### 3. Configure Project
```bash
eas build:configure
```

### 4. Build APK
```bash
# For development
eas build --platform android --profile development

# For production
eas build --platform android --profile production
```

### 5. Download and Install
Once the build completes, download the APK from the provided link and install it on your Android device.

## Development

### Running the App
```bash
# Start backend server
cd server && npm start

# Start mobile app (in another terminal)
cd client && npx expo start
```

### Available Scripts

#### Client
- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run web` - Run web version

#### Server
- `npm start` - Start Express server
- `npm run dev` - Start with nodemon (auto-reload)

## Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=5000
NODE_ENV=development
CLOUDCONVERT_API_KEY=your_api_key_here
PDF_CO_API_KEY=your_api_key_here
```

## API Endpoints

### PDF Operations
- `POST /api/pdf/merge` - Merge multiple PDFs
- `POST /api/pdf/split` - Split PDF into parts
- `POST /api/pdf/rotate` - Rotate PDF pages
- `POST /api/pdf/compress` - Compress PDF file
- `POST /api/pdf/images-to-pdf` - Convert images to PDF
- `POST /api/pdf/protect` - Add password protection

## Libraries Used

### Frontend
- `expo` - React Native framework
- `expo-camera` - Camera functionality
- `expo-image-picker` - Gallery image selection
- `expo-document-picker` - PDF file selection
- `expo-file-system` - File operations
- `expo-sharing` - Share functionality
- `react-native-paper` - Material Design UI components
- `@react-navigation/native` - Navigation
- `zustand` - State management
- `axios` - HTTP client

### Backend
- `express` - Web framework
- `pdf-lib` - PDF manipulation
- `multer` - File upload handling
- `cors` - Cross-origin resource sharing
- `compression` - Response compression

## Offline vs Online Features

### Works Offline
- Camera capture to PDF
- Images to PDF
- Merge PDFs
- Split PDFs
- Rotate PDFs
- Compress PDFs
- Password protect PDFs

### Requires Internet (Future Features)
- WORD/EXCEL/POWERPOINT conversions
- Advanced OCR
- Cloud storage integration

## Future Enhancements

- [ ] PDF to WORD/EXCEL/POWERPOINT conversion
- [ ] OCR (Optical Character Recognition)
- [ ] Advanced editing (crop, redact, edit text)
- [ ] Digital signatures with drawn/image signatures
- [ ] PDF comparison tool
- [ ] Cloud storage integration (Google Drive, Dropbox)
- [ ] Multi-language support
- [ ] Dark mode
- [ ] In-app purchases for premium features

## License

MIT License

## Support

For issues and feature requests, please open an issue on the project repository.

---

Built with ❤️ using Expo and React Native
