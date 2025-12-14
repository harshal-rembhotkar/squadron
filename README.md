# Squadron ✈️

**Validate Your Idea, Not Your Code.**

Squadron is a text-to-app platform powered by [Cline](https://cline.bot) - an autonomous AI coding assistant. Simply describe your app, and watch as Cline builds it in real-time within an isolated Docker container.

![Squadron](https://img.shields.io/badge/Powered%20by-Cline-FF6B35?style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-Required-2496ED?style=for-the-badge&logo=docker)
![Node](https://img.shields.io/badge/Node-18+-339933?style=for-the-badge&logo=node.js)

## ✨ Features

- **🤖 Autonomous AI Coding**: Cline plans, codes, and tests your app automatically
- **⚡ Instant Results**: From idea to running app in under a minute
- **🔒 100% Isolated**: Each build runs in a secure Docker container
- **📦 Production Ready**: Modern stack (React, Vite) with clean code
- **👁️ Live Preview**: Watch your app being built in real-time
- **💾 Full Ownership**: Download source code and deploy anywhere

## 🎯 How It Works

1. **You Describe** - Tell Cline what you want to build
2. **Cline Builds** - Watch the AI code your app autonomously
3. **You Ship** - Preview, download, and deploy instantly

## 🚀 Quick Start

### Prerequisites

- **Docker** (running and accessible)
- **Node.js** (v18 or higher)
- **Cline**: Installed globally (`npm install -g cline`)
- **Google Gemini API Key**: [Get one here](https://makersuite.google.com/app/apikey)

### 1. Build Worker Image

The worker is a Docker container with Cline and development tools pre-installed.

```bash
cd worker
docker build -t squadron-worker .
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

## 🏃 Running Squadron

### Terminal 1: Start Backend

```bash
export GEMINI_API_KEY=your_actual_api_key_here
cd backend
node server.js
```

The backend will start on **http://localhost:3001**

### Terminal 2: Start Frontend

```bash
cd frontend
npm run dev
```

The UI will be available at **http://localhost:3000**

## 🎨 Using Squadron

1. Open **http://localhost:3000** in your browser
2. Enter a description of your app (e.g., "A todo list with dark mode and tags")
3. Click **Build** and watch the magic happen
4. View live logs in the terminal panel
5. Preview your app in the right panel once ready
6. Download the source code from the container

## 🏗️ Architecture

```
┌─────────────────┐
│   Frontend      │  Next.js 14 + React
│   Port 3000     │  Glass morphism UI
└────────┬────────┘
         │
         │ Socket.io + REST
         ▼
┌─────────────────┐
│   Backend       │  Node.js + Express
│   Port 3001     │  Docker orchestration
└────────┬────────┘
         │
         │ Docker API
         ▼
┌─────────────────┐
│   Worker        │  Node:20 + Cline CLI
│   Container     │  Isolated build env
│   Random Port   │  Auto-managed
└─────────────────┘
```

## 🎨 Design System

The UI uses a vibrant, energetic color scheme designed to stand out:

- **Primary**: Orange gradient (`#FF6B35` → `#F7931E`)
- **Accent**: Cyan (`#06b6d4`) for technical elements
- **Cards**: White with glass morphism
- **Terminal**: Dark slate with cyan text
- **Effects**: Hover lifts, animated gradients, floating blobs

## 📝 Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS 3
- Socket.io Client
- Lucide Icons

**Backend:**
- Node.js + Express
- Socket.io Server
- Dockerode (Docker API)
- CORS enabled

**Worker:**
- Docker (node:20-bullseye)
- Cline CLI (global)
- Git, Python3, Build tools
- Auto-configured for Gemini

## 🔧 Configuration

### Environment Variables

**Backend:**
- `GEMINI_API_KEY` - Your Google Gemini API key (required)

**Worker (injected by backend):**
- `GEMINI_API_KEY` - Passed from backend
- `MISSION_PROMPT` - User's app description

### Cline Configuration

The worker automatically configures Cline on startup:

```bash
cline config set api-provider gemini
cline config set gemini-api-key $GEMINI_API_KEY
cline config set model gemini-2.0-flash-thinking-exp
```

## 🐳 Docker Details

**Image**: `squadron-worker`  
**Base**: `node:20-bullseye`  
**Exposed Port**: `3000` (mapped to random host port)  
**Entrypoint**: `/usr/local/bin/entrypoint.sh`

The entrypoint script:
1. Validates environment variables
2. Configures Cline for Gemini
3. Executes build task: `cline task new -y "$PROMPT"`
4. Keeps container alive for preview

## 🔍 Troubleshooting

### Docker Issues

**Error**: `Cannot connect to Docker daemon`
```bash
# Check Docker is running
sudo systemctl status docker

# Start Docker
sudo systemctl start docker
```

### Build Failures

**Issue**: Worker exits immediately
- Check `GEMINI_API_KEY` is set correctly
- Verify Cline installed in container: `docker run squadron-worker cline --version`

**Issue**: Port conflicts
- Frontend uses port 3000 (configurable in package.json)
- Backend uses port 3001 (configurable in server.js)
- Worker uses random ports assigned by Docker

### Frontend Won't Start

**Error**: `Node.js version >= 20.9.0 is required`
- Squadron works with Node 18+, but Next.js 16 requires Node 20+
- We use Next.js 14 which supports Node 18

## 📚 Learn More

- **Cline Documentation**: https://docs.cline.bot
- **Cline GitHub**: https://github.com/cline/cline
- **Google Gemini**: https://ai.google.dev/

## 🤝 Contributing

This is a demonstration project showcasing Cline's capabilities. Feel free to fork and extend!

## 📄 License

MIT

## 🙏 Credits

- **Powered by [Cline](https://cline.bot)** - Autonomous AI coding assistant
- **Built with Google Gemini** - Advanced language model
- **Inspired by the need** - To validate ideas, not code

---

**Ready to build?** Start Squadron and turn your ideas into reality! 🚀
