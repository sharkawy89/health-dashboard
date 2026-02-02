# EL kabsola - Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel

### Method 1: Deploy via Vercel CLI

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
cd "d:\my projects\react app\health-dashboard"
vercel
```

4. **Deploy to Production**
```bash
vercel --prod
```

---

### Method 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Import your Git repository
4. Vercel will auto-detect Create React App
5. Add environment variables (see below)
6. Click "Deploy"

---

## 🔐 Environment Variables for Vercel

Add these in **Vercel Dashboard** → **Settings** → **Environment Variables**:

### Production Variables

```
REACT_APP_NAME=EL kabsola
REACT_APP_VERSION=1.0.0
REACT_APP_API_URL=https://your-api-domain.com/api
REACT_APP_API_TIMEOUT=5000
REACT_APP_ENV=production
REACT_APP_ENABLE_MOCK_DATA=true
REACT_APP_ENABLE_ANALYTICS=false
REACT_APP_DEFAULT_LANGUAGE=en
REACT_APP_DATE_FORMAT=MMM dd, yyyy
```

### Development/Preview Variables (Optional)

```
REACT_APP_NAME=EL kabsola (Dev)
REACT_APP_ENV=development
REACT_APP_ENABLE_MOCK_DATA=true
```

---

## 📋 Vercel Configuration

The `vercel.json` file is already configured with:
- Build commands
- Output directory
- Environment variable references

---

## 🛠 Build Configuration

**Framework Preset:** Create React App (Auto-detected)

**Build Command:**
```bash
npm run build
```

**Output Directory:**
```
build
```

**Install Command:**
```bash
npm install
```

---

## 🌍 Custom Domain (Optional)

1. Go to **Vercel Dashboard** → **Settings** → **Domains**
2. Add your custom domain (e.g., `elkabsola.yourdomain.com`)
3. Update DNS records as instructed
4. SSL is automatic

---

## 📊 Environment Variables Explained

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_NAME` | Application name | EL kabsola |
| `REACT_APP_VERSION` | App version | 1.0.0 |
| `REACT_APP_API_URL` | Backend API URL | localhost:3000/api |
| `REACT_APP_API_TIMEOUT` | API timeout (ms) | 5000 |
| `REACT_APP_ENV` | Environment | production |
| `REACT_APP_ENABLE_MOCK_DATA` | Use mock data | true |
| `REACT_APP_ENABLE_ANALYTICS` | Enable analytics | false |

---

## 🔄 Deployment Workflow

### Automatic Deployments
- **Push to main branch** → Production deployment
- **Push to other branches** → Preview deployment
- **Pull requests** → Preview deployment

### Manual Deployments
```bash
vercel --prod  # Deploy to production
vercel         # Deploy preview
```

---

## 📱 Access Your App

After deployment:
- **Production:** `https://your-project.vercel.app`
- **Preview:** `https://your-project-git-branch.vercel.app`

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
vercel --force
```

### Environment Variables Not Working
- Ensure all variables start with `REACT_APP_`
- Redeploy after changing env vars
- Check Vercel logs

### Routes Not Working (404)
- Vercel automatically handles SPA routing
- No additional configuration needed for React Router

---

## 📝 Post-Deployment Checklist

- [ ] Verify all environment variables are set
- [ ] Test all routes work correctly
- [ ] Check API connections (if using real API)
- [ ] Verify analytics (if enabled)
- [ ] Test on mobile devices
- [ ] Set up custom domain (optional)
- [ ] Enable preview deployments for branches

---

## 🔗 Useful Links

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel Docs](https://vercel.com/docs)
- [Environment Variables Guide](https://vercel.com/docs/environment-variables)

---

*Your EL kabsola app is ready for deployment! 🚀*
