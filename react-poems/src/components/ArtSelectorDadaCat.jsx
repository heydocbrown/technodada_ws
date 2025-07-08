import { useState, useEffect } from 'react';

const BACKBLAZE_URL = 'https://f005.backblazeb2.com/file/td-website/index.json';

function ArtSelectorDadaCat({ onArtSelect }) {
    const [artData, setArtData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [uniquePrompts, setUniquePrompts] = useState([]);
    const [promptToItems, setPromptToItems] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data on mount
    useEffect(() => {
        fetchArtData();
    }, []);

    // Filter data when artData changes
    useEffect(() => {
        if (artData.length > 0) {
            console.log('Filtering for dadacat with human_prompt');
            console.log('Total artData items:', artData.length);
            
            // Filter for dadacat items that have human_prompt field
            const filtered = artData.filter(item => 
                item.artproject === 'dadacat' && 
                item.on_website === 'yes' &&
                item.human_prompt && 
                item.human_prompt.trim() !== ''
            );
            
            console.log('Filtered items with human_prompt:', filtered.length);
            
            // Create mapping of human_prompt to items
            const promptMap = {};
            filtered.forEach(item => {
                const prompt = item.human_prompt.trim();
                if (!promptMap[prompt]) {
                    promptMap[prompt] = [];
                }
                promptMap[prompt].push(item);
            });
            
            // Get unique prompts
            const unique = Object.keys(promptMap).sort();
            
            console.log('Unique human_prompts:', unique.length);
            console.log('Prompt mapping:', promptMap);
            
            setFilteredData(filtered);
            setUniquePrompts(unique);
            setPromptToItems(promptMap);
        } else {
            setFilteredData([]);
            setUniquePrompts([]);
            setPromptToItems({});
        }
    }, [artData]);

    const fetchArtData = async () => {
        try {
            setLoading(true);
            const response = await fetch(BACKBLAZE_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch art data');
            }
            const data = await response.json();
            // The actual images are in the 'images' key
            const images = data.images || [];
            setArtData(images);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching art data:', err);
            setError('REALITY_FETCH_ERROR: Unable to retrieve dadacat visions');
            setLoading(false);
        }
    };

    const handleArtSelect = (event) => {
        const selectedPrompt = event.target.value;
        if (selectedPrompt && promptToItems[selectedPrompt]) {
            // Get all items with this human_prompt
            const items = promptToItems[selectedPrompt];
            
            // Select a random item from the array
            const randomIndex = Math.floor(Math.random() * items.length);
            const selectedArt = items[randomIndex];
            
            console.log(`Selected prompt: "${selectedPrompt}" has ${items.length} items, chose index ${randomIndex}`);
            
            if (selectedArt) {
                onArtSelect(selectedArt);
            }
        }
    };

    if (loading) {
        return (
            <div className="art-selector-section">
                <div className="terminal-window">
                    <div className="terminal-header">
                        &gt; LOADING DADACAT_DATABASE...<br/>
                        &gt; ESTABLISHING BACKBLAZE_CONNECTION...
                    </div>
                    <div className="terminal-body">
                        <div className="loading">SCANNING DADACAT_FRAGMENTS</div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="art-selector-section">
                <div className="terminal-window">
                    <div className="terminal-header error-message">{error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="art-selector-section">
            <div className="dropdown-container">
                <select 
                    className="art-dropdown"
                    onChange={handleArtSelect}
                    defaultValue=""
                >
                    <option value="">
                        &gt; SELECT DADACAT VISION [{uniquePrompts.length} UNIQUE PROMPTS]
                    </option>
                    {uniquePrompts.map((prompt, index) => (
                        <option key={index} value={prompt}>
                            {prompt}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default ArtSelectorDadaCat;