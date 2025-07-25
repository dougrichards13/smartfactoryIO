import { defineType } from 'sanity'

export default defineType({
  name: 'services',
  title: 'Services Section',
  type: 'document',
  fields: [
    {
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', title: 'Icon', type: 'image' },
            { name: 'headline', title: 'Headline', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'cta', title: 'CTA', type: 'string' },
          ],
        },
      ],
    },
  ],
}) 