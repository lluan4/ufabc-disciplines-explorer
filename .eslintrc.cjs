// .eslintrc.cjs
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },

  extends: ['plugin:react/recommended', 'airbnb', 'plugin:prettier/recommended', 'plugin:boundaries/recommended'],
  plugins: ['react', 'prettier', 'boundaries'],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
  rules: {
    'prettier/prettier': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    'boundaries/elements': [
      { type: 'app', pattern: 'app' },
      { type: 'pages', pattern: 'pages' },
      { type: 'widgets', pattern: 'widgets' },
      { type: 'features', pattern: 'features' },
      { type: 'entities', pattern: 'entities' },
      { type: 'shared', pattern: 'shared' },
    ],
  },
};
