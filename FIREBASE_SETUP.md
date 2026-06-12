# Setup Guide — Cloud Architect AI

This guide covers everything you need to get Cloud Architect AI running locally and deployed to Firebase Hosting.

> [!IMPORTANT]
> The app uses the **Google Gemini API** directly via the `@google/generative-ai` SDK. It does **not** use the Firebase Vertex AI Extension. Firebase is only used for **static hosting**.

---

## Architecture Overview

```
Browser (React + Vite)
  │
  ├── @google/generative-ai SDK
  │     └── Calls Gemini 2.5 Flash via VITE_GEMINI_API_KEY
  │
  └── Firebase Hosting (optional — for deployment only)
```

**Key packages:**
| Package | Purpose |
|---|---|
| `@google/generative-ai` | Gemini API client (AI generation) |
| `@excalidraw/excalidraw` | Interactive diagram canvas |
| `@excalidraw/mermaid-to-excalidraw` | Convert Mermaid → Excalidraw |
| `mermaid` | Diagram parsing |
| `@mantine/core` | UI component library |
| `react-syntax-highlighter` | Terraform code display |

---

## Part 1 — Local Development

### Step 1: Prerequisites

- Node.js **v18 or higher** → [nodejs.org](https://nodejs.org)
- A Gemini API key → [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Configure environment variables

```bash
# Copy the template
cp .env.example .env.local
```

Open `.env.local` and set your Gemini API key:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

> [!CAUTION]
> Never commit `.env.local` to version control. It is already listed in `.gitignore`.

### Step 4: Start the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. The app should load and AI generation should work immediately once the API key is set.

---

## Part 2 — Firebase Hosting (Optional Deployment)

Firebase is only needed if you want to host the app on Firebase Hosting. The AI functionality works without it.

### Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Step 2: Log in to Firebase

```bash
firebase login
```

### Step 3: Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com/)
2. Click **Add project**
3. Enter a project name (e.g., `cloud-architect-ai`)
4. Enable or skip Google Analytics
5. Click **Create project**

### Step 4: Register a web app

1. In the Firebase console, click the **</>** (Web) icon to add a web app
2. Enter a nickname (e.g., `Cloud Architect AI Web`)
3. Check **Also set up Firebase Hosting**
4. Click **Register app** — note the `firebaseConfig` values shown (you'll need these if you add Firebase Auth or Analytics later)
5. Click **Next** → **Continue to console**

### Step 5: Update `.firebaserc`

Replace `YOUR_FIREBASE_PROJECT_ID` with your actual project ID:

```json
{
  "projects": {
    "default": "your-firebase-project-id"
  }
}
```

> [!TIP]
> You can find your project ID in the Firebase console URL: `https://console.firebase.google.com/project/<project-id>`

### Step 6: Build and deploy

```bash
# Build the production bundle
npm run build

# Deploy to Firebase Hosting
firebase deploy
```

Your app will be live at `https://your-project-id.web.app`.

---

## Part 3 — Environment Variables Reference

See [`.env.example`](./.env.example) for the full annotated reference.

| Variable | Required | Description |
|---|---|---|
| `VITE_GEMINI_API_KEY` | **Yes** | Gemini API key from AI Studio |
| `VITE_FIREBASE_API_KEY` | No | Firebase Web API key (hosting only) |
| `VITE_FIREBASE_AUTH_DOMAIN` | No | `<project-id>.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | No | Your Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | No | `<project-id>.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | No | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | No | Firebase app ID |
| `VITE_FIREBASE_MEASUREMENT_ID` | No | Analytics measurement ID (optional) |

---

## Troubleshooting

### "AI generation fails / returns an error"

- Confirm `VITE_GEMINI_API_KEY` is set correctly in `.env.local`
- Ensure the key has **Generative Language API** access enabled in Google Cloud
- Check the browser console for the exact error message
- Make sure you're not hitting Gemini API [rate limits](https://ai.google.dev/gemini-api/docs/rate-limits)

### "blank page or app doesn't load"

- Run `npm install` to ensure all dependencies are present
- Check the terminal running `npm run dev` for TypeScript/Vite errors

### "Firebase deploy fails"

- Confirm you're logged in: `firebase login`
- Verify `.firebaserc` has the correct project ID
- Ensure `npm run build` completed without errors and the `dist/` folder exists

---

## Additional Resources

- [Gemini API Docs](https://ai.google.dev/gemini-api/docs)
- [Google AI Studio](https://aistudio.google.com/)
- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)
- [Vite Docs](https://vitejs.dev/guide/)
- [Mantine UI Docs](https://mantine.dev/)
- [Excalidraw Docs](https://github.com/excalidraw/excalidraw)