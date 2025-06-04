import { useState, useEffect } from 'react';

const BACKBLAZE_URL = 'https://f005.backblazeb2.com/file/td-website/index.json';

function ArtSelector({ onArtSelect }) {
    const [artData, setArtData] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data on mount
    useEffect(() => {
        fetchArtData();
    }, []);

    // Filter data when project changes
    useEffect(() => {
        if (selectedProject && artData.length > 0) {
            console.log('Filtering for project:', selectedProject);
            console.log('Total artData items:', artData.length);
            
            const filtered = artData.filter(item => 
                item.artproject === selectedProject && item.on_website === 'yes'
            );
            
            console.log('Filtered items:', filtered.length);
            console.log('Sample filtered item:', filtered[0]);
            
            setFilteredData(filtered);
        } else {
            setFilteredData([]);
        }
    }, [selectedProject, artData]);

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
            setError('REALITY_FETCH_ERROR: Unable to retrieve art data');
            setLoading(false);
        }
    };

    const handleProjectSelect = (project) => {
        setSelectedProject(project);
        onArtSelect(null); // Clear current selection
        
        // Update status
        const artMode = document.getElementById('artMode');
        if (artMode) {
            artMode.textContent = project === 'dadacat' ? 'DADACAT' : 'GOATSE';
        }
    };

    const handleArtSelect = (event) => {
        const selectedId = event.target.value;
        if (selectedId) {
            const selectedArt = artData.find(item => item.run_id === selectedId);
            if (selectedArt) {
                onArtSelect(selectedArt);
            }
        }
    };

    const getDropdownLabel = (item) => {
        // Get first 8 words of cleaned prompt
        const words = item.cleaned_prompt.split(' ').slice(0, 8);
        return words.join(' ') + (item.cleaned_prompt.split(' ').length > 8 ? '...' : '');
    };

    if (loading) {
        return (
            <div className="art-selector-section">
                <div className="terminal-window">
                    <div className="terminal-header">
                        &gt; LOADING ART_DATABASE...<br/>
                        &gt; ESTABLISHING BACKBLAZE_CONNECTION...
                    </div>
                    <div className="terminal-body">
                        <div className="loading">SCANNING REALITY_FRAGMENTS</div>
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
            <div className="project-buttons">
                <button 
                    className={`project-button ${selectedProject === 'dadacat' ? 'active' : ''}`}
                    onClick={() => handleProjectSelect('dadacat')}
                >
                    thus spake DadaCat
                </button>
                <button 
                    className={`project-button ${selectedProject === 'truthterminal' ? 'active' : ''}`}
                    onClick={() => handleProjectSelect('truthterminal')}
                >
                    Warning: Goatse Gnosis
                </button>
            </div>

            {selectedProject && (
                <div className="dropdown-container">
                    <select 
                        className="art-dropdown"
                        onChange={handleArtSelect}
                        defaultValue=""
                    >
                        <option value="">
                            &gt; SELECT VISION [{filteredData.length} AVAILABLE]
                        </option>
                        {filteredData.map(item => (
                            <option key={item.run_id} value={item.run_id}>
                                {getDropdownLabel(item)}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
}

export default ArtSelector;