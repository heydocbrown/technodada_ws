/**
 * Standard ESLint Configuration
 * For when we need to pretend to be normal
 * (Use .eslintrc.chaos.js for the real fun)
 */

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // Reasonable adjustments for artistic code
    'no-console': 'off', // We use console for art
    'no-unused-vars': [
      'warn',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
    'react/prop-types': 'off', // PropTypes are optional in our chaos
    'react/react-in-jsx-scope': 'off', // React 17+
  },
};

// To embrace chaos, run: npm run lint:chaos
// To pretend normalcy, run: npm run lint
// Remember: Perfect code has no soul
