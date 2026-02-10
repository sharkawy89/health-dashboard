# ⚡ Quick Deploy Guide (5-Minute Version)

## Step 1: Get Firebase Config (2 minutes)

1. Open: https://console.firebase.google.com/project/el3eyada-b0da3/settings/general
2. Scroll to "Your apps" → Click web app icon
3. Copy the config object (you'll see the values)
4. Note these 7 values:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`
   - `measurementId`

## Step 2: Update .env.production (2 minutes)

Open `.env.production` and update these lines with your values:

```env
REACT_APP_FIREBASE_API_KEY=PASTE_YOUR_API_KEY_HERE
REACT_APP_FIREBASE_AUTH_DOMAIN=el3eyada-b0da3.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=el3eyada-b0da3
REACT_APP_FIREBASE_STORAGE_BUCKET=el3eyada-b0da3.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=PASTE_YOUR_SENDER_ID_HERE
REACT_APP_FIREBASE_APP_ID=PASTE_YOUR_APP_ID_HERE
REACT_APP_FIREBASE_MEASUREMENT_ID=PASTE_YOUR_MEASUREMENT_ID_HERE
```

## Step 3: Deploy (1 minute)

Choose your platform and run the command:

### Firebase Hosting (Fastest)
```bash
npm run firebase:hosting
```
✅ Live at: https://el3eyada-b0da3.web.app

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=build
```

## Done! 🎉

Your app is now live!

---

## Need Help?

- **Issues with Firebase?** See FIREBASE_QUICKSTART.md
- **Full deployment guide?** See DEPLOY_NOW.md
- **Database setup?** See FIRESTORE_GUIDE.md

Last Updated: February 11, 2026
