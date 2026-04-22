import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { deployPlugin } from "./src/sanity/plugins/deployPlugin";
import { CogIcon, TransferIcon } from "@sanity/icons";

const singletonTypes = new Set(["homePage", "infoPage"]);

export default defineConfig({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  plugins: [
    structureTool({
      structure: (S) =>
        
        S.list()
          .title("Menu")
          .items([
            S.listItem()
              .title("Home Page")
              .id("homePage")
              .child(S.document().schemaType("homePage").documentId("homePage")),
            S.listItem()
              .title("Info Page")
              .id("infoPage")
              .child(S.document().schemaType("infoPage").documentId("infoPage")),
            S.divider(),
            S.listItem()
              .title("Settings")
              .id("settings")
              .icon(CogIcon)
              .child(S.document().schemaType("settings").documentId("settings")),
            S.divider(),
            // S.listItem()
            //   .title("Redirects")
            //   .id("redirects")
            //   .icon(TransferIcon)
            //   .child(S.document().schemaType("redirects").documentId("redirects")),
            // other document types...
          ]),
        
        
    }),
    deployPlugin(),
  ],
  // Prevent singletons from appearing in the "New document" menu
  document: {
    newDocumentOptions: (prev, { creationContext }) =>
      prev.filter((item) => !singletonTypes.has(item.templateId)),
  },
  schema,
});



