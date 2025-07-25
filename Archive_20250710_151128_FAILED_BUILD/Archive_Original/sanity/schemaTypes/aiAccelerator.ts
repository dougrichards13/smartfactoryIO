import { defineType } from 'sanity'

export default defineType({
  name: 'aiAccelerator',
  title: 'AI Accelerator Section',
  type: 'document',
  fields: [
    { name: 'headline', title: 'Headline', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'features', title: 'Key Features', type: 'array', of: [{ type: 'string' }] },
    { name: 'visual', title: 'Visual', type: 'image' },
    { name: 'cta', title: 'CTA', type: 'string' },
  ],
}) 