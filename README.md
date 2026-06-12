# Cloud Architect AI

> Describe your infrastructure in plain English. Get architecture diagrams, Terraform, and cost estimates — instantly.

---

## Screenshots

![Architecture input — describe your requirements, choose a cloud provider and budget](public/assets/Project%20Screenshots/Screenshot%202026-06-11%20175105.png)

![Terraform output — ready-to-deploy HCL with syntax highlighting](public/assets/Project%20Screenshots/Screenshot%20for%20cloud%20aechitect%20ai%204.png)

---

## Overview

Cloud Architect AI is a browser-based tool that uses Google Gemini to turn natural-language requirements into production-ready cloud architecture proposals. Each proposal includes an interactive diagram, deployable Terraform code, and a monthly cost estimate.

Supports **GCP**, **AWS**, and **Azure**.

---

## Features

| | |
|---|---|
| **AI-generated diagrams** | Three architecture proposals per request, ranked by fit |
| **Multi-cloud** | GCP · AWS · Azure — switch with one click |
| **Interactive canvas** | Excalidraw-powered diagrams you can edit in the browser |
| **Terraform output** | Ready-to-deploy HCL with syntax highlighting |
| **Cost estimates** | Monthly USD estimates per proposal |
| **Budget constraints** | Set a budget ceiling and let the AI adapt |
| **Monitoring toggle** | Include or exclude cloud-native observability services |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| UI | Mantine UI v7 |
| Diagramming | Excalidraw + Mermaid.js |
| AI | Google Gemini 2.5 Flash (`@google/generative-ai`) |
| Hosting | Firebase Hosting *(optional)* |

---

## Quick Start

**Prerequisites:** Node.js v18+, a [Gemini API key](https://aistudio.google.com/app/apikey)

```bash
# 1. Clone and install
git clone https://github.com/Siddhant-K-code/cloud-architect-ai.git
cd cloud-architect-ai
npm install

# 2. Configure environment
cp .env.example .env.local
# → Open .env.local and set VITE_GEMINI_API_KEY

# 3. Run
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). That's it — no Firebase required to run locally.

---

## How It Works

1. **Describe** your system in plain English
2. **Set constraints** — cloud provider, budget, observability preferences
3. **Generate** — Gemini returns three ranked architecture proposals
4. **Explore** — switch between proposals, pan and zoom the diagram
5. **Export** — copy the Terraform code and deploy

---

## Deployment

Firebase Hosting is optional and only needed to publish the app publicly.

```bash
npm run build
firebase deploy
```

For a step-by-step walkthrough see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md).  
For a progress tracker see [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md).

---

## License

MIT — see [LICENSE](./LICENSE).
