import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { deployPlugin } from "./src/sanity/plugins/deployPlugin";

export default defineConfig({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  plugins: [
    structureTool({
      structure,
    }),
    deployPlugin(),
  ],
  schema,
});