import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";

export const imageBlockType = defineType({
  name: "imageBlock",
  title: "Image",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      type: "string",
      title: "Alternative text",
      description: "Important for SEO and accessibility",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      type: "string",
      title: "Caption",
    }),
  ],
  preview: {
    select: {
      alt: "alt",
      media: "image",
    },
    prepare({ alt, media }) {
      return {
        title: alt || "Untitled",
        subtitle: "Image Block",
        media: media ?? ImageIcon,
      };
    },
  },
});
