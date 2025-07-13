/**
 * Pipeline Configuration
 * Centralized configuration for dadacat-lambda-pipeline
 * All options can be overridden via environment variables or runtime settings
 */

// Get environment variables with defaults
const getEnvVar = (key, defaultValue) => {
  return import.meta.env[key] || defaultValue;
};

// Pipeline orchestrator configuration
export const pipelineOrchestratorConfig = {
  maxRetries: parseInt(getEnvVar('VITE_PIPELINE_MAX_RETRIES', '3')),
  retryDelay: parseInt(getEnvVar('VITE_PIPELINE_RETRY_DELAY', '5')),
  timeout: parseInt(getEnvVar('VITE_PIPELINE_TIMEOUT', '300')),
  pollingInterval: parseInt(getEnvVar('VITE_PIPELINE_POLLING_INTERVAL', '5'))
};

// Image generation configuration defaults
export const imageGenerationDefaults = {
  model: getEnvVar('VITE_DEFAULT_MODEL', 'dall-e-3'),
  size: getEnvVar('VITE_DEFAULT_SIZE', '1024x1024'),
  quality: getEnvVar('VITE_DEFAULT_QUALITY', 'standard'),
  style: getEnvVar('VITE_DEFAULT_STYLE', 'vivid'),
  n: parseInt(getEnvVar('VITE_DEFAULT_IMAGE_COUNT', '1')),
  response_format: getEnvVar('VITE_DEFAULT_RESPONSE_FORMAT', 'b64_json')
};

// Metadata configuration
export const metadataDefaults = {
  artproject: getEnvVar('VITE_ARTPROJECT', 'technodada'),
  on_website: getEnvVar('VITE_ON_WEBSITE', 'yes'),
  source: getEnvVar('VITE_SOURCE', 'tsdadacat'),
  environment: getEnvVar('VITE_ENVIRONMENT', 'production')
};

// Model-specific size options (matching ImageGenerationOptions.js)
export const modelSizeOptions = {
  'dall-e-2': [
    { value: '256x256', display: 'Small (256x256)' },
    { value: '512x512', display: 'Medium (512x512)' },
    { value: '1024x1024', display: 'Large (1024x1024)' }
  ],
  'dall-e-3': [
    { value: '1024x1024', display: 'Square (1024x1024)' },
    { value: '1792x1024', display: 'Landscape (1792x1024)' },
    { value: '1024x1792', display: 'Portrait (1024x1792)' }
  ],
  'gpt-image-1': [
    { value: '1024x1024', display: 'Square (1024x1024)' },
    { value: '1536x1024', display: 'Landscape (1536x1024)' },
    { value: '1024x1536', display: 'Portrait (1024x1536)' }
  ]
};

// Model-specific quality options
export const modelQualityOptions = {
  'dall-e-2': ['standard'],
  'dall-e-3': ['standard', 'hd'],
  'gpt-image-1': ['auto', 'high', 'medium', 'low']
};

// Model-specific style options (dall-e-3 only)
export const modelStyleOptions = {
  'dall-e-2': null,
  'dall-e-3': ['vivid', 'natural'],
  'gpt-image-1': null
};

// Feature flags
export const featureFlags = {
  useDirect

: getEnvVar('VITE_USE_DIRECT_PIPELINE', 'false') === 'true',
  showPipelineSteps: getEnvVar('VITE_SHOW_PIPELINE_STEPS', 'true') === 'true',
  allowRuntimeConfig: getEnvVar('VITE_ALLOW_RUNTIME_CONFIG', 'false') === 'true',
  debugMode: getEnvVar('VITE_DEBUG_MODE', 'false') === 'true'
};

/**
 * Build pipeline input for runConfigurablePipeline
 * @param {string} humanPrompt - The user's input prompt
 * @param {Object} overrides - Optional overrides for defaults
 * @returns {Object} Formatted input for pipeline
 */
export const buildPipelineInput = (humanPrompt, overrides = {}) => {
  const timestamp = new Date().toISOString();
  const batchId = overrides.batch_id || `tsdadacat_${Date.now()}`;
  
  return {
    human_prompt: humanPrompt,
    batch_id: batchId,
    additional_prompt: overrides.additional_prompt || "manifested through technodada reality engine",
    options: {
      model: overrides.model || imageGenerationDefaults.model,
      size: overrides.size || imageGenerationDefaults.size,
      quality: overrides.quality || imageGenerationDefaults.quality,
      style: overrides.style || imageGenerationDefaults.style,
      n: overrides.n || imageGenerationDefaults.n,
      response_format: overrides.response_format || imageGenerationDefaults.response_format
    },
    artproject: overrides.artproject || metadataDefaults.artproject,
    on_website: overrides.on_website || metadataDefaults.on_website,
    custom_metadata: {
      source: metadataDefaults.source,
      environment: metadataDefaults.environment,
      timestamp: timestamp,
      user_agent: navigator.userAgent,
      ...overrides.custom_metadata
    }
  };
};

/**
 * Validate options for a specific model
 * @param {Object} options - Options to validate
 * @param {string} model - Model to validate against
 * @returns {Object} Validation result
 */
export const validateModelOptions = (options, model) => {
  const errors = [];
  
  // Validate size
  if (options.size && modelSizeOptions[model]) {
    const validSizes = modelSizeOptions[model].map(opt => opt.value);
    if (!validSizes.includes(options.size)) {
      errors.push(`Invalid size for ${model}: ${options.size}`);
    }
  }
  
  // Validate quality
  if (options.quality && modelQualityOptions[model]) {
    if (!modelQualityOptions[model].includes(options.quality)) {
      errors.push(`Invalid quality for ${model}: ${options.quality}`);
    }
  }
  
  // Validate style (dall-e-3 only)
  if (options.style && model === 'dall-e-3') {
    if (!modelStyleOptions['dall-e-3'].includes(options.style)) {
      errors.push(`Invalid style for ${model}: ${options.style}`);
    }
  } else if (options.style && model !== 'dall-e-3') {
    errors.push(`Style option is only supported for dall-e-3`);
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

// Export complete configuration object
export default {
  pipeline: pipelineOrchestratorConfig,
  imageGeneration: imageGenerationDefaults,
  metadata: metadataDefaults,
  modelOptions: {
    sizes: modelSizeOptions,
    qualities: modelQualityOptions,
    styles: modelStyleOptions
  },
  features: featureFlags,
  buildPipelineInput,
  validateModelOptions
};