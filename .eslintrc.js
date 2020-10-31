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
    "lines-between-class-members": "error",
    "padding-line-between-statements": [
      1,
      {
        "blankLine": "always",
        "prev": "*",
        "next": "return"
      },
    ],
    "object-curly-newline": [
      2,
      {
        "multiline": true,
        "minProperties": 4,
        "consistent": true
      },
    ],
    "react/jsx-props-no-spreading": [
      2,
      {
        "html": "enforce",
        "custom": "ignore",
        "explicitSpread": "ignore",
      },
    ],
    "import/order": [
      1,
      {
        "newlines-between": "always",
        "groups": [
          ["builtin", "external"],
          "internal",
          ["parent", "sibling", "index"],
        ],
      }
    ]
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
      "webpack": {
        "config": "webpack.config.js"
      }
    },
  }
}
