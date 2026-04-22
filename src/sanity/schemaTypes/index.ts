// ./src/sanity/schemaTypes/index.ts
import type { SchemaTypeDefinition } from "sanity";

import { settingsType } from "./settings";
import { imageBlockType } from "./blocks/imageBlockType";

import { homePageType } from "./homePageType";
import { infoPageType } from "./infoPageType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    settingsType,
    imageBlockType,
    homePageType,
    infoPageType,
  ],
};