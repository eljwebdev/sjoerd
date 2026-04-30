import { defineField, defineType } from "sanity";

export const infoPageType = defineType({
  name: "infoPage",
  type: "document",
  title: "Info Page",
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'settings', title: 'Page settings' },
  ],
  fields: [
    defineField({
      name: "headSeo",
      title: "Head settings SEO",
      type: "headSeo",
      group: 'settings',
    }),
    defineField({
      name: "rows",
      title: "Info page content blocks",
      type: "array",
      of: [{ type: "infoRowBlock" }],
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: "headSeo.pageTitle",
    },
  },
});