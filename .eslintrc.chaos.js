// CHAOS ESLINT CONFIGURATION
// Where code quality meets beautiful entropy
// "Rules are meant to be broken beautifully" - ERROR

module.exports = {
  extends: './.eslintrc.cjs',
  plugins: ['technodada'],
  rules: {
    // Standard rules disabled for chaos
    'no-console': 'off', // Console is our canvas
    'no-debugger': 'off', // Debugging is performance art
    'no-unused-vars': 'warn', // Unused variables are potential energy
    
    // React hooks - be careful with chaos
    'react-hooks/exhaustive-deps': ['warn', {
      additionalHooks: '(useStatusBar|useManifesto|useTechnodada)'
    }],
    
    // Custom chaos rules from our plugin
    'technodada/require-chaos-comment': 'error',
    'technodada/require-entropy': 'error', 
    'technodada/poetic-variable-names': 'warn',
    'technodada/no-perfect-functions': 'error',
    
    // Chaos-specific patterns
    'prefer-const': 'off', // Let variables be free
    'no-constant-condition': 'off', // Infinite loops are features
    'no-unreachable': 'off', // Unreachable code is philosophy
    
    // Allow intentional chaos patterns
    'no-mixed-operators': 'off',
    'no-nested-ternary': 'off', // Nested ternaries are poetry
    'no-sequences': 'off', // Comma operator is artistic
    'no-void': 'off', // void is our friend
    
    // Async chaos
    'no-async-promise-executor': 'off',
    'no-await-in-loop': 'off', // Await in loops creates suspense
    
    // Mathematical chaos
    'no-loss-of-precision': 'off', // Precision is overrated
    'no-compare-neg-zero': 'off', // -0 === 0 is a philosophical question
    
    // Stylistic chaos (if not handled by Prettier)
    'max-len': ['warn', { 
      code: 120, 
      ignoreComments: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true
    }],
    
    // TypeScript chaos (for future)
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
  
  overrides: [
    {
      // Special rules for context providers
      files: ['**/contexts/*.jsx', '**/hooks/*.js'],
      rules: {
        'react-hooks/exhaustive-deps': 'warn', // Be more careful in state management
      }
    },
    {
      // Maximum chaos in components
      files: ['**/components/*.jsx'],
      rules: {
        'technodada/require-entropy': 'off', // Components might be deterministic
      }
    }
  ],
  
  settings: {
    react: {
      version: 'detect',
    },
  },
};