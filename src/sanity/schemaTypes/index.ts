// ./src/sanity/schemaTypes/index.ts
import type { SchemaTypeDefinition } from "sanity";

import { settingsType } from "./settings";
import { imageBlockType } from "./modules/imageBlockType";
import { videoBlockType } from "./modules/videoBlockType";
import { workType } from "../workType";
import { projectBlockType } from "./blocks/projectBlockType";
import { homePageType } from "./homePageType";
import { infoPageType } from "./infoPageType";
import { blockContentType } from "./blocks/blockContent";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    settingsType,
    imageBlockType,
    videoBlockType,
    projectBlockType,
    workType,
    homePageType,
    infoPageType,
    blockContentType,
  ],
};