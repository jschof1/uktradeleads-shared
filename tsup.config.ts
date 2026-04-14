import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "types/index": "src/types/index.ts",
    "lib/index": "src/lib/index.ts",
    "components/index": "src/components/index.ts",
    "hooks/index": "src/hooks/index.ts",
    "build-helpers/index": "src/build-helpers/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  external: [
    "react",
    "react-dom",
    "react-router-dom",
    "clsx",
    "tailwind-merge",
    "lucide-react",
  ],
  jsx: "automatic",
  splitting: false,
  treeshake: true,
});
