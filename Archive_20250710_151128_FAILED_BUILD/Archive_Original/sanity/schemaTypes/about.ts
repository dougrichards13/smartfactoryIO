import { defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    { name: 'companyHistory', title: 'Company History', type: 'text' },
    { name: 'credentials', title: 'Credentials', type: 'text' },
    { name: 'vision', title: 'Vision', type: 'text' },
    { name: 'differentiation', title: 'Differentiation', type: 'text' },
    { name: 'clientLogos', title: 'Client Logos', type: 'array', of: [{ type: 'image' }] },
  ],
}) 