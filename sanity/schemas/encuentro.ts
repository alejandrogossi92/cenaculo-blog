import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'encuentro',
  title: 'Encuentro',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'titulo',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'fecha',
      title: 'Fecha del Encuentro',
      type: 'date',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'tipo',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          { title: 'Oración', value: 'Oración' },
          { title: 'Servicio', value: 'Servicio' },
          { title: 'Comunidad', value: 'Comunidad' },
          { title: 'Formación', value: 'Formación' },
        ],
      },
    }),
    defineField({
      name: 'resumen',
      title: 'Resumen Corto',
      type: 'text',
      rows: 3,
      description: 'Se muestra en la lista principal del blog'
    }),
    defineField({
      name: 'contenido',
      title: 'Contenido Completo',
      type: 'array', 
      of: [{type: 'block'}]
    }),
    defineField({
      name: 'recursos',
      title: 'Recursos Adjuntos',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Recurso',
          fields: [
            {name: 'titulo', type: 'string', title: 'Título del recurso'},
            {
              name: 'tipo', 
              type: 'string', 
              title: 'Tipo',
              options: {
                list: [
                  {title: 'Documento PDF', value: 'pdf'},
                  {title: 'Video Externo', value: 'video'},
                  {title: 'Imagen', value: 'imagen'}
                ]
              }
            },
            {
              name: 'url', 
              type: 'url', 
              title: 'Link (Solo para videos)',
              hidden: ({parent}) => parent?.tipo !== 'video'
            },
            {
              name: 'archivo', 
              type: 'file', 
              title: 'Archivo (Solo para PDFs)',
              hidden: ({parent}) => parent?.tipo !== 'pdf'
            },
            {
              name: 'imagen',
              type: 'image',
              title: 'Imagen',
              options: { hotspot: true },
              hidden: ({parent}) => parent?.tipo !== 'imagen'
            }
          ]
        }
      ]
    })
  ],
})
