// ./src/sanity/schemaTypes/settings.ts
import { defineField, defineType } from "sanity";

export const settingsType = defineType({
  title: "Settings",
  name: "settings",
  type: "document",
  fields: [
    // ── Algemene instellingen ──
    defineField({
      type: 'object',
      name: 'settings',
      title: 'Algemene instellingen',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          type: 'string',
          name: 'title',
          title: 'Site Titel',
        }),
        defineField({
          type: 'string',
          name: 'description',
          title: 'Meta Beschrijving',
        }),
        defineField({
          type: 'boolean',
          name: 'indexing',
          title: 'Toestaan dat zoekmachines deze site indexeren?',
          initialValue: false,
        }),
        defineField({
          type: 'reference',
          name: 'homepage',
          title: 'Homepage',
          description: 'Selecteer welke pagina als homepage wordt weergegeven',
          to: [{ type: 'page' }],
        }),
      ],
    }),

    // ── Organisatie (Schema.org) ──
    defineField({
      type: 'object',
      name: 'organization',
      title: 'Organisatie (SEO)',
      description: 'Gegevens voor Google Knowledge Panel en structured data',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          type: 'string',
          name: 'name',
          title: 'Organisatienaam',
        }),
        defineField({
          type: 'url',
          name: 'url',
          title: 'Website URL',
          description: 'Bijv. https://www.example.nl',
        }),
        defineField({
          type: 'image',
          name: 'logo',
          title: 'Organisatie Logo',
          description: 'Logo voor Google Knowledge Panel (min. 112x112px)',
        }),
        defineField({
          type: 'string',
          name: 'phone',
          title: 'Telefoonnummer',
        }),
        defineField({
          type: 'email',
          name: 'email',
          title: 'E-mailadres',
        }),
        defineField({
          type: 'object',
          name: 'address',
          title: 'Adres',
          fields: [
            defineField({ type: 'string', name: 'street', title: 'Straat + Huisnummer' }),
            defineField({ type: 'string', name: 'postalCode', title: 'Postcode' }),
            defineField({ type: 'string', name: 'city', title: 'Plaats' }),
            defineField({ type: 'string', name: 'country', title: 'Land', initialValue: 'NL' }),
          ],
        }),
      ],
    }),

  ],

  preview: {
    select: {
      title: "settings.title",
    },
  },
});
