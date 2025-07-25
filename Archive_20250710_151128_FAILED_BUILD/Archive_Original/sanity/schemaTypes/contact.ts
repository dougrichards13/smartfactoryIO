import { defineType } from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact Section',
  type: 'document',
  fields: [
    {
      name: 'chatbotConfig',
      title: 'Chatbot Config',
      type: 'object',
      fields: [
        { name: 'provider', title: 'Provider', type: 'string' },
        { name: 'embedCode', title: 'Embed Code', type: 'text' },
      ],
    },
    {
      name: 'leadCaptureLogic',
      title: 'Lead Capture Logic',
      type: 'object',
      fields: [
        { name: 'qualificationQuestions', title: 'Qualification Questions', type: 'array', of: [{ type: 'string' }] },
        { name: 'routingLogic', title: 'Routing Logic', type: 'text' },
      ],
    },
    { name: 'additionalInfo', title: 'Additional Info', type: 'string' },
  ],
}) 