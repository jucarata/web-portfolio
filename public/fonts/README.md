# Carpeta de Fuentes

Coloca aquí tus archivos de fuente personalizados.

## Estructura recomendada:

```
public/fonts/
  ├── font.woff2          (peso normal)
  ├── font.woff           (peso normal)
  ├── font.ttf            (peso normal)
  ├── font-bold.woff2     (peso bold/700)
  ├── font-bold.woff      (peso bold/700)
  ├── font-bold.ttf       (peso bold/700)
  ├── font-light.woff2    (peso light/300)
  ├── font-light.woff     (peso light/300)
  └── font-light.ttf      (peso light/300)
```

## Formatos soportados:

- **woff2** (recomendado - mejor compresión)
- **woff** (buena compatibilidad)
- **ttf** (fallback)

## Notas:

- Si tus archivos tienen nombres diferentes, actualiza las rutas en `src/pages/index.astro` en la sección `@font-face`
- Puedes usar solo los formatos que tengas disponibles
- El orden de los formatos importa: woff2 primero (mejor), luego woff, y ttf como fallback
