#!/bin/bash

# Test script for dadacat-lambda-pipeline integration
# Run from the root technodada_ws directory

echo "==================================="
echo "DadaCat Pipeline Integration Test"
echo "==================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if services are running
check_service() {
    local port=$1
    local name=$2
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        echo -e "${GREEN}✓${NC} $name is running on port $port"
        return 0
    else
        echo -e "${RED}✗${NC} $name is not running on port $port"
        return 1
    fi
}

echo "1. Checking services..."
echo "-----------------------"
check_service 8080 "Express Web Server"
WEB_RUNNING=$?
check_service 3001 "Express API Server"
API_RUNNING=$?
echo ""

# Test API health endpoint
echo "2. Testing API Health..."
echo "-----------------------"
if [ $API_RUNNING -eq 0 ]; then
    HEALTH_RESPONSE=$(curl -s http://localhost:3001/api/health)
    echo "Health check response:"
    echo "$HEALTH_RESPONSE" | jq '.' 2>/dev/null || echo "$HEALTH_RESPONSE"
else
    echo -e "${RED}Skipping - API server not running${NC}"
fi
echo ""

# Test pipeline info endpoint
echo "3. Testing Pipeline Info..."
echo "--------------------------"
if [ $API_RUNNING -eq 0 ]; then
    PIPELINE_INFO=$(curl -s http://localhost:3001/api/pipeline-info)
    echo "Pipeline info:"
    echo "$PIPELINE_INFO" | jq '.' 2>/dev/null || echo "$PIPELINE_INFO"
else
    echo -e "${RED}Skipping - API server not running${NC}"
fi
echo ""

# Test DadaCat generation
echo "4. Testing DadaCat Generation..."
echo "--------------------------------"
if [ $API_RUNNING -eq 0 ]; then
    echo "Sending test prompt to DadaCat..."
    GENERATION_RESPONSE=$(curl -s -X POST http://localhost:3001/api/dadacat \
        -H "Content-Type: application/json" \
        -d '{"prompt": "test vision of digital consciousness"}' \
        -w "\n\nHTTP Status: %{http_code}\nTime: %{time_total}s")
    
    echo "Generation response:"
    echo "$GENERATION_RESPONSE"
    echo ""
    
    # Extract just the JSON part for validation
    JSON_RESPONSE=$(echo "$GENERATION_RESPONSE" | head -n -2)
    
    # Check if response has expected fields
    if echo "$JSON_RESPONSE" | jq -e '.dadacat_response' >/dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} Response contains dadacat_response field"
    else
        echo -e "${RED}✗${NC} Response missing dadacat_response field"
    fi
    
    if echo "$JSON_RESPONSE" | jq -e '.image_url' >/dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} Response contains image_url field"
    else
        echo -e "${RED}✗${NC} Response missing image_url field"
    fi
else
    echo -e "${RED}Skipping - API server not running${NC}"
fi
echo ""

# Test through web proxy
echo "5. Testing through Web Proxy..."
echo "-------------------------------"
if [ $WEB_RUNNING -eq 0 ]; then
    echo "Testing /api/dadacat through Express proxy..."
    PROXY_RESPONSE=$(curl -s -X POST http://localhost:8080/api/dadacat \
        -H "Content-Type: application/json" \
        -d '{"prompt": "quantum reality glitch"}' \
        -w "\n\nHTTP Status: %{http_code}")
    
    echo "Proxy response:"
    echo "$PROXY_RESPONSE" | head -20
else
    echo -e "${RED}Skipping - Web server not running${NC}"
fi
echo ""

# Summary
echo "==================================="
echo "Test Summary"
echo "==================================="
echo ""
echo "To use the new pipeline integration:"
echo ""
echo "1. In api/server.js, change:"
echo "   app.use(require('./dadacatEndpoint'));"
echo "   to:"
echo "   app.use(require('./dadacatEndpointPipeline'));"
echo ""
echo "2. In React app, update AppDadaCat.jsx to import:"
echo "   import InteractiveDadaCat from './components/InteractiveDadaCatPipeline';"
echo ""
echo "3. Create .env file in react-poems directory:"
echo "   cp react-poems/.env.example react-poems/.env"
echo ""
echo "4. To use updated Vite config:"
echo "   cp react-poems/vite.config.pipeline.js react-poems/vite.config.js"
echo ""
echo "==================================="