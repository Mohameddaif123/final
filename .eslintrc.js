module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: [
      'react',
    ],
    rules: {
      'no-unused-vars': process.env.CI ? 'warn' : 'error',
      'react/no-unescaped-entities': process.env.CI ? 'warn' : 'error',
      'react/prop-types': process.env.CI ? 'warn' : 'error',
      // Add other rules you want to relax in CI here
    },
  };
  