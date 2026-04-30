import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";

export const imageBlockType = defineType({
  name: "imageBlock",
  title: "Image",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'myRangeField',
      title: 'Media width in columns (min 3 - max 8)',
      type: 'number',
      validation: (rule) => rule.min(3).max(8),
    }),
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
        subtitle: "image",
        media: media ?? ImageIcon,
      };
    },
  },
});
