const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');

const app = express();
const PORT = process.env.PORT || 8080;

// Create a livereload server for auto-refresh (optional)
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(__dirname);

// Use livereload middleware
app.use(connectLiveReload());

// Proxy API requests to the API server on port 3001
app.use('/api', createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true,
    logLevel: 'debug'
}));

// Serve static files
app.use(express.static('.'));

// Fallback to index.html for client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌐 Web server running at http://localhost:${PORT}`);
    console.log(`📡 API requests will be proxied to http://localhost:3001`);
});

// Trigger livereload on file changes
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});