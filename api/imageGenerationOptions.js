/**
 * Image generation options configuration ported from prompt_to_image.py
 * Handles model-specific options and validation
 */

const ImageGenerationOptions = {
    OPTIONS: {
        model: {
            name: "Model",
            description: "The model to use for image generation",
            options: {
                "gpt-image-1": "GPT Image 1",
                "dall-e-3": "DALL-E 3",
                "dall-e-2": "DALL-E 2"
            },
            default: "dall-e-3"
        },
        
        size: {
            name: "Image Size",
            description: "The size of the generated images",
            options: {
                "dall-e-2": [
                    { value: "256x256", display: "Small (256x256)" },
                    { value: "512x512", display: "Medium (512x512)" },
                    { value: "1024x1024", display: "Large (1024x1024)" }
                ],
                "dall-e-3": [
                    { value: "1024x1024", display: "Square (1024x1024)" },
                    { value: "1792x1024", display: "Landscape (1792x1024)" },
                    { value: "1024x1792", display: "Portrait (1024x1792)" }
                ],
                "gpt-image-1": [
                    { value: "1024x1024", display: "Square (1024x1024)" },
                    { value: "1536x1024", display: "Landscape (1536x1024)" },
                    { value: "1024x1536", display: "Portrait (1024x1536)" }
                ]
            },
            default: {
                "dall-e-2": "1024x1024",
                "dall-e-3": "1024x1024",
                "gpt-image-1": "1024x1024"
            }
        },
        
        n: {
            name: "Number of Images",
            description: "The number of images to generate",
            options: {
                "dall-e-2": Array.from({length: 10}, (_, i) => i + 1), // 1-10
                "dall-e-3": [1], // DALL-E 3 only supports n=1
                "gpt-image-1": Array.from({length: 10}, (_, i) => i + 1) // 1-10
            },
            default: 1
        },
        
        quality: {
            name: "Image Quality",
            description: "The quality of the image that will be generated",
            options: {
                "dall-e-2": { standard: "Standard" },
                "dall-e-3": {
                    standard: "Standard",
                    hd: "HD"
                },
                "gpt-image-1": {
                    auto: "Auto",
                    high: "High",
                    medium: "Medium",
                    low: "Low"
                }
            },
            default: {
                "dall-e-2": "standard",
                "dall-e-3": "standard",
                "gpt-image-1": "auto"
            }
        },
        
        style: {
            name: "Image Style",
            description: "The style of the generated images (DALL-E 3 only)",
            options: {
                "dall-e-2": null,
                "dall-e-3": {
                    vivid: "Vivid (hyper-real and dramatic)",
                    natural: "Natural (more natural looking)"
                },
                "gpt-image-1": null
            },
            default: {
                "dall-e-3": "vivid"
            }
        },
        
        response_format: {
            name: "Response Format",
            description: "Format in which images are returned",
            options: {
                "dall-e-2": {
                    url: "URL",
                    b64_json: "Base64 JSON"
                },
                "dall-e-3": {
                    url: "URL",
                    b64_json: "Base64 JSON"
                },
                "gpt-image-1": null // Always returns base64
            },
            default: {
                "dall-e-2": "url",
                "dall-e-3": "url"
            }
        }
    },
    
    /**
     * Get available options for a specific model and option type
     */
    getOptionsForModel(optionName, modelId) {
        if (!this.OPTIONS[optionName]) {
            return null;
        }
        
        const modelOptions = this.OPTIONS[optionName].options[modelId];
        return modelOptions;
    },
    
    /**
     * Get the default value for a specific model and option type
     */
    getDefaultForModel(optionName, modelId) {
        if (!this.OPTIONS[optionName]) {
            return null;
        }
        
        if (!this.OPTIONS[optionName].default) {
            return null;
        }
        
        const defaultValue = this.OPTIONS[optionName].default;
        if (typeof defaultValue === 'object' && !Array.isArray(defaultValue)) {
            return defaultValue[modelId];
        }
        return defaultValue;
    },
    
    /**
     * Build validated parameters for OpenAI image generation
     */
    buildGenerateParams(prompt, options = {}) {
        const {
            model = "dall-e-3",
            size = null,
            quality = null,
            style = null,
            n = 1,
            response_format = "b64_json", // Default to base64 for easier handling
            no_text = false,
            style_prompt = ""
        } = options;
        
        // Build the complete prompt
        let completePrompt = prompt;
        if (style_prompt) {
            completePrompt += `, ${style_prompt}`;
        }
        
        // Add 'no text' instruction if requested
        if (no_text) {
            completePrompt += ". There should be no text, writing, words, symbols, letters, numbers, or any form of text anywhere in the image.";
        }
        
        // Start with base parameters
        const generateParams = {
            model: model,
            prompt: completePrompt,
            n: n
        };
        
        // Add size parameter
        const defaultSize = this.getDefaultForModel("size", model);
        const validSizes = this.getOptionsForModel("size", model);
        if (size && validSizes) {
            // Check if size is valid for this model
            const isValidSize = validSizes.some(s => 
                typeof s === 'string' ? s === size : s.value === size
            );
            generateParams.size = isValidSize ? size : defaultSize;
        } else {
            generateParams.size = defaultSize;
        }
        
        // Add quality parameter if available for this model
        const modelQualityOptions = this.getOptionsForModel("quality", model);
        if (modelQualityOptions && model !== "dall-e-2") { // Skip quality for DALL-E 2
            if (quality && modelQualityOptions[quality]) {
                generateParams.quality = quality;
            } else {
                const defaultQuality = this.getDefaultForModel("quality", model);
                if (defaultQuality) {
                    generateParams.quality = defaultQuality;
                }
            }
        }
        
        // Add style parameter if available for this model
        const modelStyleOptions = this.getOptionsForModel("style", model);
        if (modelStyleOptions) {
            if (style && modelStyleOptions[style]) {
                generateParams.style = style;
            } else {
                const defaultStyle = this.getDefaultForModel("style", model);
                if (defaultStyle) {
                    generateParams.style = defaultStyle;
                }
            }
        }
        
        // Add response format for models that support it
        const responseFormatOptions = this.getOptionsForModel("response_format", model);
        if (responseFormatOptions) {
            if (response_format && responseFormatOptions[response_format]) {
                generateParams.response_format = response_format;
            } else {
                const defaultFormat = this.getDefaultForModel("response_format", model);
                if (defaultFormat) {
                    generateParams.response_format = defaultFormat;
                }
            }
        }
        
        return generateParams;
    }
};

module.exports = ImageGenerationOptions;