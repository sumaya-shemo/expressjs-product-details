
const js = require("@eslint/js");

module.exports = [
  {
    ignores: ["node_modules/**", "coverage/**"]
  },

  // Backend: Node.js environment
  {
    ...js.configs.recommended,

    files: [
      "server.js",
      "src/**/*.js",
      "test/**/*.js",
      "eslint.config.js"
    ],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",

      globals: {
        console: "readonly",
        process: "readonly",
        __dirname: "readonly",
        module: "readonly",
        require: "readonly"
      }
    },

    rules: {
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_"
        }
      ]
    }
  },

  // Frontend: Browser environment
  {
    ...js.configs.recommended,

    files: ["public/**/*.js"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",

      globals: {
        document: "readonly",
        window: "readonly",
        fetch: "readonly",
        URL: "readonly",
        Intl: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly"
      }
    },

    rules: {
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_"
        }
      ]
    }
  }
];
