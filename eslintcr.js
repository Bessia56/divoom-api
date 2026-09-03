const globals = require('globals');

module.exports = [
  {
    files: ['**/*.js'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: globals.node,
    },

    rules: {
      'prefer-const': 'error',
      eqeqeq: 'error',
      'no-unused-vars': 'error',
      'no-undef': 'error',
      curly: 'error',
      'no-var': 'error',
      'no-unreachable': 'error',
      'no-dupe-keys': 'error',
      'no-dupe-args': 'error',
      'no-shadow': 'error',
      'prefer-template': 'error',
      'no-debugger': 'error',
      'no-console': 'off',
    },
  },
];
