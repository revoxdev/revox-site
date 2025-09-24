import type { Collection } from "tinacms";

export const NewsroomCollection: Collection = {

  name: "newsroom",
  label: "Newsroom",
  path: "src/content/newsroom",
  format: "mdx",
  ui: {
    router({ document }) {
      return `/newsroom/${document._sys.filename}`;
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
      name: "featured",
      label: "Featured Post",
      type: "boolean",
      description: "Mark this post as featured to display it prominently",
      ui: {
        component: "toggle",
      },
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
    {
      type: 'object',
      name: 'authors',
      label: 'Authors',
      list: true,
      templates: [
        {
          name: 'author',
          label: 'Author',
          fields: [
            {
              type: 'string',
              name: 'name',
              label: 'Author Name',
            },
            {
              type: 'string',
              name: 'designation',
              label: 'Profession/Designation',
              description: 'e.g., Cybersecurity Expert, AI Research Director',
            },
            {
              type: 'image',
              name: 'avatar',
              label: 'Profile Image',
            },
          ],
        },
      ],
      ui: {
        itemProps: (item) => {
          return { label: item?.name || 'New Author' };
        },
        allowedActions: {
          create: true,
          delete: true,
        },
        component: 'group-list',
        defaultItem: () => ({
          _template: 'author',
          name: '',
          designation: '',
          avatar: '',
        }),
      },
    },
  ],
}
