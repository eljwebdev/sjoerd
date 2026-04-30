// ./src/sanity/schemaTypes/modules/headSeoType.ts
import { defineType, defineField } from "sanity";

export const headSeoType = defineType({
  name: "headSeo",
  title: "Head settings SEO",
  type: "object",
  fields: [
    defineField({
      name: "pageTitle",
      title: "Pagina Titel",
      type: "string",
    }),
    defineField({
      name: "metaTitle",
      title: "Pagina Meta Titel",
      type: "string",
      description: "Overschrijft de paginatitel voor gebruik in zoekresultaten. Laat leeg om de paginatitel te gebruiken in zoekresultaten.",
    }),
    defineField({
      name: "metaDescription",
      title: "Pagina Meta Beschrijving",
      type: "text",
      rows: 3,
      description: "Beschrijving die wordt weergegeven in zoekresultaten (max ~160 tekens). Overschrijft de globale sitebeschrijving uit de instellingen.",
      validation: (rule) => rule.max(160).warning('Houd de beschrijving onder 160 tekens voor optimale weergave'),
    }),
  ],
});