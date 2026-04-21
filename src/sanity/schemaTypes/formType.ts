import { defineField, defineType } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

const FIELD_TYPES = [
  { title: "Tekst", value: "text" },
  { title: "E-mail", value: "email" },
  { title: "Telefoon", value: "tel" },
  { title: "Nummer", value: "number" },
  { title: "Tekstvak", value: "textarea" },
  { title: "Dropdown", value: "select" },
  { title: "Radiobuttons", value: "radio" },
  { title: "Checkboxes", value: "checkbox" },
  { title: "Verborgen", value: "hidden" },
];

const TYPES_WITH_PLACEHOLDER = ["text", "email", "tel", "number", "textarea"];
const TYPES_WITH_OPTIONS = ["select", "radio", "checkbox"];

export const formType = defineType({
  name: "form",
  title: "Formulier",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "title",
      title: "Formuliernaam",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "formsparkAction",
      title: "Formspark Action URL",
      type: "url",
      description: "De Formspark formulier URL (bijv. https://submit-form.com/xxxxxxxx)",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "submitLabel",
      title: "Verzendknop Tekst",
      type: "string",
      initialValue: "Verzenden",
    }),
    defineField({
      name: "fields",
      title: "Velden",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "fieldType",
              title: "Type",
              type: "string",
              options: { list: FIELD_TYPES },
              initialValue: "text",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "name",
              title: "Veldnaam",
              type: "slug",
              description: "Technische naam voor het veld (wordt automatisch gegenereerd)",
              options: { source: "label" },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "placeholder",
              title: "Placeholder",
              type: "string",
              hidden: ({ parent }) =>
                !TYPES_WITH_PLACEHOLDER.includes(parent?.fieldType ?? ""),
            }),
            defineField({
              name: "required",
              title: "Verplicht",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "width",
              title: "Breedte",
              type: "string",
              options: {
                list: [
                  { title: "Volledig", value: "full" },
                  { title: "Half", value: "half" },
                ],
                layout: "radio",
              },
              initialValue: "full",
            }),
            defineField({
              name: "options",
              title: "Opties",
              type: "array",
              hidden: ({ parent }) =>
                !TYPES_WITH_OPTIONS.includes(parent?.fieldType ?? ""),
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "label",
                      title: "Label",
                      type: "string",
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: "value",
                      title: "Waarde",
                      type: "string",
                      validation: (rule) => rule.required(),
                    }),
                  ],
                  preview: {
                    select: { title: "label", subtitle: "value" },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              label: "label",
              fieldType: "fieldType",
              required: "required",
            },
            prepare({ label, fieldType, required }) {
              const typeLabel =
                FIELD_TYPES.find((t) => t.value === fieldType)?.title ?? fieldType;
              return {
                title: `${label ?? "Naamloos"}${required ? " *" : ""}`,
                subtitle: typeLabel,
              };
            },
          },
        },
      ],
    }),

    // ── Na verzenden ──
    defineField({
      type: "object",
      name: "onSubmit",
      title: "Na verzenden",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "onSubmitAction",
          title: "Na verzenden actie",
          type: "string",
          options: {
            list: [
              { title: "Toon succesbericht", value: "message" },
              { title: "Doorsturen naar pagina", value: "redirect" },
            ],
            layout: "radio",
          },
          initialValue: "message",
        }),
        defineField({
          name: "successMessage",
          title: "Succesbericht",
          type: "string",
          initialValue: "Bedankt voor je bericht!",
          hidden: ({ parent }) => parent?.onSubmitAction === "redirect",
        }),
        defineField({
          name: "redirectPage",
          title: "Doorstuur pagina",
          type: "reference",
          to: [{ type: "page" }],
          hidden: ({ parent }) => parent?.onSubmitAction !== "redirect",
        }),
        defineField({
          name: "enableDataLayer",
          title: "DataLayer event versturen",
          type: "boolean",
          description: "Push een event naar de GTM dataLayer na verzenden",
          initialValue: false,
        }),
        defineField({
          name: "dataLayerEvent",
          title: "DataLayer event naam",
          type: "string",
          initialValue: "form_submission",
          hidden: ({ parent }) => !parent?.enableDataLayer,
        }),
        defineField({
          name: "notifications",
          title: "E-mail notificaties",
          description: "Configureer e-mails die verstuurd worden na inzending (vereist Resend API key in site-instellingen)",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "recipient",
                  title: "Ontvanger",
                  type: "string",
                  options: {
                    list: [
                      { title: "Administratie (site-instellingen)", value: "admin" },
                      { title: "Gebruiker (formulierveld)", value: "field" },
                    ],
                    layout: "radio",
                  },
                  initialValue: "admin",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "emailField",
                  title: "E-mail veld",
                  type: "string",
                  description: "Veldnaam (slug) van het e-mailveld in dit formulier, bijv. 'e-mail'",
                  hidden: ({ parent }) => parent?.recipient !== "field",
                }),
                defineField({
                  name: "subject",
                  title: "Onderwerp",
                  type: "string",
                  description: "Gebruik {{veldnaam}} voor dynamische waarden",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "body",
                  title: "Inhoud (HTML)",
                  type: "text",
                  rows: 8,
                  description: "E-mail inhoud als HTML. Gebruik {{veldnaam}} voor dynamische waarden",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "fromName",
                  title: "Afzendernaam",
                  type: "string",
                  description: "Optioneel: overschrijft de standaard afzendernaam",
                }),
              ],
              preview: {
                select: {
                  subject: "subject",
                  recipient: "recipient",
                },
                prepare({ subject, recipient }) {
                  return {
                    title: subject ?? "Geen onderwerp",
                    subtitle: recipient === "admin" ? "→ Administratie" : "→ Gebruiker",
                  };
                },
              },
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      fields: "fields",
    },
    prepare({ title, fields }) {
      const count = Array.isArray(fields) ? fields.length : 0;
      return {
        title: title ?? "Naamloos formulier",
        subtitle: `${count} veld${count === 1 ? "" : "en"}`,
      };
    },
  },
});
