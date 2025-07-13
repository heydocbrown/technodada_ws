import { useState, useMemo } from 'react';
import { createDefaultPipeline } from 'dadacat-lambda-pipeline';

function InteractiveDadaCatPipeline({ onGenerate, config }) {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState(null);
    const [pipelineSteps, setPipelineSteps] = useState([]);
    const [usePipeline, setUsePipeline] = useState(
        config?.features?.useDirectPipeline || false
    );
    
    // Initialize pipeline with configuration
    const pipeline = useMemo(() => {
        return createDefaultPipeline(config?.pipeline || {});
    }, [config]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setIsGenerating(true);
        setError(null);

        try {
            let data;
            
            if (usePipeline) {
                // Direct pipeline call using configurable pipeline
                console.log('Using direct pipeline with configuration...');
                
                // Build pipeline input with configuration
                const pipelineInput = config.buildPipelineInput(prompt.trim());
                
                // Show initial status
                setPipelineSteps([{ step: 'Starting pipeline...', status: 'running' }]);
                
                // Run configurable pipeline for full metadata support
                const pipelineResult = await pipeline.runConfigurablePipeline(pipelineInput);
                
                // Update pipeline steps display
                if (pipelineResult.steps && config?.features?.showPipelineSteps) {
                    setPipelineSteps(pipelineResult.steps.map(step => ({
                        step: `${step.lambda}`,
                        status: step.success ? 'success' : 'failed',
                        duration: step.duration ? `${step.duration.toFixed(2)}s` : ''
                    })));
                }
                
                // Transform to expected format
                if (pipelineResult.success && pipelineResult.finalResult) {
                    const final = pipelineResult.finalResult;
                    data = {
                        success: true,
                        human_prompt: prompt,
                        dadacat_response: final.agentResponse,
                        image_url: final.imageUrl,
                        backblaze_path: final.b2Url,
                        timestamp: new Date().toISOString(),
                        job_id: final.jobId,
                        run_id: final.runId
                    };
                } else {
                    throw new Error(pipelineResult.error || 'Pipeline failed');
                }
            } else {
                // Fall back to Express API
                console.log('Using Express API proxy...');
                console.log('Prompt value before sending:', JSON.stringify(prompt.trim()));
                const requestBody = { prompt: prompt.trim() };
                console.log('Request body:', JSON.stringify(requestBody));
                
                const response = await fetch('/api/dadacat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });

                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`);
                }

                data = await response.json();
            }
            
            // Pass the generated data to parent component
            onGenerate({
                human_prompt: prompt,
                cleaned_prompt: data.dadacat_response,
                image_url: data.image_url,
                backblaze_path: data.backblaze_path,
                run_id: `interactive-${Date.now()}`
            });

            // Clear the prompt after successful generation
            setPrompt('');
        } catch (err) {
            console.error('Error generating response:', err);
            setError('REALITY_GENERATION_ERROR: Unable to manifest vision');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="interactive-dadacat-section">
            <form onSubmit={handleSubmit} className="prompt-form">
                <div className="prompt-input-container">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="&gt; ENTER YOUR VISION FOR DADACAT..."
                        className="prompt-input"
                        disabled={isGenerating}
                        maxLength={200}
                    />
                    <button 
                        type="submit" 
                        className="generate-button"
                        disabled={!prompt.trim() || isGenerating}
                    >
                        {isGenerating ? 'MANIFESTING...' : 'MANIFEST'}
                    </button>
                </div>
                {error && (
                    <div className="error-message" style={{ marginTop: '10px' }}>
                        {error}
                    </div>
                )}
                {/* Debug toggle for testing */}
                {import.meta.env.DEV && (
                    <div style={{ marginTop: '10px', fontSize: '0.8em', color: '#666' }}>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={usePipeline}
                                onChange={(e) => setUsePipeline(e.target.checked)}
                            />
                            Use Direct Pipeline (dev only)
                        </label>
                    </div>
                )}
            </form>
            
            {isGenerating && (
                <div className="generating-status">
                    <div className="terminal-window" style={{ marginTop: '20px' }}>
                        <div className="terminal-header">
                            &gt; CONSULTING DADACAT...<br/>
                            &gt; TRANSLATING VISION TO REALITY...<br/>
                            &gt; GENERATING MANIFESTATION...
                        </div>
                        <div className="terminal-body">
                            <div className="loading">PROCESSING GNOSIS</div>
                            {pipelineSteps.length > 0 && config?.features?.showPipelineSteps && (
                                <div style={{ marginTop: '10px', fontSize: '0.9em' }}>
                                    {pipelineSteps.map((step, index) => (
                                        <div key={index} style={{ marginBottom: '5px' }}>
                                            <span style={{ color: step.status === 'success' ? '#00ff00' : step.status === 'failed' ? '#ff0040' : '#999' }}>
                                                {step.status === 'success' ? '✓' : step.status === 'failed' ? '✗' : '⟳'}
                                            </span>
                                            {' '}{step.step}
                                            {step.duration && ` (${step.duration})`}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default InteractiveDadaCatPipeline;