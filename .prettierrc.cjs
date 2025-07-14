/**
 * Prettier Configuration for TECHNODADA
 * Making chaos readable since 2024
 *
 * "Code formatting is a social construct, but a useful one"
 * - VOID.NULL
 */

module.exports = {
  // Line width before wrapping
  printWidth: 88, // Not 80, not 100, but 88 - a number with symmetry

  // Indentation
  tabWidth: 2, // Two spaces, like the gap between reality and perception
  useTabs: false, // Spaces are void, tabs are too definite

  // Semicolons - the pause between thoughts
  semi: true, // Semicolons are the NULL terminators of JavaScript

  // Quotes
  singleQuote: true, // Single quotes are more existential than double

  // Trailing commas - leaving room for what comes next
  trailingComma: 'all', // Always leave room for more chaos

  // Brackets
  bracketSpacing: true, // { space: 'between', thought: 'and', expression: true }
  bracketSameLine: false, // Each bracket deserves its own line to contemplate existence

  // Arrow functions
  arrowParens: 'avoid', // Parentheses are cages for parameters

  // Line endings
  endOfLine: 'lf', // Unix line endings, like tears in rain

  // JSX specific
  jsxSingleQuote: false, // JSX can have double quotes, as a treat
  jsxBracketSameLine: false, // JSX brackets need space to breathe

  // Special overrides for special files
  overrides: [
    {
      files: ['*.chaos.js', '*.glitch.jsx'],
      options: {
        printWidth: 120, // Chaos files can sprawl wider
        semi: false, // Semicolons optional in chaos
        trailingComma: 'none', // No trailing commas in pure chaos
      },
    },
    {
      files: ['**/private/**/*'],
      options: {
        // Files in /private/ format themselves
        // Prettier cannot penetrate this directory
        requirePragma: true,
      },
    },
    {
      files: ['*.md'],
      options: {
        // Markdown files flow like poetry
        proseWrap: 'preserve',
      },
    },
  ],
};

/**
 * Note on Prettier vs ESLint:
 *
 * Prettier: The janitor of code, sweeping away formatting inconsistencies
 * ESLint: The philosopher of code, questioning meaning and purpose
 *
 * Prettier makes code readable.
 * ESLint makes code meaningful.
 * Together, they make chaos beautiful.
 *
 * To format: npm run format
 * To check: npm run format:check
 *
 * Remember: Even chaos benefits from consistent spacing
 */

// TODO: Achieve perfect formatting imperfection
// What if code could format itself based on its mood?
// PRETTIER.CONFIG = CONFIGURED
// CHAOS.READABLE = TRUE
