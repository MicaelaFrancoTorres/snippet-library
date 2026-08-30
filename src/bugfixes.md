# Bugs encontrados y corregidos

Acá vamos anotando todos los bugs que fuimos encontrando mientras leíamos el
código original de Karen y lo íbamos migrando a Next.js. Algunos ya venían del
proyecto de React+Vite, y uno lo generamos nosotros mismos al migrar (el de
localStorage, que se explica abajo).

---

## 1. El store se rompía al migrar a Next.js (localStorage en el servidor)

Este fue el bug más importante de toda la migración, y el más difícil de
entender al principio.

El store original (`store.ts`) guarda los snippets en `localStorage` para que
no se pierdan al recargar la página. En Vite esto anda perfecto porque todo el
código corre directo en el navegador. El problema es que Next.js, antes de
mandarle nada al navegador, arma la página en el servidor — y ahí `localStorage`
directamente no existe, porque es una API del navegador. Cuando probamos la app
por primera vez en Next nos tiraba errores de "hidratación" en la consola.

Lo arreglamos agregando `skipHydration: true` en la config de Zustand, para que
no intente leer nada solo. Y armamos un componente aparte, `StoreHydration.tsx`,
que recién ahí, adentro de un `useEffect` (o sea, ya del lado del navegador),
le dice al store "ahora sí, leé lo que había guardado".

# `src/lib/store.ts` y `src/components/snippets/StoreHydration.tsx`

---

## 2. El formulario no tenía labels en los inputs

En `SnippetForm.tsx` del original, todos los campos tenían solo `placeholder`
(el texto gris que dice "Título", "Descripción", etc.) pero ninguno tenía una
`<label>` de verdad asociada. Esto está mal para accesibilidad porque un
lector de pantalla no anuncia bien los placeholders, y además desaparecen
apenas empezás a escribir.

Le agregamos un `<label>` a cada campo con `htmlFor`, pero las dejamos ocultas
visualmente con la clase `sr-only` de Tailwind, así no cambia nada del diseño
que ya tenía el proyecto pero sí queda accesible.

# src/components/snippets/SnippetForm.tsx`

---

## 3. Si guardabas el formulario vacío, no pasaba nada (ni un aviso)

Relacionado con el punto anterior: si tocabas "Guardar snippet" sin completar
el título o el código, la función simplemente hacía `return` y listo, sin
mostrar ningún error. El usuario se quedaba sin entender por qué no se guardó
nada.

Agregamos un mensaje de error en rojo que aparece arriba del formulario, con
`aria-live="assertive"` para que además se lo anuncie automáticamente a
cualquiera que esté usando un lector de pantalla.

# `src/components/snippets/SnippetForm.tsx`

---

## 4. Los filtros estaban repetidos dos veces en el mismo archivo

Este fue divertido de encontrar. En `SnippetList.tsx` del original, todo el
bloque de filtros (el botón de favoritos, el input de etiqueta, el select de
lenguaje) estaba escrito DOS VECES: una para cuando había snippets cargados,
y una copia exacta para cuando la lista estaba vacía. Se nota que pasó al
mezclar las ramas de D2 (filtros) con las demás y resolvieron el conflicto
duplicando en vez de sacarlo a un componente aparte.

Lo sacamos a un componente propio, `FilterBar.tsx`, que ahora se usa una sola
vez en los dos casos.

# `src/components/snippets/FilterBar.tsx` y `SnippetList.tsx`

---

## 5. Los íconos de favorito, copiar y borrar no tenían texto para lectores de pantalla

Los tres botones de cada tarjeta (la estrella, el de copiar, el tacho de
basura) eran solo un ícono de Lucide sin ningún texto al lado. Visualmente
se entiende qué hace cada uno, pero alguien usando un lector de pantalla
solo iba a escuchar "botón" sin saber para qué sirve.

Les agregamos `aria-label` a cada uno, describiendo la acción (por ejemplo
`aria-label="Eliminar snippet {título}"`, usando el título real del snippet
para que quede bien específico). También agregamos `aria-pressed` en el botón
de favoritos y en el de filtro, para que quede claro su estado activado o no,
sin depender solo de que se vea amarillo.

#src/components/snippets/SnippetList.tsx` y `FilterBar.tsx`

---

## 6. El sitio decía que estaba en inglés y no tenía nada de SEO

El `index.html` original tenía `<html lang="en">`, a pesar de que toda la app
está en español de punta a punta — probablemente porque nadie tocó esa línea
después de crear el proyecto con Vite. Tampoco había ninguna descripción del
sitio, ni título más allá del genérico "snippet-library", ni nada pensado
para cuando se comparte el link.

Al armar el `layout.tsx` de Next.js corregimos el `lang` a `"es"`, y agregamos
metadata completa (título, descripción, Open Graph), más los archivos
`sitemap.ts` y `robots.ts` que pide la consigna.

📁 `src/app/layout.tsx`, `sitemap.ts`, `robots.ts`

## 7. Warning raro en la consola sobre "unescaped HTML"

Este no venía del código original, apareció recién al migrar y probar en Next.
En la consola del navegador salía repetido un montón de veces: "One of your
code blocks includes unescaped HTML. This is a potentially serious security
risk", apuntando a `CodeHighlight.tsx`.

Investigamos un poco (el link que trae el mismo warning explica de qué se
trata) y es un aviso preventivo de la librería `highlight.js`: avisa cada vez
que pinta algo dentro de un `<code>` sin que vos le confirmes explícitamente
que ya revisaste que es seguro. En nuestro caso no hay ningún riesgo real
porque React ya escapa automáticamente el texto del código al mostrarlo — pero
igual lo silenciamos como corresponde, agregando la config
`hljs.configure({ ignoreUnescapedHTML: true })`, en vez de dejarlo tirando el
warning todo el tiempo sin explicación.

`src/components/snippets/CodeHighlight.tsx`