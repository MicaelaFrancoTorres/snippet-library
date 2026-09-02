# Optimizaciones aplicadas en la migración

## Imágenes (next/image)
El proyecto original no renderiza ninguna imagen en pantalla mediante
etiquetas `<img>` — el archivo `hero.png` existía en `src/assets/` pero
no estaba conectado a ningún componente visual. Por lo tanto, no hubo
ninguna imagen que migrar a `next/image` en esta versión.

## Fuentes (next/font)
El proyecto original no carga fuentes personalizadas vía CSS ni CDN
externo (usa las fuentes por defecto del sistema a través de Tailwind).
No aplica el uso de `next/font` en este caso.

## Code-splitting automático
Next.js con el App Router separa automáticamente cada componente en su
propio "chunk" de JavaScript (verificado en el HTML servido: archivos
como `/_next/static/chunks/...` se generan uno por componente). No se
requiere configuración manual adicional; es una ventaja nativa que la
migración ya aprovecha sin necesidad de código extra.

## Favicon
El ícono del sitio (`favicon.ico`) es servido y optimizado automáticamente
por Next.js mediante la convención de archivos de `app/`, sin necesidad
de declararlo manualmente en el `<head>`.