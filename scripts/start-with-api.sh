#!/bin/bash

# Start script for running both web server and API in Docker container

echo "🎭 TECHNODADA STARTUP WITH API"
echo "=================================="

# Install API dependencies if needed
if [ ! -d "api/node_modules" ]; then
    echo "📦 Installing API dependencies..."
    cd api && npm install && cd ..
fi

# Start the API server in background
echo "🚀 Starting DadaCat API server..."
cd api && node server.js &
API_PID=$!
cd ..

# Give API a moment to start
sleep 2

# Start the Express web server
echo "🌐 Starting Express web server..."
cd /usr/src/app && node server.js &
WEB_PID=$!
cd /usr/src/app

echo ""
echo "✅ Services started:"
echo "   📡 API Server: http://localhost:3001"
echo "   🌐 Web Server: http://localhost:8080"
echo "   🔍 API Health: http://localhost:3001/api/health"
echo ""

# Wait for both processes
wait $API_PID $WEB_PID