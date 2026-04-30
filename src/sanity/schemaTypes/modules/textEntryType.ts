// ./src/sanity/schemaTypes/modules/textEntryType.ts
import { defineType, defineField } from "sanity";

export const textEntryType = defineType({
  name: "textEntry",
  title: "Text Entry",
  type: "object",
  fields: [
    defineField({
        name: "textEntries",
        title: "Text Entries",
        type: "array",
        of: [
            {
                type: "object",
                fields: [
                    defineField({
                        name: "label",
                        title: "Label",
                        type: "string",
                    }),
                    defineField({
                        name: "content",
                        title: "Content",
                        type: "textBlock",
                    }),
                ],
                preview: {
                    select: { title: "label" },
                },
            },
        ],
    }),
  ],
});