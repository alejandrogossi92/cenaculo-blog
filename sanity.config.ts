import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './sanity/schema'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy-id';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  basePath: '/studio', // La ruta donde vivirá el panel
  projectId,
  dataset,
  // Plugins y herramientas
  plugins: [structureTool()],
  // Tu esquema de datos
  schema,
})
