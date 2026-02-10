# 🔥 Firebase Setup & Deployment Guide for EL3eyada

Complete guide to set up and deploy EL3eyada to Firebase.

---

## 📋 Prerequisites

- ✅ Firebase account created
- ✅ Firebase CLI installed: `npm install -g firebase-tools`
- ✅ Firebase project created: `el3eyada-b0da3`
- ✅ Service account credentials file (keep secure!)

---

## 🚀 Quick Start

### 1. Move Service Account Credentials (IMPORTANT!)

**SECURITY WARNING:** Never commit the service account JSON file to Git!

```bash
# Move the credentials file to project root
# The file should be: el3eyada-b0da3-firebase-adminsdk-fbsvc-97c0c7e2c2.json
# It's already in .gitignore for security
```

### 2. Login to Firebase

```bash
firebase login
```

This will open a browser window to authenticate with your Google account.

### 3. Get Firebase Web App Config

You need to get your Firebase web app configuration:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `el3eyada-b0da3`
3. Click the gear icon ⚙️ → Project Settings
4. Scroll down to "Your apps" section
5. If you don't have a web app, click "Add app" → Web (</>) icon
6. Register your app with name: "EL3eyada Web"
7. Copy the `firebaseConfig` object

### 4. Update Environment Variables

Update your `.env` file with the Firebase configuration:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your-api-key-here
REACT_APP_FIREBASE_AUTH_DOMAIN=el3eyada-b0da3.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=el3eyada-b0da3
REACT_APP_FIREBASE_STORAGE_BUCKET=el3eyada-b0da3.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

**To get these values:**
- Go to Firebase Console → Project Settings
- Scroll to "SDK setup and configuration"
- Select "Config" radio button
- Copy the values from the config object

### 5. Build and Deploy

```bash
# Build the production version
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

Or use the npm script:

```bash
npm run firebase:hosting
```

---

## 📖 Detailed Setup

### Firebase Services Setup

#### 1. **Firebase Hosting** (Already Configured ✅)

Configuration is in `firebase.json`:
- Public directory: `build`
- Single-page app: Yes (rewrites to index.html)
- Cache headers configured

#### 2. **Firebase Authentication** (Optional)

To enable authentication:

```bash
# In Firebase Console:
# 1. Go to Authentication
# 2. Click "Get Started"
# 3. Enable sign-in methods you want:
#    - Email/Password
#    - Google
#    - etc.
```

**Code Integration:**

```javascript
import { auth } from './config/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut 
} from 'firebase/auth';

// Sign up
const signup = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Sign in
const login = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Sign out
const logout = async () => {
  return await signOut(auth);
};
```

#### 3. **Cloud Firestore** (Optional - Database)

To use Firestore as your database:

```bash
# In Firebase Console:
# 1. Go to Firestore Database
# 2. Click "Create database"
# 3. Choose "Start in production mode"
# 4. Select location (us-central1 recommended)
```

**Code Integration:**

```javascript
import { db } from './config/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';

// Add patient
const addPatient = async (patientData) => {
  const docRef = await addDoc(collection(db, 'patients'), patientData);
  return docRef.id;
};

// Get all patients
const getPatients = async () => {
  const querySnapshot = await getDocs(collection(db, 'patients'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Update patient
const updatePatient = async (id, data) => {
  const docRef = doc(db, 'patients', id);
  await updateDoc(docRef, data);
};

// Delete patient
const deletePatient = async (id) => {
  await deleteDoc(doc(db, 'patients', id));
};
```

**Firestore Security Rules:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Patients collection
    match /patients/{patientId} {
      // Allow read/write only if authenticated
      allow read, write: if request.auth != null;
    }
    
    // Appointments collection
    match /appointments/{appointmentId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

#### 4. **Firebase Storage** (Optional - File Upload)

For storing patient documents, images, etc.:

```javascript
import { storage } from './config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Upload file
const uploadFile = async (file, path) => {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};
```

#### 5. **Firebase Analytics** (Optional)

Already integrated! Just enable it in Firebase Console:
- Go to Analytics
- Click "Enable Analytics"
- Analytics will automatically track page views and events

---

## 🔧 Configuration Files

### `firebase.json`
```json
{
  "hosting": {
    "public": "build",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### `.firebaserc`
```json
{
  "projects": {
    "default": "el3eyada-b0da3"
  }
}
```

### `src/config/firebase.js`
Firebase initialization file (already created)

---

## 🌐 Custom Domain Setup

### 1. Add Custom Domain in Firebase

```bash
# In Firebase Console:
# 1. Go to Hosting
# 2. Click "Add custom domain"
# 3. Enter your domain (e.g., el3eyada.com)
# 4. Follow DNS verification steps
```

### 2. Update DNS Records

Add these DNS records at your domain provider:

```
Type    Name    Value
A       @       [Firebase IPs provided]
TXT     @       [Verification code]
```

Firebase will automatically provide SSL certificates!

---

## 📊 Deployment Commands

### Basic Deployment

```bash
# Deploy everything
firebase deploy

# Deploy only hosting
firebase deploy --only hosting

# Deploy only firestore rules
firebase deploy --only firestore:rules

# Deploy only storage rules
firebase deploy --only storage
```

### Using npm Scripts

```bash
# Build and deploy hosting
npm run firebase:hosting

# Full deployment
npm run firebase:deploy
```

---

## 🔍 Testing Locally

```bash
# Serve using Firebase emulators
firebase serve

# Or use the build
npm run serve
```

Access at: `http://localhost:5000`

---

## 📱 Deploy to Production

### Step-by-Step:

1. **Update environment variables** in `.env.production`
2. **Build the app:**
   ```bash
   npm run build
   ```
3. **Test the build locally:**
   ```bash
   npm run serve
   ```
4. **Deploy to Firebase:**
   ```bash
   firebase deploy --only hosting
   ```
5. **Verify deployment:**
   - Check the URL provided in terminal
   - Usually: `https://el3eyada-b0da3.web.app`
   - Or: `https://el3eyada-b0da3.firebaseapp.com`

---

## 🔐 Security Best Practices

### 1. Environment Variables

- ✅ Never commit `.env` files to Git
- ✅ Use Firebase Console → Hosting → Environment Config
- ✅ Keep service account JSON secure

### 2. Firebase Security Rules

Always set up proper security rules for Firestore and Storage:

```javascript
// Firestore Rules Example
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      // Deny all by default
      allow read, write: if false;
    }
    
    // Allow authenticated users
    match /patients/{patientId} {
      allow read, write: if request.auth != null 
        && request.auth.uid == resource.data.userId;
    }
  }
}
```

### 3. API Keys

- Firebase API keys are safe to expose in client-side code
- They identify your Firebase project
- Security is enforced by Firebase Security Rules, not API keys

---

## 🐛 Troubleshooting

### Issue: "Firebase CLI not found"

```bash
npm install -g firebase-tools
firebase --version
```

### Issue: "Project not found"

```bash
# Make sure you're logged in
firebase login

# List your projects
firebase projects:list

# Use the correct project
firebase use el3eyada-b0da3
```

### Issue: "Build fails"

```bash
# Clear cache and rebuild
rm -rf node_modules build
npm install
npm run build
```

### Issue: "Deployment takes too long"

```bash
# Deploy only changed files
firebase deploy --only hosting
```

### Issue: "404 on page refresh"

This is already handled in `firebase.json` with rewrites. If still happening:
- Check `firebase.json` has the rewrite rule
- Redeploy: `firebase deploy --only hosting`

---

## 📈 Monitoring & Analytics

### 1. **Hosting Metrics**

View in Firebase Console → Hosting:
- Bandwidth usage
- Request count
- Cache hits

### 2. **Performance Monitoring**

```bash
npm install firebase
```

Then in your code:
```javascript
import { getPerformance } from 'firebase/performance';
const perf = getPerformance(app);
```

### 3. **Error Reporting**

Consider integrating:
- Firebase Crashlytics
- Sentry
- LogRocket

---

## 🎯 Post-Deployment Checklist

- [ ] App loads correctly
- [ ] All routes work (no 404 on refresh)
- [ ] Environment variables are correct
- [ ] Firebase services connected
- [ ] Analytics tracking
- [ ] HTTPS enabled (automatic with Firebase)
- [ ] Custom domain configured (if needed)
- [ ] Performance tested
- [ ] Mobile responsive verified

---

## 🚨 Important Notes

1. **Service Account File Security:**
   - Never commit `*firebase*adminsdk*.json` to Git
   - Already added to `.gitignore`
   - Keep it secure on your local machine only

2. **Firebase Quotas:**
   - **Hosting:** 10 GB storage, 360 MB/day bandwidth (Free tier)
   - **Firestore:** 50K reads, 20K writes/day (Free tier)
   - **Authentication:** Unlimited on Free tier

3. **Billing:**
   - Upgrade to Blaze (pay-as-you-go) for production
   - No charges if within free tier limits
   - Set up budget alerts

---

## 🔗 Useful Resources

- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)

---

## 📞 Support

For Firebase-specific issues:
- [Firebase Support](https://firebase.google.com/support)
- [Stack Overflow - Firebase](https://stackoverflow.com/questions/tagged/firebase)
- [Firebase Discord Community](https://discord.gg/firebase)

---

**Your Firebase Project:**
- 🔥 Project ID: `el3eyada-b0da3`
- 🌐 Default URL: `https://el3eyada-b0da3.web.app`
- 📧 Service Account: `firebase-adminsdk-fbsvc@el3eyada-b0da3.iam.gserviceaccount.com`

---

**Last Updated:** February 11, 2026
