const OFF = 0; // Turn the rule off
const WRN = 1; // Turn the rule on as a warning (doesn't affect exit code)
const ERR = 2; // Turn the rule on as an error (exit code will be 1)

module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'next/core-web-vitals',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'import'],
  reportUnusedDisableDirectives: true,
  root: true,
  rules: {
    '@next/next/no-img-element': OFF,
    '@typescript-eslint/consistent-type-imports': ERR,
    'react/function-component-definition': [
      ERR,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-filename-extension': [WRN, { extensions: ['.tsx', '.jsx'] }],
    'react/no-unescaped-entities': OFF,
    'react/prop-types': OFF,
    'react/react-in-jsx-scope': OFF,
    'import/no-anonymous-default-export': OFF,
    'import/no-named-as-default-member': OFF,
    'import/no-unresolved': OFF,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
