// API Server Pipeline Configuration
const imageGenerationDefaults = {
  model: process.env.API_DEFAULT_MODEL || 'dall-e-3',
  size: process.env.API_DEFAULT_SIZE || '1024x1024',
  quality: process.env.API_DEFAULT_QUALITY || 'standard'
};

const metadataDefaults = {
  artproject: process.env.API_ARTPROJECT || 'technodada',
  on_website: process.env.API_ON_WEBSITE || 'yes',
  source: process.env.API_SOURCE || 'express_api'
};

/**
 * Build pipeline input for runConfigurablePipeline
 */
function buildPipelineInput(humanPrompt, overrides = {}) {
  const timestamp = new Date().toISOString();
  const batchId = overrides.batch_id || `api_${Date.now()}`;
  
  return {
    human_prompt: humanPrompt,
    batch_id: batchId,
    additional_prompt: overrides.additional_prompt || "generated via Express API",
    options: {
      model: overrides.model || imageGenerationDefaults.model,
      size: overrides.size || imageGenerationDefaults.size,
      quality: overrides.quality || imageGenerationDefaults.quality
    },
    artproject: overrides.artproject || metadataDefaults.artproject,
    on_website: overrides.on_website || metadataDefaults.on_website,
    custom_metadata: {
      source: metadataDefaults.source,
      timestamp: timestamp,
      ...overrides.custom_metadata
    }
  };
}

module.exports = {
  imageGenerationDefaults,
  metadataDefaults,
  buildPipelineInput
};