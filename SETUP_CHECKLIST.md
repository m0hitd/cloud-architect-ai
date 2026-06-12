# Cloud Architect AI — Setup Checklist

Use this checklist to track your setup progress from zero to a running app.

> [!TIP]
> The only hard requirement to run the app is a **Gemini API key**. Firebase is optional and only needed for deployment.

---

## 1. Prerequisites

- [ ] Node.js v18 or higher installed → [nodejs.org](https://nodejs.org)
- [ ] A Google account (to access AI Studio and, optionally, Firebase)

---

## 2. Gemini API Setup (Required)

- [ ] Go to [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
- [ ] Click **Create API key**
- [ ] Copy the key — keep it private

---

## 3. Local Development Setup

- [ ] Clone the repository
  ```bash
  git clone https://github.com/Siddhant-K-code/cloud-architect-ai.git
  cd cloud-architect-ai
  ```
- [ ] Install dependencies
  ```bash
  npm install
  ```
- [ ] Copy environment template
  ```bash
  cp .env.example .env.local
  ```
- [ ] Open `.env.local` and set `VITE_GEMINI_API_KEY` to your Gemini API key
- [ ] Start the dev server
  ```bash
  npm run dev
  ```
- [ ] Open [http://localhost:5173](http://localhost:5173) and verify the app loads
- [ ] Test AI generation with a sample prompt (e.g., "3-tier web app on GCP")

---

## 4. Firebase Hosting Setup (Optional — for deployment only)

- [ ] Install Firebase CLI: `npm install -g firebase-tools`
- [ ] Log in: `firebase login`
- [ ] Create a new Firebase project at [console.firebase.google.com](https://console.firebase.google.com/)
- [ ] Register a Web app in the Firebase project
- [ ] Update `.firebaserc` with your Firebase project ID
- [ ] Build the app: `npm run build`
- [ ] Deploy: `firebase deploy`
- [ ] Verify the live URL (`https://your-project-id.web.app`) works end-to-end

---

## 5. Optional Enhancements

- [ ] Set up a custom domain in Firebase Hosting settings
- [ ] Enable Firebase Analytics and add `VITE_FIREBASE_MEASUREMENT_ID` to `.env.local`
- [ ] Update README.md with your own project info / branding

---

## Troubleshooting Resources

- [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) — Full step-by-step setup guide
- [Gemini API Docs](https://ai.google.dev/gemini-api/docs)
- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)
- [Vite Docs](https://vitejs.dev/guide/)
- [Mantine UI Docs](https://mantine.dev/)
