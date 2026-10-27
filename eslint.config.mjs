import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  // Generated Unlighthouse report (bundled third-party JS), not project code.
  { ignores: ["www.tryiptv.com-audit/unlighthouse/**"] },
];

export default eslintConfig;
