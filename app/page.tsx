import Link from "next/link";
import { client, isSanityConfigured } from "@/lib/sanity";

export const dynamic = "force-dynamic"; // Forzar renderizado dinámico explícito para evitar problemas de caché en Vercel

// Definimos la estructura de los datos que vienen de Sanity
interface Encuentro {
  _id: string;
  titulo: string;
  fecha: string;
  resumen: string;
  tipo: string;
  slug: { current: string };
}

// Función para traer los datos
async function getEncuentros() {
  if (!isSanityConfigured) return [];

  try {
    return await client.fetch<Encuentro[]>(`
      *[_type == "encuentro"] | order(fecha desc) {
        _id,
        titulo,
        fecha,
        resumen,
        tipo,
        slug
      }
    `);
  } catch (error) {
    console.error("Error al obtener encuentros:", error);
    return [];
  }
}

export default async function Home() {
  const encuentros = await getEncuentros() || [];

  return (
    <div className="space-y-8">
      {encuentros.length === 0 && (
        <p className="text-center text-cenaculo-muted">
          {!isSanityConfigured 
            ? "Configura las variables de entorno para ver los encuentros." 
            : "No hay encuentros publicados aún."}
        </p>
      )}

      {encuentros.map((encuentro) => (
        <article 
          key={encuentro._id} 
          className="group relative flex flex-col space-y-3 bg-maria-card p-6 rounded-lg shadow-sm border border-maria-border hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3 text-sm text-maria-muted">
            <time dateTime={encuentro.fecha}>{encuentro.fecha}</time>
            <span className="h-1 w-1 rounded-full bg-maria-muted"></span>
            <span className="font-medium text-maria-accent-blue">{encuentro.tipo}</span>
          </div>
          
          <h2 className="text-2xl font-semibold text-maria-primary group-hover:text-maria-accent-blue transition-colors">
            <Link href={`/encuentros/${encuentro.slug.current}`}>
              <span className="absolute inset-0" />
              {encuentro.titulo}
            </Link>
          </h2>
          
          <p className="text-maria-muted line-clamp-3">
            {encuentro.resumen}
          </p>

          <div className="pt-2 text-sm font-medium text-maria-accent-gold">
            Leer más &rarr;
          </div>
        </article>
      ))}
    </div>
  );
}
