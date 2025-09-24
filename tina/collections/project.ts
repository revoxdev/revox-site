import type { Collection } from "tinacms";

export const ProjectCollection: Collection = {

  name: "project",
  label: "Projects",
  path: "src/content/project",
  format: "mdx",
  ui: {
    router({ document }) {
      return `/project/${document._sys.filename}`;
    },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "string",
    },
    {
      name: "pubDate",
      label: "Publication Date",
      type: "datetime",
    },
    {
      name: "updatedDate",
      label: "Updated Date",
      type: "datetime",
    },
    {
      name: "heroImage",
      label: "Hero Image",
      type: "image",
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
    },
    {
      type: 'string',
      name: 'tags',
      label: 'Tags',
      description: 'Tags for this post',
      list: true,
      ui: {
        component: 'tags',
      },
    },
  ],
}
