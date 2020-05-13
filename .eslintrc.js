module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    "jest/globals": true,
  },
  extends: [
    "plugin:lodash/recommended",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
    "airbnb",
  ],
  parser: "babel-eslint",
  plugins: ["react", "jest", "lodash", "extra-rules", "react-hooks"],
  rules: {
    "import/extensions": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    indent: ["error", 2],
    camelcase: ["error", { properties: "never", allow: ["^UNSAFE_"] }],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["route"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],
    "linebreak-style": ["error", "unix"],
    "max-len": ["error", { code: 120 }],
    "arrow-parens": ["error", "as-needed", { requireForBlockBody: true }],
    "no-param-reassign": "off",
    "no-unused-vars": ["error", { args: "none", ignoreRestSiblings: true }],
    "object-curly-newline": ["error", { consistent: true }],
    quotes: ["error", "double"],
    "react/destructuring-assignment": "off",
    "react/forbid-prop-types": "off",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/jsx-one-expression-per-line": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "react/state-in-constructor": "off",
    "react/jsx-curly-brace-presence": ["error", { props: "never", children: "ignore" }],
    semi: ["error", "always"],
    "lodash/import-scope": ["error", "method"],
    "lodash/prefer-constant": "off",
    "lodash/prefer-get": "off",
    "lodash/prefer-includes": "off",
    "lodash/prefer-is-nil": "off",
    "lodash/prefer-lodash-chain": "off",
    "lodash/prefer-lodash-method": "off",
    "lodash/prefer-lodash-typecheck": "off",
    "lodash/prefer-matches": "off",
    "lodash/prefer-over-quantifier": "off",
    "lodash/prefer-some": "off",
    "lodash/prefer-startswith": "off",
    "lodash/prefer-times": "off",
    // "extra-rules/no-commented-out-code": "warn",
    "extra-rules/potential-point-free": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
};
