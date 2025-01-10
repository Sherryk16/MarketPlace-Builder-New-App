// .eslintrc.js

module.exports = {
  // Extending base configurations from Next.js and ESLint
  extends: [
    "next/core-web-vitals",   // Next.js base rules (for web vitals)
    "next/typescript",        // Next.js TypeScript rules
    "eslint:recommended"      // ESLint recommended base rules
  ],
  rules: {
    // Disable some rules that may conflict or cause issues with your code
    "@typescript-eslint/no-explicit-any": "off", // Disable type-related rule for 'any'
    "no-console": "off", // Allow console logs
    "no-unused-vars": "off", // Disable unused variable warnings
    "react/no-unescaped-entities": "off", // Disable react-specific rules for unescaped entities
    "react/react-in-jsx-scope": "off", // Disable React scope check (for Next.js)
    "react/prop-types": "off", // Disable prop-types validation for React components
    "no-undef": "off" // Disable undefined variable warnings
  }
};
