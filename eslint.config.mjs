import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = {
  extends: [
    "next/core-web-vitals", // Correctly extend next.js base rules
    "next/typescript", // Extend next.js TypeScript rules
    "eslint:recommended" // Extend the ESLint recommended rules
  ],
  rules: {
    // Disable the specific ESLint rules causing issues
    "no-console": "off", // Disable console warnings
    "react/no-unescaped-entities": "off", // Disable React specific rules
    "@typescript-eslint/no-explicit-any": "off", // Disable type-related rules
    "@typescript-eslint/no-unused-vars": "off", // Disable unused variable warnings for TypeScript
    "no-unused-vars": "off", // Disable unused variable warnings
    "react/prop-types": "off", // Disable prop-types rule for React
    "react/react-in-jsx-scope": "off", // Disable React in scope rule (if you're using Next.js)
    "no-undef": "off", // Disable undefined variables rule
  },
};

export default eslintConfig;
