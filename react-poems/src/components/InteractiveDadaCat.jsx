import { useState } from 'react';

function InteractiveDadaCat({ onGenerate }) {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setIsGenerating(true);
        setError(null);

        try {
            // Call the API endpoint to get dadacat response and generate image
            // Always use relative path - live-server will proxy to API
            const apiUrl = '/api/dadacat';
                
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: prompt.trim() }),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            
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
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default InteractiveDadaCat;