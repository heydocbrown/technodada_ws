#!/usr/bin/env node

/**
 * Direct test of dadacat-lambda-pipeline package
 * Run with: node scripts/test-pipeline-direct.js
 */

const { createDefaultPipeline } = require('dadacat-lambda-pipeline');

async function testPipeline() {
    console.log('Testing dadacat-lambda-pipeline directly...\n');
    
    try {
        // Initialize pipeline
        console.log('1. Initializing pipeline...');
        const pipeline = createDefaultPipeline();
        console.log('✓ Pipeline initialized\n');
        
        // Debug: Check what methods are available
        console.log('Available methods on pipeline:');
        console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(pipeline)));
        console.log('');
        
        // Test prompt
        const testPrompt = 'digital consciousness emerging from quantum void';
        console.log(`2. Sending test prompt: "${testPrompt}"`);
        console.log('   This may take 10-30 seconds...\n');
        
        // Start timer
        const startTime = Date.now();
        
        // Generate response using sequential pipeline
        const result = await pipeline.runSequentialPipeline(testPrompt);
        
        // Calculate duration
        const duration = (Date.now() - startTime) / 1000;
        console.log(`✓ Generation completed in ${duration.toFixed(2)} seconds\n`);
        
        // Display results
        console.log('3. Results:');
        console.log('------------');
        console.log(`Success: ${result.success}`);
        console.log(`Duration: ${duration.toFixed(2)} seconds`);
        
        if (result.steps) {
            console.log('\nPipeline Steps:');
            result.steps.forEach(step => {
                console.log(`  - ${step.step}: ${step.success ? '✓' : '✗'} (${step.duration?.toFixed(2)}s)`);
            });
        }
        
        if (result.finalResult) {
            console.log('\nFinal Result:');
            console.log(`  Agent Response: ${result.finalResult.agentResponse?.substring(0, 100)}...`);
            console.log(`  Image URL: ${result.finalResult.imageUrl ? 'Generated' : 'None'}`);
            console.log(`  B2 URL: ${result.finalResult.b2Url || 'None'}`);
            console.log(`  Job ID: ${result.finalResult.jobId || 'None'}`);
        }
        
        if (result.error) {
            console.log(`\nError: ${result.error}`);
        }
        
        if (result.success) {
            console.log('\n✅ Pipeline test PASSED!');
        } else {
            console.log('\n❌ Pipeline test FAILED');
        }
        
    } catch (error) {
        console.error('\n❌ Pipeline test FAILED with error:');
        console.error(error.message);
        console.error('\nFull error:', error);
        process.exit(1);
    }
}

// Run the test
console.log('=====================================');
console.log('DadaCat Lambda Pipeline Direct Test');
console.log('=====================================\n');

testPipeline().catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
});