import { defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    { name: 'headline', title: 'Headline', type: 'string' },
    { name: 'subheadline', title: 'Subheadline', type: 'string' },
    { name: 'valueProp', title: 'Value Proposition', type: 'text' },
    { name: 'cta', title: 'CTA Button Text', type: 'string' },
  ],
}) 