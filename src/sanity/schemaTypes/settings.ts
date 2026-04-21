// ./src/sanity/schemaTypes/settings.ts
import { defineField, defineType } from "sanity";
import PasswordInput from "../components/PasswordInput";

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
          type: 'image',
          name: 'logo',
          title: 'Algemeen Logo',
          description: 'Standaard logo voor de hele site',
        }),
        defineField({
          type: 'image',
          name: 'icon',
          title: 'Site Icoon',
        }),
        defineField({
          type: 'boolean',
          name: 'indexing',
          title: 'Toestaan dat zoekmachines deze site indexeren?',
          initialValue: false,
        }),
        defineField({
          type: 'email',
          name: 'adminEmail',
          title: 'Administatief E-mail Adres',
          initialValue: 'marketing@underdock.studio',
        }),
        defineField({
          type: 'string',
          name: 'resendApiKey',
          title: 'Resend API Key',
          description: 'API key voor het versturen van formulier e-mails via Resend',
          components: { input: PasswordInput },
        }),
        defineField({
          type: 'email',
          name: 'resendFromEmail',
          title: 'Resend Afzender E-mail',
          description: 'E-mailadres waarmee formulier notificaties worden verstuurd (bijv. noreply@example.com)',
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

    // ── Hoofdnavigatie ──
    defineField({
      type: 'object',
      name: 'mainNavigation',
      title: 'Hoofdnavigatie',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          type: 'image',
          name: 'logo',
          title: 'Navigatie Logo',
          description: 'Optioneel: overschrijft het algemene logo in de navigatie',
        }),
        defineField({
          type: 'array',
          name: 'links',
          title: 'Menu Links',
          of: [{ type: 'link' }],
        }),
      ],
    }),

    // ── Voettekst ──
    defineField({
      type: 'object',
      name: 'footer',
      title: 'Voettekst',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          type: 'image',
          name: 'logo',
          title: 'Voettekst Logo',
          description: 'Optioneel: overschrijft het algemene logo in de voettekst',
        }),
        defineField({
          type: 'string',
          name: 'copyright',
          title: 'Copyright Tekst',
          description: 'Bijv. "Bedrijfsnaam"',
        }),
        defineField({
          type: 'array',
          name: 'links',
          title: 'Menu Links',
          of: [{ type: 'link' }],
        }),
        defineField({
          type: 'array',
          name: 'legalLinks',
          title: 'Juridische Links',
          description: 'Bijv. Privacyverklaring, Cookieverklaring, Algemene voorwaarden',
          of: [{ type: 'link' }],
        }),
      ],
    }),

    // ── Tracking ──
    defineField({
      type: 'object',
      name: 'tracking',
      title: 'Tracking',
      description: 'Google Analytics of Tag Manager koppelen',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          type: 'string',
          name: 'provider',
          title: 'Provider',
          options: {
            list: [
              { title: 'Geen', value: 'none' },
              { title: 'Google Analytics 4 (GA4)', value: 'ga4' },
              { title: 'Google Tag Manager (GTM)', value: 'gtm' },
            ],
            layout: 'radio',
          },
          initialValue: 'none',
        }),
        defineField({
          type: 'string',
          name: 'measurementId',
          title: 'Tracking ID',
          description: 'GA4: G-XXXXXXXXXX — GTM: GTM-XXXXXXX',
          hidden: ({ parent }) => !parent?.provider || parent.provider === 'none',
          validation: (rule) =>
            rule.custom((value, context) => {
              const parent = context.parent as { provider?: string } | undefined;
              if (!parent?.provider || parent.provider === 'none') return true;
              if (!value) return 'Tracking ID is verplicht';
              if (parent.provider === 'ga4' && !/^G-[A-Z0-9]+$/.test(value))
                return 'GA4 ID moet beginnen met G- (bijv. G-XXXXXXXXXX)';
              if (parent.provider === 'gtm' && !/^GTM-[A-Z0-9]+$/.test(value))
                return 'GTM ID moet beginnen met GTM- (bijv. GTM-XXXXXXX)';
              return true;
            }),
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

    // ── Socials ──
    defineField({
      type: 'object',
      name: 'socials',
      title: 'Sociale Media',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          type: 'array',
          name: 'items',
          title: 'Sociale Links',
          of: [
            defineField({
              type: 'object',
              name: 'social',
              title: 'Sociaal',
              fields: [
                defineField({
                  type: 'string',
                  name: 'platform',
                  title: 'Platform',
                  options: {
                    list: [
                      { title: 'Facebook', value: 'facebook' },
                      { title: 'Instagram', value: 'instagram' },
                      { title: 'X (Twitter)', value: 'x' },
                      { title: 'LinkedIn', value: 'linkedin' },
                      { title: 'YouTube', value: 'youtube' },
                      { title: 'TikTok', value: 'tiktok' },
                      { title: 'Pinterest', value: 'pinterest' },
                      { title: 'GitHub', value: 'github' },
                      { title: 'Anders', value: 'other' },
                    ],
                  },
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  type: 'string',
                  name: 'label',
                  title: 'Label',
                  description: 'Weergavenaam (optioneel, standaard: platformnaam)',
                }),
                defineField({
                  type: 'url',
                  name: 'url',
                  title: 'URL',
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: {
                select: {
                  platform: 'platform',
                  label: 'label',
                  url: 'url',
                },
                prepare({ platform, label, url }) {
                  const platformNames: Record<string, string> = {
                    facebook: 'Facebook',
                    instagram: 'Instagram',
                    x: 'X (Twitter)',
                    linkedin: 'LinkedIn',
                    youtube: 'YouTube',
                    tiktok: 'TikTok',
                    pinterest: 'Pinterest',
                    github: 'GitHub',
                    other: 'Anders',
                  };
                  return {
                    title: label || platformNames[platform] || platform,
                    subtitle: url,
                  };
                },
              },
            }),
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
