import { defineConfig } from "tsup";

export default defineConfig({
  minify: true,
  entry: ["src/core/app.ts"],
  splitting: false,
  clean: true,
  sourcemap: "inline",
});
