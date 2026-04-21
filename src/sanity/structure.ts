import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Blog")
    .items([
      S.documentTypeListItem("post").title("Posts"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("author").title("Authors"),
      S.divider(),
      S.documentTypeListItem("page").title("Pages"),
      S.documentTypeListItem("faq").title("FAQs"),
      S.documentTypeListItem("form").title("Forms"),
      S.divider(),
      S.listItem()
        .title("Settings")
        .id("settings")
        .child(
          S.document()
            .schemaType("settings")
            .documentId("settings")
        ),
      S.listItem()
        .title("Redirects")
        .id("redirects")
        .child(
          S.document()
            .schemaType("redirects")
            .documentId("redirects")
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !["post", "category", "author", "page", "faq", "form", "settings", "redirects", "link"].includes(item.getId()!)
      ),
    ]);