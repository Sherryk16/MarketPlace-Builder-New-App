// .eslintrc.js
module.exports = {
  extends: ["next/core-web-vitals", "eslint:recommended", "plugin:react/recommended"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "react/react-in-jsx-scope": "off", // Next.js automatically imports React
    "react/prop-types": "off",
  },
};
