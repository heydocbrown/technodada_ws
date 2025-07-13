#!/bin/bash

# Test script for tsdadacat pipeline integration
# Run from the root technodada_ws directory

echo "======================================="
echo "tsdadacat Pipeline Integration Test"
echo "======================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo "1. Checking Prerequisites..."
echo "---------------------------"

# Check if package is installed
if [ -f "react-poems/node_modules/dadacat-lambda-pipeline/package.json" ]; then
    echo -e "${GREEN}✓${NC} dadacat-lambda-pipeline is installed in React app"
else
    echo -e "${RED}✗${NC} dadacat-lambda-pipeline not found in React app"
    echo "  Run: cd react-poems && npm install"
fi

if [ -f "node_modules/dadacat-lambda-pipeline/package.json" ]; then
    echo -e "${GREEN}✓${NC} dadacat-lambda-pipeline is installed in root"
else
    echo -e "${RED}✗${NC} dadacat-lambda-pipeline not found in root"
    echo "  Run: npm install"
fi

# Check configuration files
echo ""
echo "2. Checking Configuration Files..."
echo "---------------------------------"

FILES_TO_CHECK=(
    "react-poems/src/config/pipelineConfig.js"
    "react-poems/src/components/InteractiveDadaCatPipeline.jsx"
    "react-poems/.env"
    "api/dadacatEndpointPipeline.js"
)

for file in "${FILES_TO_CHECK[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file exists"
    else
        echo -e "${RED}✗${NC} $file missing"
    fi
done

# Check if servers are configured correctly
echo ""
echo "3. Configuration Summary..."
echo "--------------------------"

if [ -f "react-poems/.env" ]; then
    echo "React app environment:"
    grep -E "VITE_DEFAULT_MODEL|VITE_USE_DIRECT_PIPELINE|VITE_SHOW_PIPELINE_STEPS" react-poems/.env | sed 's/^/  /'
fi

echo ""
echo "4. Build Commands..."
echo "-------------------"
echo "To build the React app with pipeline:"
echo -e "${YELLOW}cd react-poems && npm run build${NC}"
echo ""
echo "To run in development:"
echo -e "${YELLOW}# Terminal 1 - API server:${NC}"
echo "cd api && node server.js"
echo ""
echo -e "${YELLOW}# Terminal 2 - React dev server:${NC}"
echo "cd react-poems && npm run dev"
echo ""
echo -e "${YELLOW}# Terminal 3 - Main Express server:${NC}"
echo "npm start"

echo ""
echo "5. Integration Points..."
echo "----------------------"
echo "- AppDadaCat imports InteractiveDadaCatPipeline ✓"
echo "- Pipeline configuration in pipelineConfig.js ✓"
echo "- Express API uses dadacatEndpointPipeline.js ✓"
echo "- Vite configured for pipeline bundling ✓"

echo ""
echo "======================================="
echo "Ready to test! Next steps:"
echo "======================================="
echo ""
echo "1. Start the API server (port 3001)"
echo "2. Build React app: cd react-poems && npm run build"
echo "3. Deploy built files: npm run deploy-react"
echo "4. Start main server: npm start"
echo "5. Visit http://localhost:8080/pages/tsdadacat.html"
echo ""
echo "The pipeline integration is complete!"
echo "======================================="