const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const Docker = require('dockerode');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all for dev
        methods: ["GET", "POST"]
    }
});

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

app.use(cors());
app.use(express.json());

const PORT = 3001; // Frontend is 3000,Backend is 3001

const activeContainers = new Map();

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

app.post('/mission', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    const missionId = 'mission-' + Date.now();
    console.log(`Starting mission ${missionId} with prompt: ${prompt}`);

    try {
        // Inject GEMINI_API_KEY from host environment
        const geminiApiKey = process.env.GEMINI_API_KEY;
        if (!geminiApiKey) {
            console.warn('WARNING: GEMINI_API_KEY is not set in backend environment!');
        }

        // Pull the image first? Assuming built locally as 'squadron-worker'
        // In a real app we might check if it exists.

        const container = await docker.createContainer({
            Image: 'squadron-worker',
            Cmd: ['/usr/local/bin/entrypoint.sh'], // Ensure entrypoint is correct
            Env: [
                `GEMINI_API_KEY=${geminiApiKey || ''}`,
                `MISSION_PROMPT=${prompt}`
            ],
            HostConfig: {
                PortBindings: {
                    '3000/tcp': [{ HostPort: '0' }] // Bind to random port
                }
            },
            Tty: true,
            AttachStdout: true,
            AttachStderr: true
        });

        await container.start();
        activeContainers.set(missionId, container);

        // Get the assigned port
        const data = await container.inspect();
        const ports = data.NetworkSettings.Ports['3000/tcp'];
        const assignedPort = ports && ports[0] ? ports[0].HostPort : null;

        console.log(`Container started for ${missionId}. Port: ${assignedPort}`);

        // Stream logs
        const logStream = await container.logs({
            follow: true,
            stdout: true,
            stderr: true,
            timestamps: true
        });

        logStream.on('data', (chunk) => {
            // Docker logs have a header, might need to strip it if raw stream, 
            // but simplistic approach for now. 
            // Emitting to room or broadcast. Since we don't have mission-specific rooms in this snippet yet,
            // we'll broadcast or rely on client filtering.
            // Better: Client joins room 'missionId'.
            io.to(missionId).emit('log', chunk.toString('utf8'));
        });

        // Handle stream end/error
        logStream.on('end', () => {
            io.to(missionId).emit('status', 'Container stream ended');
        });

        res.json({ missionId, status: 'started', port: assignedPort });

    } catch (err) {
        console.error('Error starting mission:', err);
        res.status(500).json({ error: err.message });
    }
});

// Endpoint to join a mission room for logs
io.on('connection', (socket) => {
    socket.on('join-mission', (missionId) => {
        socket.join(missionId);
        console.log(`Socket ${socket.id} joined ${missionId}`);
    });
});

server.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
});
