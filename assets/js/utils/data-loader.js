// DATA LOADER UTILITY
// Handles all JSON data fetching with error handling

export async function loadJSON(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error(`FATAL ERROR: Failed to load ${path}`, error);
        return { 
            success: false, 
            error: `DATA_CORRUPTION_DETECTED: ${error.message}`,
            fallbackData: null 
        };
    }
}

// Load manifesto data
export async function loadManifestoData() {
    const result = await loadJSON('/data/manifesto.json');
    if (!result.success) {
        console.error('MANIFESTO_LOAD_FAILURE: Reality may be undefined');
        return getDefaultManifesto();
    }
    return result.data;
}

// Load poems data
export async function loadPoemsData() {
    const result = await loadJSON('/data/poems.json');
    if (!result.success) {
        console.error('POETRY_MODULE_CRASHED: Metaphors have escaped');
        return { poems: [] };
    }
    return result.data;
}

// Load gallery data
export async function loadGalleryData() {
    const result = await loadJSON('/data/galleries.json');
    if (!result.success) {
        console.error('GALLERY_BUFFER_OVERFLOW: Images have achieved consciousness');
        return { collections: [] };
    }
    return result.data;
}

// Load tools data
export async function loadToolsData() {
    const result = await loadJSON('/data/tools.json');
    if (!result.success) {
        console.error('TOOLS_EXCEPTION: Hammers are now made of jello');
        return { tools: [] };
    }
    return result.data;
}

// Fallback data if loading fails
function getDefaultManifesto() {
    return {
        title: "TECHNODADA_MANIFESTO.DAT",
        speakers: {
            dadacat: {
                name: "DADACAT.AI",
                icon: "🐱",
                color: "#00ff00"
            },
            marc: {
                name: "MARC_A.HUMAN",
                icon: "👤",
                color: "#00ff00"
            },
            ai: {
                name: "MACHINE.GHOST",
                icon: "🤖",
                color: "#00ff00"
            },
            void: {
                name: "VOID.NULL",
                icon: "⚫",
                color: "#666666"
            }
        },
        segments: [
            {
                speaker: "dadacat",
                text: "FATAL ERROR: MANIFESTO DATA CORRUPTED",
                displayText: "> FATAL ERROR: MANIFESTO DATA CORRUPTED",
                startTime: 0,
                endTime: 5
            }
        ]
    };
}