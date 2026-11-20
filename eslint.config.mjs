import { createConfigForNuxt } from "@nuxt/eslint-config";
import prettierRecommended from "eslint-plugin-prettier/recommended";

export default createConfigForNuxt({ features: { typescript: true } })
  .prepend({
    ignores: [
      "legacy/**",
      "processing/**",
      "internal/**",
      "public/**",
      "playwright-report/**",
      "test-results/**",
    ],
  })
  .append(prettierRecommended, {
    rules: {
      "vue/no-v-html": "off",
      "vue/require-default-prop": "off",
    },
  });
