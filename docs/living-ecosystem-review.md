# LinkedLab · Living Digital Ecosystem

Preparado el 29 de octubre de 2026 sobre `996874e`, en la rama `feature/living-digital-ecosystem`. La producción no se ha modificado.

## Auditoría y decisión visual

La web utiliza HTML estático generado con Node, CSS y JavaScript nativo, servido por un Worker de Cloudflare con Static Assets. No necesita React. Las imágenes de marca ya estaban en WebP y pesaban pocos kilobytes; las fuentes utilizan el sistema del dispositivo, sin solicitudes externas.

El hero anterior tenía un rectángulo oscuro con nodos y un canvas de partículas. Su bucle de animación y el cursor personalizado continuaban ejecutándose aunque no fueran visibles. El CSS y el JavaScript se copiaban sin minificar. Se conservan la marca, contenidos comerciales, navegación, precios, portfolio, idiomas, contactos, legales y programa de colaboradores.

El nuevo protagonista es una web construida en capas, con volumen, un objeto de enlaces azul y violeta, módulos de clientes, reservas, automatización y analítica y conexiones espaciales. Three.js se utiliza para la geometría, materiales, iluminación y profundidad reales; no se incorporan React, GSAP, modelos remotos, HDR externos ni nuevas imágenes pesadas. La ilustración CSS 3D aparece inmediatamente y también responde al teclado, las capas y el cursor si WebGL no está disponible.

## Secuencia continua al deslizar

La portada y la antigua sección del cubo se sustituyen por una única secuencia de scroll nativo. El escenario permanece visible durante tres tramos: la web se abre y revela sus capas; los módulos se separan y se conectan; y las piezas se reúnen alrededor de LinkedLab. El fondo entero evoluciona con el mismo progreso, incluyendo iluminación, planos de rejilla, anillos y tipografía espacial. La secuencia retrocede exactamente al subir. El texto comercial inicial da paso a explicaciones legibles de cada tramo.

El recorrido ocupa 355 alturas de viewport en escritorio y 320 en móvil, sin interceptar la rueda ni los gestos verticales. Incluye un enlace para ir directamente a los servicios. Con movimiento reducido o una pantalla de poca altura se presenta como contenido estático normal. Las tarjetas de servicios, precios y proyectos también responden al desplazamiento, con trabajo limitado a las secciones visibles.

## Comportamiento implementado

- Entrada progresiva y ensamblaje, sin pantalla de carga y sin ocultar el titular.
- Giro con inercia al arrastrar, respuesta moderada al cursor y cambios de perspectiva al hacer scroll normal.
- Control de profundidad, pausa y reinicio; flechas y Escape para el teclado.
- Scroll táctil vertical nativo, geometría y DPR adaptados al dispositivo y renderizado móvil bajo demanda después de la entrada.
- Carga diferida de Three.js, suspensión fuera de pantalla o en pestañas ocultas y liberación de geometrías, materiales, texturas y renderer al salir. Se conserva el ciclo de vida de bfcache.
- Sin carga de WebGL cuando se solicita movimiento reducido o ahorro de datos. Fallback ante falta o pérdida del contexto gráfico.
- Hero de páginas web con la misma composición espacial; esquema de sistemas con nodos accesibles y explicaciones; portfolio con ventanas en perspectiva y estados de interacción cuidados.
- Composición específica de móvil: titular y CTAs, escena y después explicación extensa. Cabecera, controles y tarjetas sin desbordamiento en los anchos revisados.
- Menos animaciones superpuestas: se retira el cursor personalizado, se simplifican las transiciones de páginas y se pausan los efectos CSS que no son visibles. Mejoras de foco y confinamiento del teclado en las preferencias de cookies.

## Tamaños medidos del build

Medición local con gzip de Node de la versión anterior al ajuste de nitidez; no equivale a una medición de red, Lighthouse o Core Web Vitals.

| Recurso | Antes | Ahora |
| --- | ---: | ---: |
| JavaScript inicial, gzip | 5.073 bytes | 3.302 bytes |
| CSS, gzip | 15.362 bytes | 17.542 bytes |
| Controlador de la escena, gzip | — | 2.697 bytes, diferido |
| Three.js y escena, gzip | — | 152.064 bytes, diferidos |

El JavaScript inicial baja aproximadamente un 35 %. El CSS aumenta 2,18 KB para incorporar la composición y sus variantes. Los recursos pesados quedan fuera de la ruta de renderizado inicial y las páginas sin escena no inicializan el motor. El fallback sigue siendo utilizable si la descarga no llega a completarse. El build mantiene archivos con huella de contenido y caché inmutable para assets, con revalidación del HTML.

## Verificación realizada

- Instalación limpia: `npm ci --ignore-scripts`.
- Compilación: `npm run build`.
- Comprobaciones: `npm run check`, incluidos 35 HTML, referencias locales, contactos regionales, referencias de colaboradores, calculadora y menú adaptable.
- Nuevas pruebas: movimiento reducido, ahorro de datos, denegación de WebGL, carga fuera de pantalla, teclado, swipe vertical, cancelación del arrastre, limpieza de listeners, bfcache, progreso y reversión de la secuencia, foco del contenido que se desvanece y presupuestos de assets.
- Cloudflare: `wrangler deploy --dry-run`, Worker y binding ASSETS empaquetados correctamente. No se ejecutó un despliegue real.
- Navegador: giro con flechas, profundidad, pausa/reinicio, menú móvil/Escape, nodos de sistemas y enlaces del portfolio. Sin overflow horizontal en escritorio y viewports de 320, 390 y 768 px.

El navegador remoto tiene WebGL desactivado. Se ha verificado visualmente el fallback CSS 3D y sus controles; falta revisar el renderizado WebGL en un navegador con GPU real. Los viewports pequeños son pruebas de layout, no mediciones de rendimiento en hardware móvil. No hay una herramienta Lighthouse disponible en este entorno: no se atribuyen puntuaciones ni mejoras de Core Web Vitals sin medirlas.

## Nitidez de la escena en pantalla completa

La captura de revisión mostraba el contenido HTML nítido y el canvas WebGL borroso. El límite anterior de 950.000 píxeles dejaba una escena de 2048 × 1152 por debajo de un píxel de render por píxel CSS; los dispositivos táctiles también se limitaban a DPR 1,15.

La política de calidad ahora admite DPR 2 en escritorio y DPR 3 en pantallas táctiles. Los presupuestos son 8,4 y 4,2 millones de píxeles respectivamente, con un suelo de resolución CSS para pantallas grandes y respetando el tamaño máximo admitido por la GPU. Se conserva el límite de frames y el render móvil bajo demanda; la resolución no se reduce durante el scroll. El resize vuelve a calcularla al cambiar de viewport o pantalla.

Las superficies locales de la web, los cuatro módulos y el núcleo se dibujan al doble de resolución en cada eje; la sombra suave mantiene su tamaño anterior. El filtrado anisotrópico sube hasta 8 muestras, dentro de la capacidad del dispositivo. El antialias se solicita al crear el contexto y el renderer también en móvil; se aumentan los segmentos de los dos aros.

Las pruebas comprueban teléfonos Retina, escritorio Retina, pantallas grandes, presupuesto de píxeles, límites de hardware y los atributos de creación de contexto tanto con puntero fino como táctil. La compilación y las pruebas completas se ejecutan en CI. Este ajuste no cuenta todavía con una comparación visual en hardware con GPU ni una medición de rendimiento en un móvil real.

## Archivos

| Archivo | Cambio |
| --- | --- |
| `src/scene-quality.mjs` | Política de resolución y presupuestos para Retina y pantallas completas |
| `src/ecosystem-scene.js` | Geometría, materiales, iluminación, cámara y ciclo de vida del renderizado |
| `src/scene-controller.js` | Carga diferida, interacción, accesibilidad y preferencias del dispositivo |
| `src/ecosystem-markup.mjs` | HTML inmediato, textos DE/EN/ES y diagrama de sistemas |
| `src/ecosystem.css` | Composición espacial, portfolio, estados y adaptación móvil |
| `src/scroll-story.css` | Escenario de pantalla completa, fondos, capas y transiciones de scroll |
| `src/story-timeline.mjs` | Timeline compartido, reversible y determinista para CSS 3D y WebGL |
| `src/client.js` | Integración opcional y retirada de bucles antiguos; foco de cookies |
| `src/styles.css` | Retirada de estilos del hero y cursor anteriores |
| `src/content.mjs` | Limpieza de la introducción del portfolio, conservando proyectos y enlaces |
| `scripts/build.mjs` | Minificación, separación de módulos y nuevos componentes |
| `scripts/check-scene.mjs` | Pruebas de interacción, preferencias, limpieza y presupuestos |
| `package.json`, `package-lock.json` | Three.js y esbuild con versiones fijadas |
| `.github/workflows/ci.yml` | Instalación reproducible antes de construir y comprobar |

## Publicación

La rama de producción y el workflow de despliegue no se han cambiado. El paso siguiente, previa autorización, es fusionar la propuesta a `main`; el workflow existente publicará el mismo Worker `linkedlab-web` en linkedlab.eu. Después corresponde comprobar los tres idiomas, los dos WhatsApp y el hero con WebGL en producción.
