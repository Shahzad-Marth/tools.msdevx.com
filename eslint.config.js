const nextEslint = require("eslint-config-next");

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...nextEslint,
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

module.exports = config;
