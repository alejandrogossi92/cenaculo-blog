import Link from "next/link";
import { notFound } from "next/navigation";
import { client, isSanityConfigured } from "@/lib/sanity";
import { PortableText } from "next-sanity";

// Definimos la interfaz para el tipo de dato Recurso
interface Recurso {
  _key: string;
  url: string;
  title?: string; // Hacemos title opcional por si acaso no viene
  titulo?: string; // A veces en Sanity se llama titulo en español
}

export const revalidate = 0;

// Función para buscar un encuentro específico por su slug
async function getEncuentro(slug: string) {
  if (!isSanityConfigured) return null;
  
  try {
    return await client.fetch(`
      *[_type == "encuentro" && slug.current == $slug][0] {
        titulo,
        fecha,
        tipo,
        contenido, 
        "recursos": recursos[] {
          _key,
          titulo,
          tipo,
          // Si es un archivo subido a Sanity, obtenemos su URL real. Si es un link externo, usamos 'url'
          "url": coalesce(archivo.asset->url, imagen.asset->url, url)
        }
      }
    `, { slug });
  } catch (error) {
    console.error(`Error CRÍTICO al obtener el encuentro "${slug}":`, error);
    return null;
  }
}

export default async function EncuentroPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: slug } = await params;

  const encuentro = await getEncuentro(slug);

  // Si no existe, mostramos la página 404
  if (!encuentro) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto py-8 animate-in fade-in duration-500">
      {/* Navegación */}
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm text-maria-muted hover:text-maria-primary transition-colors flex items-center gap-1 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Volver al listado
        </Link>
      </div>

      {/* Encabezado del Artículo */}
      <header className="mb-10 border-b border-maria-border pb-8">
        <div className="flex items-center gap-3 text-sm text-maria-muted mb-4">
          <time dateTime={encuentro.fecha}>{encuentro.fecha}</time>
          <span className="h-1 w-1 rounded-full bg-maria-muted"></span>
          <span className="font-medium text-maria-accent-blue uppercase tracking-wider text-xs">
            {encuentro.tipo}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-maria-primary leading-tight">
          {encuentro.titulo}
        </h1>
      </header>

      {/* Contenido Principal */}
      <div className="prose prose-stone max-w-none text-maria-primary prose-headings:text-maria-primary prose-a:text-maria-accent-blue hover:prose-a:text-maria-primary mb-12 leading-relaxed">
        {encuentro.contenido && <PortableText value={encuentro.contenido} />}
      </div>

      {/* Recursos Adicionales */}
      {encuentro.recursos && encuentro.recursos.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-cenaculo-brown-800 mb-4">Recursos Adicionales</h3>
          <ul className="space-y-3 list-disc pl-5">
            {encuentro.recursos.map((recurso: Recurso) => (
              <li key={recurso._key}>
                <a
                  href={recurso.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cenaculo-brown-700 hover:underline"
                >
                  {recurso.titulo || recurso.title || 'Ver recurso'}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

    </article>
  );
}
