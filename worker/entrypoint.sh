#!/bin/bash
set -e

echo "Starting Squadron Worker..."

if [ -z "$GEMINI_API_KEY" ]; then
  echo "Error: GEMINI_API_KEY is not set."
  exit 1
fi

if [ -z "$MISSION_PROMPT" ]; then
  echo "Error: MISSION_PROMPT is not set."
  exit 1
fi

echo "Configuring Cline..."
cline config set api-provider gemini
cline config set gemini-api-key "$GEMINI_API_KEY"
cline config set model gemini-2.0-flash

echo "Executing Mission: $MISSION_PROMPT"

# Construct the full prompt for Cline
# Ensure we guide Cline to build runabble code on the correct port/host
FULL_PROMPT="$MISSION_PROMPT. Build a React/Vite app. Ensure it runs on port 3000 and maps to host 0.0.0.0. Do not ask for permission, just do it."

# Run Cline
# We use --yes to auto-approve commands (as requested by 'Execute Rules: cline ... --yes')
# Using 'yes' command might be needed if --yes isn't a flag in cline (assuming it is based on prompt)
# If cline doesn't support --yes, we might need to pipe yes. 
# "cline '[Prompt]' --yes" is in the user requirement.

echo "Running Cline command..."
# We run it in background or foreground? Foreground to see logs.
# But we need to keep container alive after it finishes (or if it serves the app).
# If cline starts the server, we want it to keep running.
# The user instruction says: Run: cline ... then tail -f /dev/null

cline "$FULL_PROMPT" --yes

echo "Mission sequence completed. Keeping container alive for serving..."
tail -f /dev/null
