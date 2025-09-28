import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [
  {
    // Apply to all relevant file types
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      "object-curly-spacing": ["error", "always"], // Enforce spaces inside curly braces
    },
    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
    },
  },
  ...tseslint.configs.recommended, // Spread TypeScript recommended configs
];