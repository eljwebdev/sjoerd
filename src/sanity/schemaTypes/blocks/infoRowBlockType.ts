// ./src/sanity/schemaTypes/blocks/infoRowBlockType.ts
import { defineType, defineField } from "sanity";

export const infoRowBlockType = defineType({
  name: "infoRowBlock",
  title: "Info Row",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "1 kolom", value: "1col" },
          { title: "2 kolommen", value: "2col" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      validation: (rule) => rule.required(),
    }),

    // ── 1 col fields ──
    defineField({
      name: "text",
      title: "Tekst",
      type: "textBlock",
      hidden: ({ parent }) => parent?.layout !== "1col",
    }),
    defineField({
      name: "textEntry",
      title: "Small line with label and text below text paragraph",
      type: "textEntry",
      hidden: ({ parent }) => parent?.layout !== "1col",
    }),

    // ── 2 col fields ──
    defineField({
      name: "textLeft",
      title: "Tekst links",
      type: "textBlock",
      hidden: ({ parent }) => parent?.layout !== "2col",
    }),
    defineField({
      name: "textRight",
      title: "Tekst rechts",
      type: "textBlock",
      hidden: ({ parent }) => parent?.layout !== "2col",
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "layout",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle === "1col" ? "1 kolom" : subtitle === "2col" ? "2 kolommen" : "",
      };
    },
  },
});
