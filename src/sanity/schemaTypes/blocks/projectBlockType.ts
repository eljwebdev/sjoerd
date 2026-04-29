import { defineField, defineType, defineArrayMember } from "sanity";


export const projectBlockType = defineType({
    name: "projectBlock",
    title: "Project Block",
    type: "object",
    groups: [
        { name: "images", title: "Media" },
        { name: "text", title: "Text" },
        { name: "settings", title: "Settings" },
    ],
    fields: [
        // Images group
        defineField({
            name: "imagesDesktop",
            title: "Media Desktop",
            type: "array",
            group: "images",
            of: [
                defineArrayMember({ type: "imageBlock" }),
                defineArrayMember({ type: "videoBlock" }),
            ],
        }),
        defineField({
            name: "imagesMobile",
            title: "Media Mobile",
            type: "array",
            group: "images",
            of: [
                defineArrayMember({ type: "imageBlock" }),
                defineArrayMember({ type: "videoBlock" }),
            ],
        }),

        // Text group
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            group: "text",
        }),
        defineField({
            name: "subtitle",
            title: "Subtitle",
            type: "string",
            group: "text",
        }),
        defineField({
            name: "textEntries",
            title: "Text Entries",
            type: "array",
            group: "text",
            of: [
                {
                    type: "object",
                    fields: [
                        defineField({
                            name: "label",
                            title: "Label",
                            type: "string",
                        }),
                        defineField({
                            name: "content",
                            title: "Content",
                            type: "blockContent",
                        }),
                    ],
                    preview: {
                        select: { title: "label" },
                    },
                },
            ],
        }),

        // Settings group
        defineField({
            name: "imageHeight",
            title: "Image Height",
            type: "string",
            group: "settings",
            options: {
                list: [
                    { title: "Normal", value: "settings-height-normal" },
                    { title: "Small", value: "settings-height-small" },
                ],
                layout: "radio",
            },
            initialValue: "settings-height-normal",
        }),
        defineField({
            name: "textPosition",
            title: "Text Position",
            type: "string",
            group: "settings",
            options: {
                list: [
                    { title: "Below", value: "settings-text-below" },
                    { title: "Left", value: "settings-text-left" },
                    { title: "Right", value: "settings-text-right" },
                ],
                layout: "radio",
            },
            initialValue: "settings-text-below",
        }),
    ],
});