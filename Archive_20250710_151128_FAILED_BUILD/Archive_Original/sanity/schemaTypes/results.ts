import { defineType } from 'sanity'

export default defineType({
  name: 'results',
  title: 'Results Section',
  type: 'document',
  fields: [
    { name: 'metrics', title: 'Metrics', type: 'array', of: [{ type: 'string' }] },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'client', title: 'Client', type: 'string' },
            { name: 'quote', title: 'Quote', type: 'text' },
          ],
        },
      ],
    },
    { name: 'visual', title: 'Visual', type: 'image' },
  ],
}) 