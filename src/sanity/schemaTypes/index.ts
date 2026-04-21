// ./src/sanity/schemaTypes/index.ts
import type { SchemaTypeDefinition } from "sanity";
import { authorType } from "./author";
import { blockContentType } from "./blockContent";
import { categoryType } from "./category";
import { postType } from "./post";
import { settingsType } from "./settings";
import { pageType } from "./pageType";
import { pageBuilderType } from "./pageBuilderType";
import { faqType } from "./faqType";
import { faqsType } from "./blocks/faqsType";
import { featuresType } from "./blocks/featuresType";
import { heroType } from "./blocks/heroType";
import { splitImageType } from "./blocks/splitImageType";
import { customLinkType } from "./customLink";
import { redirectsType } from "./redirects";
import { formType } from "./formType";
import { formBlockType } from "./blocks/formBlockType";
import { imageBlockType } from "./blocks/imageBlockType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    authorType,
    blockContentType,
    categoryType,
    postType,
    settingsType,
    pageType,
    pageBuilderType,
    faqType,
    faqsType,
    featuresType,
    heroType,
    splitImageType,
    customLinkType,
    redirectsType,
    formType,
    formBlockType,
    imageBlockType,
  ],
};