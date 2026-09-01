# 📚 Snippet Library — Migración a Next.js

Biblioteca personal de fragmentos de código reutilizables, con búsqueda,
etiquetas, favoritos y copia rápida. Migrada de React + Vite a **Next.js 16**
(App Router) + TypeScript, como parte del Tercer Proyecto Integrador.

---

## 👥 Integrantes

| Integrante | Desafío | Rama |
|---|---|---|
| Brandon Velasquez | D1 — Base: scaffold de Next.js, store con Zustand y fix de hidratación SSR | `feature/store-base` |
| Melina Ricaldez | D2 — Formulario de carga con validación accesible | `feature/snippet-form` |
| Mayra Limachi | D3 — Lista de snippets, filtros, favoritos, copiar y resaltado de sintaxis | `feature/snippet-list-filters` |
| Micaela Sofía Franco Torres | D4 — Buscador, SEO/metadata y optimización | `feature/search-bar`, `feature/seo-metadata`, `perf/next-optimizations` |
| Noelia Brandan | D5 — Corrección de bugs y accesibilidad (ARIA, semántica HTML) | `fix/accessibility-and-bugs` |

---

## 🔗 Proyecto original

Este proyecto es una migración del trabajo de otro grupo del curso, desarrollado
originalmente en React + Vite:

- **Repositorio original:** https://github.com/KarenLedesma/snippet-library
- **Integrantes originales:** Karen Ledesma, Ailin Garay, Nicole Rodriguez, Fiorella Valdivia

La migración conserva toda la lógica y funcionalidad del proyecto original,
adaptándola al modelo de rutas y renderizado de Next.js, y corrigiendo los
bugs encontrados en el camino (ver sección de Bugs más abajo).

---

## 🛠️ Tecnologías utilizadas

- **Next.js 16** (App Router) + TypeScript
- **React 19**
- **Zustand** (estado global + persistencia en localStorage)
- **Tailwind CSS v4**
- **Lucide React** (íconos)
- **highlight.js** (resaltado de sintaxis)

---

## ✨ Funcionalidades

- Cargar snippets con título, lenguaje, descripción, código y etiquetas
- Marcar snippets como favoritos
- Eliminar snippets
- Persistencia automática en localStorage (con fix de hidratación para Next.js)
- Filtrado por lenguaje, etiqueta y favoritos
- Copiar código al portapapeles
- Búsqueda por palabra clave en título, descripción y código
- Resaltado de sintaxis según el lenguaje del snippet

---

## 🐛 Bugs encontrados y corregidos

Se encontraron y corrigieron 7 bugs durante la lectura y migración del código
(bugs preexistentes del proyecto original, y uno introducido por la propia
migración). El detalle completo de cada uno — qué pasaba, por qué pasaba y
cómo se solucionó — está documentado en [`BUGFIXES.md`](./BUGFIXES.md).

Resumen rápido:

1. `localStorage` rompía la hidratación en SSR de Next.js (introducido por la migración)
2. Formulario sin `<label>` asociadas a los inputs
3. Formulario no avisaba si faltaban campos obligatorios
4. Bloque de filtros duplicado dos veces en el mismo archivo
5. Filtros y botones de ícono sin etiquetas accesibles
6. `<html lang="en">` con contenido en español, sin metadata ni SEO
7. Warning de seguridad de `highlight.js` en consola

---

## ♿ Accesibilidad

Además de las correcciones puntuales del punto anterior, se reforzó la
accesibilidad general de la app siguiendo los principios POUR (Perceptible,
Operable, Understandable, Robusto):

- Estructura semántica con `<section>`, `aria-labelledby` y jerarquía correcta de headings
- Filtros agrupados con `<fieldset>` + `<legend>` (HTML nativo, sin depender de ARIA innecesario)
- Lista de snippets con `role="list"` / `role="listitem"`
- Región `aria-live="polite"` que anuncia la cantidad de resultados al filtrar o buscar
- `aria-label` descriptivos en todos los botones de solo-ícono (favorito, copiar, eliminar)
- `aria-hidden="true"` en íconos puramente decorativos
- Estados representados con `aria-pressed` además del color (no se depende solo del color)
- `<html lang="es">` correcto en toda la app

---

## ⚡ Optimizaciones aplicadas

Ver detalle completo en [`OPTIMIZATIONS.md`](./OPTIMIZATIONS.md). En resumen:

- Code-splitting automático por componente, nativo del App Router de Next.js
- Favicon servido y optimizado automáticamente por convención de archivos
- El proyecto no usa imágenes ni fuentes personalizadas, por lo que `next/image`
  y `next/font` no aplican en esta migración (documentado con el porqué)

---

## 🎁 Funcionalidad extra

_(Pendiente — se documentará acá si el grupo decide sumar alguna funcionalidad
opcional antes de la entrega final)._

---

## 🚀 Cómo correr el proyecto localmente

```bash
git clone https://github.com/MicaelaFrancoTorres/snippet-library.git
cd snippet-library
npm install
npm run dev
```

Abrí http://localhost:3000 en el navegador.

---

## 📁 Estructura del proyecto
## 📁 Estructura del proyecto

```
src/
  app/
    layout.tsx          # Root layout: metadata, Open Graph, lang="es"
    page.tsx             # Página principal, con secciones semánticas
    sitemap.ts            # Sitemap generado nativamente por Next.js
    robots.ts              # robots.txt generado nativamente por Next.js
    globals.css              # Estilos globales (Tailwind)
  components/
    snippets/
      SnippetForm.tsx       # Formulario para cargar snippets
      SnippetList.tsx        # Lista de snippets (ul/li accesible)
      FilterBar.tsx            # Filtros (fieldset/legend accesible)
      SearchBar.tsx              # Buscador por palabra clave
      CodeHighlight.tsx            # Resaltado de sintaxis con highlight.js
      StoreHydration.tsx             # Fix de hidratación SSR del store
  lib/
    store.ts                         # Store de Zustand con persistencia
    types.ts                          # Modelo de datos (Snippet)
BUGFIXES.md                            # Registro detallado de bugs corregidos
OPTIMIZATIONS.md                        # Decisiones de optimización documentadas
```
---

## 🌿 Flujo de trabajo Git

- `master` — rama principal, versión final del proyecto
- `develop` — rama de integración de todas las features
- `feature/store-base` — D1
- `feature/snippet-form` — D2
- `feature/snippet-list-filters` — D3
- `feature/search-bar` — D4
- `feature/seo-metadata` — D4
- `perf/next-optimizations` — D4
- `fix/accessibility-and-bugs` — D5

Cada integrante trabajó su rama desde `develop`, con commits siguiendo
Conventional Commits (`feat:`, `fix:`, `docs:`, `perf:`), probando cada
funcionalidad en el navegador antes de abrir el Pull Request correspondiente
hacia `develop`.

---

## 🔗 Links

- **Repositorio:** https://github.com/MicaelaFrancoTorres/snippet-library
- **Deploy:** 