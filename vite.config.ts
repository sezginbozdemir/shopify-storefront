import { defineConfig } from "vitest/config";
import graphqlLoader from "vite-plugin-graphql-loader";

// https://vite.dev/config/
export default defineConfig({
  plugins: [graphqlLoader()],

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.ts",
  },
});
