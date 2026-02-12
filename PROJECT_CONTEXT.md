# Contexto del Proyecto: Cenáculo Blog

## Objetivo
Aplicación web estilo blog minimalista para el "Cenáculo de Jóvenes" (grupo de iglesia católica).
**Funcionalidades:** Listado de encuentros, detalle del encuentro con texto enriquecido, adjuntos (PDFs, videos).
**Estilo:** Colores marrones, grises, crema (Paleta "Cenáculo").

## Stack Tecnológico
- **Framework:** Next.js 15+ (App Router)
- **Estilos:** Tailwind CSS
- **CMS (Backend):** Sanity.io (Headless CMS - Plan Gratuito)
- **Lenguaje:** TypeScript

## Estado Actual (Progreso)

### 1. Configuración Inicial
- Proyecto Next.js creado.
- Tailwind CSS configurado con paleta de colores personalizada (`cenaculo`).
- Archivos base limpios (`globals.css`, `layout.tsx`).

### 2. Integración con Sanity.io
- Librería `next-sanity` instalada.
- Cliente configurado en `lib/sanity.ts`.
- Variables de entorno configuradas en `.env.local` (Project ID y Dataset).
- **Sanity Studio** configurado y accesible en `/studio` (`app/studio/[[...tool]]/page.tsx`).

### 3. Estructura de Datos (Schema)
- Archivo de esquema creado: `sanity/schemas/encuentro.ts`.
- **Campos definidos:**
  - Título
  - Slug (URL amigable)
  - Fecha
  - Tipo (Oración, Servicio, Comunidad, Formación)
  - Resumen
  - Contenido (Portable Text - Texto enriquecido)
  - Recursos (Array de objetos para adjuntar PDFs y Links de Video)

### 4. Frontend (Vistas)
- **Home (`app/page.tsx`):** Lista los encuentros obteniendo datos reales de Sanity.
- **Detalle (`app/encuentros/[id]/page.tsx`):** Muestra un encuentro específico buscando por `slug`.
  - Renderiza texto enriquecido con `<PortableText />`.
  - Lista recursos para descarga/visualización.
- **Layout (`app/layout.tsx`):** Cabecera y pie de página globales.

## Próximos Pasos Pendientes
1.  **[COMPLETADO] Despliegue en Vercel:** Configuración de repositorio limpio, variables de entorno y despliegue exitoso.
2.  **[COMPLETADO] Configuración Studio:** Configuración de CORS y acceso al panel de administración en producción.
3.  **[COMPLETADO] Diseño:** Actualizar paleta de colores a tonos tierra/marrón y grises.
4.  **[COMPLETADO] Funcionalidad de Recursos:** Permitir adjuntar imágenes (además de archivos y links) en los encuentros.
5.  **Ajustes Visuales:** Refinar estilos del texto enriquecido (Portable Text).
6.  **Dominio:** (Opcional) Conectar un dominio personalizado en Vercel.

## Comandos Úteis
- Iniciar servidor de desarrollo: `npx next dev`
- Acceder al CMS (Panel de Admin): `http://localhost:3000/studio`