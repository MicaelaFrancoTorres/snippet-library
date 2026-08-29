import type { Metadata } from "next";
import "./globals.css";
import { StoreHydration } from "@/components/snippets/StoreHydration";

export const metadata: Metadata = {
  title: "Snippet Library",
  description: "Biblioteca personal de fragmentos de código reutilizables, con búsqueda, etiquetas y copia rápida.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body>
        {children}
        <StoreHydration />
      </body>
    </html>
  );
}