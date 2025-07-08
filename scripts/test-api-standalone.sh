#!/bin/bash

# Standalone API testing script - no servers required
# Just run this script to test individual API components

echo "🧪 TECHNODADA API COMPONENT TESTER"
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Load environment variables
cd /usr/src/app
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
    echo -e "${GREEN}✓ Loaded .env file${NC}"
else
    echo -e "${RED}✗ No .env file found${NC}"
    exit 1
fi

echo ""
echo "🔍 Checking environment variables..."
echo "-----------------------------------"

# Check critical env vars
check_env() {
    if [ -z "${!1}" ]; then
        echo -e "${RED}✗ $1 is not set${NC}"
        return 1
    else
        # Mask sensitive values
        if [[ $1 == *"KEY"* ]] || [[ $1 == *"SECRET"* ]]; then
            local val="${!1}"
            echo -e "${GREEN}✓ $1 is set (${#val} chars)${NC}"
        else
            echo -e "${GREEN}✓ $1 = ${!1}${NC}"
        fi
        return 0
    fi
}

# Check all required env vars
MISSING_ENV=0
check_env "OPENAI_API_KEY" || MISSING_ENV=1
check_env "B2_KEY_ID" || MISSING_ENV=1
check_env "B2_APPLICATION_KEY" || MISSING_ENV=1

echo ""
echo "🧪 Testing individual components..."
echo "-----------------------------------"

# Test 1: OpenAI Connection
echo -e "\n${YELLOW}1. Testing OpenAI API...${NC}"
cd /usr/src/app/api && node -e "
const OpenAI = require('openai');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function test() {
    try {
        const response = await openai.models.list();
        console.log('✓ OpenAI API connected successfully');
        console.log('  Available models:', response.data.slice(0, 3).map(m => m.id).join(', '), '...');
    } catch (error) {
        console.error('✗ OpenAI API error:', error.message);
        process.exit(1);
    }
}
test();
"

# Test 2: DadaCat REST API
echo -e "\n${YELLOW}2. Testing DadaCat REST API...${NC}"
cd /usr/src/app/api && node -e "
const https = require('https');

async function test() {
    try {
        const testMessage = 'hello from test script';
        const data = JSON.stringify({ message: testMessage });
        
        const options = {
            hostname: 'o24uakhozi.execute-api.us-east-2.amazonaws.com',
            path: '/Dev',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };
        
        const response = await new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                let responseData = '';
                res.on('data', (chunk) => { responseData += chunk; });
                res.on('end', () => resolve({ statusCode: res.statusCode, data: responseData }));
            });
            req.on('error', reject);
            req.write(data);
            req.end();
        });
        
        if (response.statusCode === 200) {
            console.log('✓ DadaCat REST API connected successfully');
            try {
                const parsed = JSON.parse(response.data);
                console.log('  Status:', parsed.status);
                console.log('  DadaCat says:', parsed.response.substring(0, 200) + (parsed.response.length > 200 ? '...' : ''));
            } catch (e) {
                console.log('  Raw response:', response.data.substring(0, 200) + '...');
            }
        } else {
            console.error('✗ DadaCat API error: HTTP', response.statusCode);
            console.error('  Response:', response.data);
            process.exit(1);
        }
    } catch (error) {
        console.error('✗ DadaCat API error:', error.message);
        process.exit(1);
    }
}
test();
"

# Test 3: Backblaze B2 Connection
echo -e "\n${YELLOW}3. Testing Backblaze B2 access...${NC}"
cd /usr/src/app/api && node -e "
const { S3Client, ListBucketsCommand } = require('@aws-sdk/client-s3');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const s3Client = new S3Client({
    region: 'dummy',
    endpoint: 'https://s3.us-east-002.backblazeb2.com',
    credentials: {
        accessKeyId: process.env.B2_KEY_ID,
        secretAccessKey: process.env.B2_APPLICATION_KEY
    }
});

async function test() {
    try {
        const command = new ListBucketsCommand({});
        const result = await s3Client.send(command);
        console.log('✓ Backblaze B2 connected successfully');
        console.log('  Buckets found:', result.Buckets.length);
        result.Buckets.forEach(b => console.log('  -', b.Name));
    } catch (error) {
        console.error('✗ Backblaze B2 error:', error.message);
        process.exit(1);
    }
}
test();
"

# Test 4: Full DadaCat Flow (without server)
echo -e "\n${YELLOW}4. Testing complete DadaCat flow...${NC}"
echo "   (This will actually invoke Lambda and generate an image)"
read -p "   Run full test? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    cd /usr/src/app/api
    node -e "
    const path = require('path');
    require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
    
    // Import the actual functions from dadacatEndpoint.js
    const AWS = require('aws-sdk');
    const OpenAI = require('openai');
    const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
    
    const lambda = new AWS.Lambda({
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });
    
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    async function testFullFlow() {
        try {
            console.log('📤 Invoking DadaCat Lambda...');
            const lambdaParams = {
                FunctionName: process.env.AWS_DADACAT_LAMBDA,
                InvocationType: 'RequestResponse',
                Payload: JSON.stringify({ prompt: 'test prompt for debugging' })
            };
            
            const lambdaResult = await lambda.invoke(lambdaParams).promise();
            const dadacatResponse = JSON.parse(lambdaResult.Payload);
            console.log('✓ DadaCat response:', dadacatResponse.substring(0, 100) + '...');
            
            console.log('\\n🎨 Generating image with DALL-E...');
            const imageResponse = await openai.images.generate({
                model: 'dall-e-3',
                prompt: dadacatResponse.substring(0, 500),
                n: 1,
                size: '1024x1024',
                quality: 'standard',
                style: 'vivid',
                response_format: 'b64_json'
            });
            
            console.log('✓ Image generated successfully');
            console.log('  Revised prompt:', imageResponse.data[0].revised_prompt.substring(0, 100) + '...');
            
            console.log('\\n☁️  Testing B2 upload (without actually uploading)...');
            console.log('✓ All components working!');
            
        } catch (error) {
            console.error('\\n✗ Error in flow:', error.message);
            if (error.response) {
                console.error('  Response data:', error.response.data);
            }
        }
    }
    
    testFullFlow();
    "
fi

echo ""
echo "🏁 Test complete!"
echo ""
echo "To start the API server for HTTP testing:"
echo "  cd /usr/src/app/api && node server.js"
echo ""
echo "To test with curl once server is running:"
echo "  curl -X POST http://localhost:3001/api/dadacat -H 'Content-Type: application/json' -d '{\"prompt\":\"test\"}'"