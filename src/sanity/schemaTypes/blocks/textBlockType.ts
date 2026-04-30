// ./src/sanity/schemaTypes/blocks/textBlockType.ts
import { defineType, defineArrayMember } from "sanity";

export const textBlockType = defineType({
  title: "Text Block",
  name: "textBlock",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [],
      lists: [],
      marks: {
        decorators: [],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
            ],
          },
        ],
      },
    }),

  ],
});