import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Disable all ESLint rules
  "eslint:recommended",
  {
    rules: {
      // Disable the ESLint rules that you are facing issues with
      "no-console": "off", // Disable console warnings
      "react/no-unescaped-entities": "off", // Disable react specific rules
      "@typescript-eslint/no-explicit-any": "off", // Disable type related rules
      "@typescript-eslint/no-unused-vars": "off", // Disable unused variable warnings
      "no-unused-vars": "off", // Disable unused variable warnings
      "react/prop-types": "off", // Disable prop-types rule for React
      "react/react-in-jsx-scope": "off", // Disable React in scope rule (if you're using Next.js)
      "no-undef": "off", // Disable undefined variables rule
    }
  }
];

export default eslintConfig;
