import { defineType, defineArrayMember } from "sanity";
 
export const workType = defineType({
  name: "work",
  type: "array",
  of: [
    defineArrayMember({ type: "projectBlock" }),
  ],
});