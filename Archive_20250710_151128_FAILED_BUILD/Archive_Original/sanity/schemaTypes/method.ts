import { defineType } from 'sanity'

export default defineType({
  name: 'method',
  title: 'Method Section',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'bulletPoints', title: 'Bullet Points', type: 'array', of: [{ type: 'string' }] },
  ],
}) 