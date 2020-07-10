module.exports = {
  "extends": [
    "eslint:recommended",
    "airbnb",
    "plugin:react-hooks/recommended"
  ],
  "parser": "babel-eslint",
  "rules": {
    "no-plusplus": [
      2,
      {
        "allowForLoopAfterthoughts": true
      }
    ],
    "no-use-before-define": "off",
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    ],
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": [__dirname],
      },
    },
  }
}