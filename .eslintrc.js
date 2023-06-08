module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    // 'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb/hooks',
    // "airbnb-typescript",
    'prettier',
  ],
  plugins: ['import', 'prettier'],
  // parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'no-plusplus': [
      2,
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.tsx'],
      },
    ],
    'lines-between-class-members': 'error',
    'padding-line-between-statements': [
      1,
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
    ],
    'object-curly-newline': [
      2,
      {
        multiline: true,
        minProperties: 4,
        consistent: true,
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'no-underscore-dangle': 'off',
    // "@typescript-eslint/default-param-last": 0,
    // "@typescript-eslint/no-var-requires": 0,
    // "@typescript-eslint/no-use-before-define": 0,
    'import/order': [
      1,
      {
        'newlines-between': 'always',
        groups: [
          ['builtin', 'external'],
          'internal',
          ['parent', 'sibling', 'index'],
        ],
      },
    ],
    'import/prefer-default-export': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'warn',
    'react/require-default-props': 'off',
    'class-methods-use-this': 'off',
    'import/no-anonymous-default-export': 'off',
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react', 'plugin:jest-dom/recommended'],
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    // project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true,
    },
  },
};
