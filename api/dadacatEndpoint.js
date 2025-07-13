const express = require('express');
const AWS = require('aws-sdk');
const OpenAI = require('openai');
const ImageGenerationOptions = require('./imageGenerationOptions');
const crypto = require('crypto');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const path = require('path');

// Load environment variables from parent directory
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const router = express.Router();

// Configure AWS
const lambda = new AWS.Lambda({
    region: process.env.AWS_REGION || 'us-east-2'
});

// Configure S3 client for Backblaze B2
const s3Client = new S3Client({
    region: 'dummy', // B2 region format
    endpoint: 'https://s3.us-east-002.backblazeb2.com', // Backblaze B2 endpoint
    credentials: {
        accessKeyId: process.env.B2_KEY_ID,
        secretAccessKey: process.env.B2_APPLICATION_KEY
    }
});

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

/**
 * Invoke DadaCat Lambda to get response
 */
async function getDadaCatResponse(prompt) {
    const params = {
        FunctionName: process.env.AWS_DADACAT_LAMBDA || 'dadacat-agent-x86',
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify({ prompt })
    };
    
    try {
        console.log('Invoking DadaCat Lambda with prompt:', prompt);
        const response = await lambda.invoke(params).promise();
        const payload = JSON.parse(response.Payload);
        
        // Handle different response formats
        let dadacatResponse;
        if (payload.body) {
            const body = typeof payload.body === 'string' ? JSON.parse(payload.body) : payload.body;
            dadacatResponse = body.response || body.message || '';
        } else {
            dadacatResponse = payload.response || payload.message || '';
        }
        
        console.log('DadaCat response:', dadacatResponse);
        return dadacatResponse;
        
    } catch (error) {
        console.error('Error invoking DadaCat Lambda:', error);
        // Fallback response
        return "meow, human! reality fragments scattered across quantum foam... your vision dissolves into cosmic static *purrs enigmatically*";
    }
}

/**
 * Generate image using OpenAI
 */
async function generateImage(prompt, options = {}) {
    try {
        // Build validated parameters using our configuration
        const generateParams = ImageGenerationOptions.buildGenerateParams(prompt, {
            model: "dall-e-3",
            size: "1024x1024",
            quality: "standard",
            style: "vivid",
            response_format: "b64_json",
            ...options
        });
        
        console.log('Generating image with params:', {
            ...generateParams,
            prompt: generateParams.prompt.substring(0, 100) + '...'
        });
        
        const response = await openai.images.generate(generateParams);
        
        // Extract image data
        const imageData = response.data[0];
        if (imageData.b64_json) {
            return {
                success: true,
                b64_json: imageData.b64_json,
                revised_prompt: imageData.revised_prompt
            };
        } else if (imageData.url) {
            // If we got a URL instead, fetch and convert to base64
            const imageResponse = await fetch(imageData.url);
            const buffer = await imageResponse.arrayBuffer();
            const base64 = Buffer.from(buffer).toString('base64');
            return {
                success: true,
                b64_json: base64,
                revised_prompt: imageData.revised_prompt
            };
        }
        
        throw new Error('No image data received');
        
    } catch (error) {
        console.error('Error generating image:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Upload image to Backblaze B2
 */
async function uploadToB2(imageBuffer, filename) {
    try {
        const key = `ws_generated/${filename}`;
        
        const command = new PutObjectCommand({
            Bucket: 'td-website',
            Key: key,
            Body: imageBuffer,
            ContentType: 'image/png',
            ACL: 'public-read'
        });
        
        await s3Client.send(command);
        console.log('Image uploaded to B2:', key);
        
        return key;
        
    } catch (error) {
        console.error('Error uploading to B2:', error);
        return null;
    }
}

/**
 * Main endpoint for DadaCat interactive generation
 */
router.post('/api/dadacat', async (req, res) => {
    try {
        const { prompt } = req.body;
        
        if (!prompt) {
            return res.status(400).json({ error: 'No prompt provided' });
        }
        
        console.log('Received prompt:', prompt);
        
        // Step 1: Get DadaCat response
        const dadacatResponse = await getDadaCatResponse(prompt);
        
        // Step 2: Generate image from DadaCat's response
        const imageResult = await generateImage(dadacatResponse);
        
        if (!imageResult.success) {
            return res.status(500).json({
                error: 'Failed to generate image',
                dadacat_response: dadacatResponse,
                details: imageResult.error
            });
        }
        
        // Step 3: Upload to B2 (optional - can fail gracefully)
        let backblazePath = null;
        if (imageResult.b64_json) {
            const imageBuffer = Buffer.from(imageResult.b64_json, 'base64');
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const uniqueId = crypto.randomBytes(4).toString('hex');
            const filename = `dadacat_${timestamp}_${uniqueId}.png`;
            
            backblazePath = await uploadToB2(imageBuffer, filename);
        }
        
        // Return response
        res.json({
            success: true,
            human_prompt: prompt,
            dadacat_response: dadacatResponse,
            image_url: `data:image/png;base64,${imageResult.b64_json}`,
            backblaze_path: backblazePath,
            revised_prompt: imageResult.revised_prompt,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({
            error: 'Internal server error',
            details: error.message
        });
    }
});

/**
 * Health check endpoint
 */
router.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'dadacat-api',
        timestamp: new Date().toISOString()
    });
});

module.exports = router;