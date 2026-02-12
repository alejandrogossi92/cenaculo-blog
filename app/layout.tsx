import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cenáculo de Jóvenes",
  description: "Blog de encuentros y reflexiones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cabecera Minimalista */}
          <header className="py-10 border-b border-maria-border mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-maria-primary text-center sm:text-left">
              Cenáculo de Jóvenes
            </h1>
            <p className="mt-2 text-maria-muted text-center sm:text-left">Encuentros, oración y comunidad.</p>
          </header>
          
          <main className="flex-grow">
            {children}
          </main>

          {/* Pie de página sencillo */}
          <footer className="py-8 text-center text-sm text-maria-muted border-t border-maria-border mt-12">
            © {new Date().getFullYear()} Cenáculo de Jóvenes. Unidos en oración.
          </footer>
        </div>
      </body>
    </html>
  );
}
