// ./src/sanity/schemaTypes/settings.ts
import { defineField, defineType } from "sanity";
import {CogIcon} from '@sanity/icons'

export const settingsType = defineType({
  title: "Settings",
  name: "settings",
  type: "document",
  icon: CogIcon,
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
          name: 'siteTitle',
          title: 'Site Titel',
        }),
        defineField({
          type: 'string',
          name: 'mailadres',
          title: 'E-mailadres',
        }),
        defineField({
          type: 'string',
          name: 'siteDescription',
          title: 'Meta Beschrijving',
        }),
        defineField({
          type: 'boolean',
          name: 'indexing',
          title: 'Toestaan dat zoekmachines deze site indexeren?',
          initialValue: false,
        }),
        // defineField({
        //   type: 'reference',
        //   name: 'homepage',
        //   title: 'Homepage',
        //   description: 'Selecteer welke pagina als homepage wordt weergegeven',
        //   to: [{ type: 'homePage' }],
        // }),
      ],
    }),

    defineField({
      type: 'object',
      name: 'menu',
      title: 'Header settings',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          type: 'string',
          name: 'menuTitle',
          title: 'Menu Titel',
        }),
        defineField({
          type: 'string',
          name: 'workTitle',
          title: 'Work link text',
        }),
        defineField({
          type: 'string',
          name: 'tagLine',
          title: 'Tagline visible',
        }),
        defineField({
          type: 'string',
          name: 'tagLineHover',
          title: 'Tagline hover',
        }),
        defineField({
          type: 'string',
          name: 'tagLineMob1',
          title: 'Tagline mobile line 1',
        }),
        defineField({
          type: 'string',
          name: 'tagLineMob2',
          title: 'Tagline mobile line 2',
        }),
        defineField({
          type: 'string',
          name: 'infoText',
          title: 'Info text',
        }),
        defineField({
          type: 'string',
          name: 'infoTextHover',
          title: 'Info text hover',
        }),
        defineField({
          type: 'string',
          name: 'contactText',
          title: 'Contact text',
        }),
        defineField({
          type: 'string',
          name: 'contactTextHover',
          title: 'Contact text hover',
        }),
      ],
    }),
    

  ],

  preview: {
    select: {
      title: "settings.siteTitle",
    },
  },
});
