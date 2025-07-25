import { defineType } from 'sanity'

export default defineType({
  name: 'team',
  title: 'Team Section',
  type: 'document',
  fields: [
    {
      name: 'leaders',
      title: 'Leaders',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'photo', title: 'Photo', type: 'image' },
            { name: 'bio', title: 'Bio', type: 'text' },
            { name: 'contactLink', title: 'Contact Link', type: 'url' },
            { name: 'role', title: 'Role', type: 'string' },
          ],
        },
      ],
    },
  ],
}) 