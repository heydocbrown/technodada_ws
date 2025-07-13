const express = require('express');
const { createDefaultPipeline } = require('dadacat-lambda-pipeline');
const { buildPipelineInput } = require('./config/pipelineConfig');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const router = express.Router();

// Initialize pipeline with orchestrator config
const orchestratorConfig = {
  maxRetries: parseInt(process.env.PIPELINE_MAX_RETRIES || '3'),
  retryDelay: parseInt(process.env.PIPELINE_RETRY_DELAY || '5'),
  timeout: parseInt(process.env.PIPELINE_TIMEOUT || '300'),
  pollingInterval: parseInt(process.env.PIPELINE_POLLING_INTERVAL || '5')
};

const pipeline = createDefaultPipeline(orchestratorConfig);

/**
 * Main endpoint for DadaCat interactive generation
 * Now simplified to use the dadacat-lambda-pipeline package
 */
router.post('/api/dadacat', async (req, res) => {
    try {
        console.log('Raw request body:', JSON.stringify(req.body));
        console.log('Request body type:', typeof req.body);
        console.log('Request headers:', req.headers);
        
        const { prompt } = req.body;
        
        console.log('Extracted prompt:', JSON.stringify(prompt));
        console.log('Prompt type:', typeof prompt);
        console.log('Prompt length:', prompt ? prompt.length : 'undefined');
        
        if (!prompt) {
            console.log('No prompt provided - returning 400');
            return res.status(400).json({ error: 'No prompt provided' });
        }
        
        console.log('Received prompt:', prompt);
        
        // Build configurable pipeline input with model options
        const pipelineInput = buildPipelineInput(prompt);
        
        console.log('Pipeline input:', JSON.stringify(pipelineInput, null, 2));
        
        // Use configurable pipeline with full options
        const result = await pipeline.runConfigurablePipeline(pipelineInput);
        
        // Transform result to match expected API format
        if (result.success && result.finalResult) {
          const final = result.finalResult;
          res.json({
            success: true,
            human_prompt: prompt,
            dadacat_response: final.agentResponse,
            image_url: final.imageUrl,
            backblaze_path: final.b2Url,
            timestamp: new Date().toISOString(),
            job_id: final.jobId,
            run_id: final.runId
          });
        } else {
          res.status(500).json({
            success: false,
            error: result.error || 'Pipeline execution failed',
            steps: result.steps
          });
        }
        
    } catch (error) {
        console.error('Pipeline error:', error);
        res.status(500).json({
          error: 'Internal server error',
          details: error.message
        });
    }
});

/**
 * Health check endpoint
 */
router.get('/api/health', async (req, res) => {
    try {
        // Check if pipeline is initialized
        const pipelineStatus = pipeline ? 'initialized' : 'not initialized';
        
        res.json({
            status: 'healthy',
            service: 'dadacat-api',
            pipeline: 'dadacat-lambda-pipeline',
            pipelineStatus: pipelineStatus,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            status: 'unhealthy',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

/**
 * Pipeline info endpoint (for debugging)
 */
router.get('/api/pipeline-info', (req, res) => {
    res.json({
        package: 'dadacat-lambda-pipeline',
        version: '1.0.1',
        configured: !!pipeline,
        timestamp: new Date().toISOString()
    });
});

module.exports = router;