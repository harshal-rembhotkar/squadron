# Squadron (Gemini Edition)

A Text-to-App platform where users enter a prompt, and the system autonomously spins up a Docker container using Google Gemini to build the app.

## Prerequisites
- Docker (running and accessible via socket)
- Node.js (v18+)

## Setup

### 1. Build Worker Image
The worker is a Docker container with `cline` installed.
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

## Running the App

### Start Backend
Make sure you have your `GEMINI_API_KEY` exported in your shell or env.
```bash
export GEMINI_API_KEY=your_key_here
cd backend
node server.js
```

### Start Frontend
```bash
cd frontend
npm run dev
```

Visit `http://localhost:4000` to validate your ideas!

## Design System
- **Background**: `#FFFFE3`
- **Cards**: `#FFFFFF`
- **Accents**: `#6D8196`
- **Text**: `#4A4A4A`
- **Cockpit**: Hacker Dark
