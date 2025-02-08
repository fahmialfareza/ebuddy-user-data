import { defineConfig } from "tsup";

export default defineConfig({
  minify: false,
  entry: ["src/core/app.ts"],
  splitting: true,
  onSuccess: "node --enable-source-maps -r ./dist/app.js",
  clean: true,
  sourcemap: "inline",
});
