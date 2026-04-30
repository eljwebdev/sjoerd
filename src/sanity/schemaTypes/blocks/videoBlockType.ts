import { defineField, defineType } from "sanity";
import { VideoIcon } from "@sanity/icons";

export const videoBlockType = defineType({
  name: "videoBlock",
  title: "Video",
  type: "object",
  icon: VideoIcon,
  fields: [
    defineField({
      name: 'myRangeField',
      title: 'Media width in columns (min 3 - max 8)',
      type: 'number',
      validation: (rule) => rule.min(3).max(8),
    }),
    defineField({
      name: "video",
      title: "Video file WebM",
      type: "file",
      options: {
        accept: "video/webm",
      },
    } ),
    defineField({
      name: "videoFallback",
      title: "Video file MP4 fallback (required)",
      type: "file",
      options: {
        accept: "video/mp4",
      },
      validation: (Rule) => Rule.required(),
    } ),
    defineField({
      name: "posterImage",
      title: "Poster Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "string",
      title: "Description",
      description: "Add description of video for SEO and accessibility",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hasAudio",
      title: "Video has audio",
      type: "boolean",
      description: "Enable to show an Unmute button on the video",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "description",
      media: "posterImage",
    },
    prepare({ title, media }) {
      return {
        title: title || "Untitled",
        subtitle: "video",
        media: media || VideoIcon,
      };
    },
  },
});
