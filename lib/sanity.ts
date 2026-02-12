import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Log de depuración para ver qué está leyendo Vercel (ocultando parte del ID por seguridad)
console.log("Sanity Config Check:", {
  hasProjectId: !!projectId,
  projectIdPrefix: projectId ? projectId.substring(0, 3) : "N/A",
  dataset,
  nodeEnv: process.env.NODE_ENV
});

// Verificamos si el ID es válido (solo letras, números y guiones)
// Si no lo es (o es undefined), usamos "dummy-id" para evitar que la app explote al iniciar.
const isValidId = projectId && /^[a-z0-9-]+$/.test(projectId);

export const client = createClient({
  projectId: isValidId ? projectId : "dummy-id",
  dataset,
  apiVersion: "2024-02-11", // Fecha actual o la de tu proyecto
  useCdn: false, // false para obtener datos frescos siempre, true para caché (más rápido)
});

// Exportamos esto para que las páginas sepan si intentar hacer fetch o no
export const isSanityConfigured = !!isValidId;