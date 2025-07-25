import { defineType } from 'sanity'

export default defineType({
  name: 'social',
  title: 'Social Section',
  type: 'document',
  fields: [
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
            { name: 'icon', title: 'Icon', type: 'image' },
          ],
        },
      ],
    },
    { name: 'statement', title: 'Statement', type: 'text' },
  ],
}) 