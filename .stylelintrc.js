module.exports = {
  "extends": [
    "stylelint-config-standard-scss",
    "stylelint-config-rational-order"
  ],
  "rules": {
    "selector-class-pattern": [
      "^[a-z]+(-[a-z\\d]+)*(__[a-z]+(-[a-z\\d]+)*)?(--[a-z]+(-[a-z\\d]+)*)?$",
      { "resolveNestedSelectors": true }
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      {
        "ignorePseudoClasses": [
          "global",
          "local"
        ]
      }
    ]
  }
}
