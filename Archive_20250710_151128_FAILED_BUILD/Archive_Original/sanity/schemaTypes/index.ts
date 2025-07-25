import { type SchemaTypeDefinition } from 'sanity'
import hero from './hero'
import about from './about'
import services from './services'
import aiAccelerator from './aiAccelerator'
import method from './method'
import results from './results'
import team from './team'
import social from './social'
import contact from './contact'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    hero,
    about,
    services,
    aiAccelerator,
    method,
    results,
    team,
    social,
    contact,
  ],
}
