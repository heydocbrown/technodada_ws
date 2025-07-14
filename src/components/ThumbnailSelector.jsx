import { useState, useEffect } from 'react';

function ThumbnailSelector({ onArtSelect, isVisible = true }) {
  const [artData, setArtData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeProject, setActiveProject] = useState('dadacat');
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [imageLoadStates, setImageLoadStates] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 4x2 grid

  useEffect(() => {
    fetchArtData();
  }, []);

  useEffect(() => {
    filterData();
  }, [artData, activeProject]);

  const fetchArtData = async () => {
    try {
      console.log('Attempting to fetch data...');
      const response = await fetch(
        'https://f005.backblazeb2.com/file/td-website/index.json',
      );
      console.log('Response received:', response.status, response.statusText);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Raw data received:', data);

      if (!data.images || !Array.isArray(data.images)) {
        throw new Error('Invalid data structure - no images array');
      }

      // Filter for website-eligible items
      const websiteEligible = data.images.filter(item => item.on_website === 'yes');

      console.log('Website eligible items:', websiteEligible.length);
      console.log('First few items:', websiteEligible.slice(0, 3));
      console.log('Available artprojects:', [
        ...new Set(data.images.map(item => item.artproject)),
      ]);
      setArtData(websiteEligible);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching art data:', error);
      console.error('Error details:', error.message);
      setLoading(false);
    }
  };

  const filterData = () => {
    console.log('Filtering data. Active project:', activeProject);
    console.log('Available artprojects:', [
      ...new Set(artData.map(item => item.artproject)),
    ]);

    const filtered = artData.filter(item => item.artproject === activeProject);

    console.log('Filtered results:', filtered.length, 'items');
    setFilteredData(filtered);

    // Initialize image load states
    const loadStates = {};
    filtered.forEach(item => {
      loadStates[item.run_id] = 'loading';
    });
    setImageLoadStates(loadStates);
  };

  const handleProjectChange = project => {
    setActiveProject(project);
    setSelectedId(null);
    setCurrentPage(1); // Reset to first page when changing projects

    // Update art mode in status bar
    const artMode = document.getElementById('artMode');
    if (artMode) {
      artMode.textContent = project.toUpperCase();
    }
  };

  const handleThumbnailSelect = item => {
    setSelectedId(item.run_id);
    onArtSelect(item);
  };

  const handleImageLoad = runId => {
    setImageLoadStates(prev => ({
      ...prev,
      [runId]: 'loaded',
    }));
  };

  const handleImageError = runId => {
    setImageLoadStates(prev => ({
      ...prev,
      [runId]: 'error',
    }));
  };

  const getThumbnailUrl = backblazePath => {
    return `https://f005.backblazeb2.com/file/td-website/${backblazePath}`;
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const handlePageChange = newPage => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Scroll to top of grid
      const gridContainer = document.querySelector('.thumbnail-grid-container');
      if (gridContainer) {
        gridContainer.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (loading) {
    return (
      <div className="art-selector-section">
        <div className="terminal-window">
          <div className="terminal-header">&gt; LOADING VISUAL_MATRIX...</div>
          <div
            className="prompt-terminal"
            style={{ textAlign: 'center', padding: '40px' }}
          >
            <div className="prompt-text">
              &gt; INITIALIZING GALLERY_BUFFER
              <br />
              &gt; SCANNING REALITY_FRAGMENTS
              <br />
              &gt; PLEASE_WAIT...
              <span className="typing-cursor"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="art-selector-section"
      style={{
        transition: 'opacity 0.5s ease-in-out, max-height 0.5s ease-in-out',
        opacity: isVisible ? 1 : 0,
        maxHeight: isVisible ? '2000px' : '0',
        overflow: 'hidden',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <div className="terminal-window">
        <div className="terminal-header">&gt; SELECT_REALITY_FRAGMENT.EXE</div>

        {/* Project Selection Buttons */}
        <div className="project-buttons">
          <button
            className={`project-button ${activeProject === 'dadacat' ? 'active' : ''}`}
            onClick={() => handleProjectChange('dadacat')}
          >
            DADACAT
          </button>
          <button
            className={`project-button ${activeProject === 'truthterminal' ? 'active' : ''}`}
            onClick={() => handleProjectChange('truthterminal')}
          >
            GOATSE GNOSIS
          </button>
        </div>

        {/* Thumbnail Grid */}
        <div className="thumbnail-grid-container">
          {filteredData.length === 0 ? (
            <div
              className="prompt-terminal"
              style={{ textAlign: 'center', padding: '40px' }}
            >
              <div className="prompt-text">
                &gt; NO_FRAGMENTS_FOUND
                <br />
                &gt; REALITY_BUFFER_EMPTY
              </div>
            </div>
          ) : (
            <div className="thumbnail-grid">
              {currentItems.map(item => (
                <div
                  key={item.run_id}
                  className={`thumbnail-item ${selectedId === item.run_id ? 'selected' : ''}`}
                  onClick={() => handleThumbnailSelect(item)}
                >
                  {imageLoadStates[item.run_id] === 'loading' && (
                    <div className="thumbnail-loading">LOADING...</div>
                  )}
                  {imageLoadStates[item.run_id] === 'error' && (
                    <div className="thumbnail-loading">ERROR_LOADING</div>
                  )}
                  <img
                    src={getThumbnailUrl(item.backblaze_path)}
                    alt={`Fragment ${item.run_id}`}
                    className="thumbnail-image"
                    onLoad={() => handleImageLoad(item.run_id)}
                    onError={() => handleImageError(item.run_id)}
                    style={{
                      display:
                        imageLoadStates[item.run_id] === 'loaded' ? 'block' : 'none',
                    }}
                  />
                  <div className="thumbnail-overlay">
                    FRAGMENT_{item.run_id.slice(-6)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div
              className="pagination-controls"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '15px',
                marginTop: '30px',
                fontFamily: "'VT323', monospace",
                color: 'var(--terminal-green)',
              }}
            >
              <button
                className="pagination-button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  padding: '8px 15px',
                  background: currentPage === 1 ? 'var(--gray-2)' : 'var(--gray-1)',
                  border: '1px solid var(--terminal-green)',
                  color: currentPage === 1 ? 'var(--gray-3)' : 'var(--terminal-green)',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  fontFamily: 'inherit',
                  fontSize: '1.2rem',
                }}
              >
                &lt; PREV
              </button>

              <span style={{ fontSize: '1.2rem' }}>
                PAGE {currentPage} / {totalPages}
              </span>

              <button
                className="pagination-button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  padding: '8px 15px',
                  background:
                    currentPage === totalPages ? 'var(--gray-2)' : 'var(--gray-1)',
                  border: '1px solid var(--terminal-green)',
                  color:
                    currentPage === totalPages
                      ? 'var(--gray-3)'
                      : 'var(--terminal-green)',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  fontFamily: 'inherit',
                  fontSize: '1.2rem',
                }}
              >
                NEXT &gt;
              </button>
            </div>
          )}
        </div>

        {filteredData.length > 0 && (
          <div
            className="prompt-terminal"
            style={{
              textAlign: 'center',
              padding: '10px 15px',
              marginTop: '15px',
              minHeight: 'auto',
              fontSize: '0.9rem',
            }}
          >
            <div
              className="prompt-text"
              style={{ fontSize: '1rem', lineHeight: '1.4' }}
            >
              &gt; {filteredData.length} FRAGMENTS_AVAILABLE
              {totalPages > 1 && (
                <>
                  {' '}
                  | SHOWING {startIndex + 1}-{Math.min(endIndex, filteredData.length)}
                </>
              )}
              <br />
              &gt; CLICK_TO_MANIFEST_REALITY
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ThumbnailSelector;
