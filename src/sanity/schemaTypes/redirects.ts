import { TransferIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const redirectsType = defineType({
  name: "redirects",
  title: "Redirects",
  type: "document",
  icon: TransferIcon,
  fields: [
    defineField({
      name: "redirects",
      title: "Redirects",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "source",
              title: "Bron URL",
              type: "string",
              description:
                "Het pad om te redirecten, bijv. /home of /oude-pagina",
              validation: (rule) =>
                rule
                  .required()
                  .custom((value) => {
                    if (!value) return "Bron URL is verplicht";
                    if (!value.startsWith("/"))
                      return "Bron URL moet beginnen met /";
                    return true;
                  }),
            }),
            defineField({
              name: "target",
              title: "Doel pagina",
              type: "reference",
              to: [{ type: "page" }],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "type",
              title: "Redirect type",
              type: "string",
              options: {
                list: [
                  { title: "301 — Permanent", value: "301" },
                  { title: "302 — Tijdelijk", value: "302" },
                  { title: "307 — Tijdelijk (strict)", value: "307" },
                  { title: "308 — Permanent (strict)", value: "308" },
                ],
                layout: "radio",
              },
              initialValue: "301",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              source: "source",
              targetSlug: "target.slug.current",
              type: "type",
            },
            prepare({ source, targetSlug, type }) {
              return {
                title: `${source} → /${targetSlug ?? "..."}`,
                subtitle: type ? `${type} redirect` : "",
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Redirects",
      };
    },
  },
});
