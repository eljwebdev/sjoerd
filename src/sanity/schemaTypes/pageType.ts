import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const pageType = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentIcon,
  groups: [
    { name: 'content', title: 'Inhoud', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      group: 'content',
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
      group: 'seo',
    }),
    defineField({
      name: "content",
      type: "pageBuilder",
      group: 'content',
    }),
    // defineField({
    //   name: "mainImage",
    //   type: "image",
    //   options: {
    //     hotspot: true,
    //   },
    //   group: 'content',
    // }),
    defineField({
      name: "metaTitle",
      title: "Meta Titel",
      type: "string",
      description: "Overschrijft de paginatitel in zoekresultaten. Laat leeg om de paginatitel te gebruiken.",
      group: 'seo',
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Beschrijving",
      type: "text",
      rows: 3,
      description: "Beschrijving die wordt weergegeven in zoekresultaten (max ~160 tekens)",
      validation: (rule) => rule.max(160).warning('Houd de beschrijving onder 160 tekens voor optimale weergave'),
      group: 'seo',
    }),
    defineField({
      name: "keywords",
      title: "Zoekwoorden",
      type: "string",
      description: "Komma-gescheiden zoekwoorden (bijv. 'website, design, astro')",
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
});