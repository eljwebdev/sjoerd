// ./src/sanity/schemaTypes/index.ts
import type { SchemaTypeDefinition } from "sanity";

import { settingsType } from "./settings";
import { imageBlockType } from "./blocks/imageBlockType";
import { videoBlockType } from "./blocks/videoBlockType";
import { workType } from "../workType";
import { projectBlockType } from "./blocks/projectBlockType";
import { homePageType } from "./homePageType";
import { infoPageType } from "./infoPageType";
import { textBlockType } from "./blocks/textBlockType";
import { textEntryType } from "./modules/textEntryType";
import { headSeoType } from "./modules/headSeoType";
import { infoRowBlockType } from "./blocks/infoRowBlockType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    settingsType,
    imageBlockType,
    videoBlockType,
    projectBlockType,
    workType,
    homePageType,
    infoPageType,
    textBlockType,
    textEntryType,
    headSeoType,
    infoRowBlockType,
  ],
};