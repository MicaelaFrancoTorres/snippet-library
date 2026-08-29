import type { Metadata } from "next";
import "./globals.css";
import { StoreHydration } from "@/components/snippets/StoreHydration";

export const metadata: Metadata = {
  title: "Snippet Library",
  description:
    "Biblioteca personal de fragmentos de código reutilizables, con búsqueda, etiquetas y copia rápida.",
  openGraph: {
    title: "Snippet Library",
    description:
      "Biblioteca personal de fragmentos de código reutilizables, con búsqueda, etiquetas y copia rápida.",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {children}
        <StoreHydration />
      </body>
    </html>
  );
}