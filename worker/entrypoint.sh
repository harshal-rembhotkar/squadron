#!/bin/bash
set -e

echo "🚀 Starting Squadron Worker..."

# Validate environment variables
if [ -z "$GEMINI_API_KEY" ]; then
  echo "❌ Error: GEMINI_API_KEY is not set."
  exit 1
fi

if [ -z "$MISSION_PROMPT" ]; then
  echo "❌ Error: MISSION_PROMPT is not set."
  exit 1
fi

# Configure Cline for Gemini
echo "⚙️  Configuring Cline for Gemini..."
cline config set api-provider gemini
cline config set gemini-api-key "$GEMINI_API_KEY"
cline config set model gemini-2.0-flash-thinking-exp

# Note: In production, you should use cline auth with a proper account
# For now, we're using API key directly which works for basic usage

echo "📝 Mission Prompt: $MISSION_PROMPT"

# Create full prompt with constraints
FULL_PROMPT="$MISSION_PROMPT

Requirements:
- Build a React/Vite application
- Configure to run on port 3000 with host 0.0.0.0
- Use modern best practices
- Create a functional, production-ready app
- Do not ask for permission, execute automatically"

echo "🤖 Starting Cline task..."

# Use proper Cline task syntax for headless automation
# The -y flag auto-approves all actions
cline task new -y "$FULL_PROMPT"

# Monitor task status
echo "📊 Monitoring task progress..."
cline task view --follow &

echo "✅ Mission sequence completed. Keeping container alive..."
tail -f /dev/null
