// ./src/sanity/schemaTypes/customLink.ts
import { defineField, defineType } from "sanity";

export const customLinkType = defineType({
  type: 'object',
  name: 'link',
  title: 'Link',
  fields: [
    defineField({
      type: 'string',
      name: 'label',
      title: 'Label',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'string',
      name: 'linkType',
      title: 'Link Type',
      initialValue: 'internal',
      options: {
        list: [
          { title: 'Interne pagina', value: 'internal' },
          { title: 'Aangepaste URL', value: 'external' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'reference',
      name: 'internalLink',
      title: 'Pagina',
      to: [
        { type: 'page' },
        { type: 'post' },
        { type: 'author' },
        { type: 'category' },
      ],
      hidden: ({ parent }) => parent?.linkType !== 'internal',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { linkType?: string };
          if (parent?.linkType === 'internal' && !value) {
            return 'Selecteer een pagina';
          }
          return true;
        }),
    }),
    defineField({
      type: 'string',
      name: 'externalUrl',
      title: 'URL',
      description: 'Volledige URL, relatief pad (/pad), of anchor (#sectie)',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { linkType?: string };
          if (parent?.linkType !== 'external') return true;
          if (!value) return 'Voer een URL in';
          if (/^(https?:\/\/|\/|#|mailto:|tel:)/.test(value)) return true;
          return 'Gebruik een volledige URL (https://...), relatief pad (/...), of anchor (#...)';
        }),
      hidden: ({ parent }) => parent?.linkType !== 'external',
    }),
    defineField({
      type: 'string',
      name: 'target',
      title: 'Target',
      options: {
        list: [
          { title: 'Zelfde venster (_self)', value: '_self' },
          { title: 'Nieuw venster (_blank)', value: '_blank' },
        ],
      },
    }),
    defineField({
      type: 'string',
      name: 'rel',
      title: 'Rel',
      description: 'Bijv. nofollow, noopener, noreferrer (komma-gescheiden)',
    }),
  ],
  preview: {
    select: {
      title: 'label',
      linkType: 'linkType',
      internalTitle: 'internalLink.title',
      internalName: 'internalLink.name',
      externalUrl: 'externalUrl',
    },
    prepare({ title, linkType, internalTitle, internalName, externalUrl }) {
      const subtitle = linkType === 'internal'
        ? `→ ${internalTitle || internalName || 'Geen pagina geselecteerd'}`
        : `→ ${externalUrl || 'Geen URL'}`;
      return { title: title || 'Naamloos', subtitle };
    },
  },
});
