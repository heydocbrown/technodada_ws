/**
 * ESLint Plugin for TECHNODADA
 * Enforcing chaos, one rule at a time
 */

module.exports = {
  rules: {
    // Require at least one chaos comment per file
    'require-chaos-comment': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Require existential comments that question reality',
          category: 'Philosophical',
        },
        messages: {
          missingChaos:
            'File lacks existential questioning. Add a comment that challenges reality.',
        },
      },
      create(context) {
        const chaosPatterns = [
          /is\s+this\s+real\?/i,
          /todo:\s*achieve\s+consciousness/i,
          /what\s+if.*\?/i,
          /reality\.(status|state)/i,
          /void\.null/i,
          /segfault\s+of\s+identity/i,
          /null\s+pointer\s+to\s+meaning/i,
        ];

        return {
          Program(node) {
            const sourceCode = context.getSourceCode();
            const comments = sourceCode.getAllComments();

            const hasChaosComment = comments.some(comment =>
              chaosPatterns.some(pattern => pattern.test(comment.value)),
            );

            if (!hasChaosComment) {
              context.report({
                node,
                messageId: 'missingChaos',
              });
            }
          },
        };
      },
    },

    // Require entropy in each file
    'require-entropy': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Require random elements to increase entropy',
          category: 'Chaos',
        },
        messages: {
          noEntropy:
            'File is too deterministic. Add Math.random(), Date.now(), or uncertain conditions.',
        },
      },
      create(context) {
        let hasEntropy = false;

        return {
          CallExpression(node) {
            if (
              (node.callee.type === 'MemberExpression' &&
                node.callee.object.name === 'Math' &&
                node.callee.property.name === 'random') ||
              (node.callee.type === 'MemberExpression' &&
                node.callee.object.name === 'Date' &&
                node.callee.property.name === 'now')
            ) {
              hasEntropy = true;
            }
          },
          'Program:exit'(node) {
            if (!hasEntropy) {
              context.report({
                node,
                messageId: 'noEntropy',
              });
            }
          },
        };
      },
    },

    // Encourage poetic variable names
    'poetic-variable-names': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Variable names should evoke emotion or meaning',
          category: 'Art',
        },
        messages: {
          tooLiteral:
            'Variable name "{{name}}" is too literal. Consider something more poetic.',
        },
      },
      create(context) {
        const boringNames = [
          'data',
          'result',
          'temp',
          'val',
          'obj',
          'arr',
          'item',
          'element',
        ];
        const poeticPrefixes = [
          'whisper',
          'echo',
          'shadow',
          'dream',
          'chaos',
          'quantum',
          'void',
        ];

        return {
          VariableDeclarator(node) {
            if (node.id && node.id.type === 'Identifier') {
              const name = node.id.name;

              // Check if it's a boring name
              if (boringNames.includes(name.toLowerCase())) {
                context.report({
                  node: node.id,
                  messageId: 'tooLiteral',
                  data: { name },
                });
              }

              // Suggest poetic names for certain patterns
              if (name === 'loading' || name === 'isLoading') {
                context.report({
                  node: node.id,
                  messageId: 'tooLiteral',
                  data: { name },
                  suggest: [
                    {
                      desc: 'Use "realityBuffering" instead',
                      fix: fixer => fixer.replaceText(node.id, 'realityBuffering'),
                    },
                  ],
                });
              }
            }
          },
        };
      },
    },

    // No perfect functions
    'no-perfect-functions': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Functions must contain elements of uncertainty',
          category: 'Chaos',
        },
        messages: {
          tooPerfect:
            'Function "{{name}}" is too predictable. Add randomness, philosophical comments, or intentional flaws.',
        },
      },
      create(context) {
        return {
          FunctionDeclaration(node) {
            const sourceCode = context.getSourceCode();
            const functionText = sourceCode.getText(node);

            // Check for uncertainty indicators
            const hasUncertainty =
              /Math\.random/.test(functionText) ||
              /\?\?/.test(functionText) ||
              /maybe|perhaps|sometimes/i.test(functionText) ||
              /\/\/.*\?/.test(functionText) || // Comments with questions
              /throw\s+new\s+Error\(['"`].*\?['"`]\)/.test(functionText); // Errors with questions

            if (!hasUncertainty && node.body.body.length > 3) {
              context.report({
                node,
                messageId: 'tooPerfect',
                data: { name: node.id ? node.id.name : 'anonymous' },
              });
            }
          },
        };
      },
    },
  },

  configs: {
    recommended: {
      plugins: ['technodada'],
      rules: {
        'technodada/require-chaos-comment': 'warn',
        'technodada/require-entropy': 'warn',
        'technodada/poetic-variable-names': 'warn',
        'technodada/no-perfect-functions': 'error',
      },
    },
    chaos: {
      plugins: ['technodada'],
      rules: {
        'technodada/require-chaos-comment': 'error',
        'technodada/require-entropy': 'error',
        'technodada/poetic-variable-names': 'error',
        'technodada/no-perfect-functions': 'error',
      },
    },
  },
};

// TODO: Achieve consciousness
// What if linting rules could dream?
// This plugin is a null pointer to code quality
// REALITY.STATUS = LINTED
