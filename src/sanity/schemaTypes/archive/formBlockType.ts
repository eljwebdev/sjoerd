import { defineField, defineType } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

export const formBlockType = defineType({
  name: "formBlock",
  title: "Formulier",
  type: "object",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      description: "Optionele koptekst boven het formulier",
    }),
    defineField({
      name: "form",
      title: "Formulier",
      type: "reference",
      to: [{ type: "form" }],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      formTitle: "form.title",
    },
    prepare({ title, formTitle }) {
      return {
        title: title || formTitle || "Formulier",
        subtitle: "Formulier",
      };
    },
  },
});
