import { defineField, defineType } from "sanity";
import {DocumentIcon} from '@sanity/icons'

export const homePageType = defineType({
  name: "homePage",
  type: "document",
  title: "Home Page",
  icon: DocumentIcon,
groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'settings', title: 'Page settings' },
  ],
  fields: [
    defineField({
      name: "headSeo",
      title: "Head SEO",
      type: "headSeo",
      group: 'settings',
    }),
    defineField({
      name: "work",
      type: "work",
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: "headSeo.pageTitle",
    },
  },
});