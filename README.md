# Ecoturístico del Pacífico

Propuesta independiente en HTML, CSS y JavaScript. No cambia el sitio oficial.

## Ver la web

**[Abrir el sitio del colegio](https://royazofeifa.github.io/CEPWEB/)**

Esta es la misma propuesta visual publicada en Sites. El código completo se encuentra en `dist/`. GitHub Actions publica esa carpeta automáticamente al actualizar `main`; `github-pages.cjs` adapta las rutas al prefijo `/CEPWEB/` para conservar navegación, fotografías, estilos y scripts.

## Abrir localmente

Se requiere Node.js. Desde esta carpeta ejecutar `node server.cjs` y abrir http://127.0.0.1:4173. No abrir index.html con doble clic: los enlaces conservan las rutas del dominio.

## Contenido

- `dist/`: sitio estático listo para alojar, con las cinco rutas solicitadas.
- `build.cjs`: contenido y plantilla compartida. Después de editar, ejecutar `node build.cjs`.
- `dist/style.css`: identidad visual y diseño adaptable.
- `dist/app.js`: filtros, menú, reproductores y consulta de WhatsApp.
- `dist/hero.css`: tipografía ampliada y ajustes para celular. La portada alterna fotografías institucionales con controles manuales y pausa, y respeta la preferencia de movimiento reducido.
- `dist/assets/`: fotos y escudo obtenidos del sitio institucional.

## Funciones y límites

Los cinco videos se insertan desde el Facebook oficial con su SDK. Se solicita reproducción automática y se silencia cada reproductor al estar listo. Existe pausa global, filtros y enlace al original. La configuración del navegador, Facebook y su disponibilidad pueden impedir la reproducción. No hay MP4 locales; no se garantiza autoplay en todos los dispositivos. Se respeta la preferencia de movimiento reducido.

La consulta prepara un enlace a WhatsApp; no guarda información ni envía mensajes automáticamente. Teléfono y correo provienen del sitio actual. La matrícula dirige al WootIT enlazado por la web oficial. No se prueba el envío de una matrícula ni se modifican datos del portal. Confirmar con el colegio el período de inscripción, los cupos y los datos institucionales antes de sustituir el dominio oficial.

Las fotos de reserva de las tarjetas son imágenes institucionales de referencia; no son fotogramas verificados de cada video. Los enlaces identifican los videos reales de robótica, fútbol, ciencias, banda y orientación vocacional. No se encontró un video de competencia matemática entre los cinco enlaces suministrados; matemáticas se incluye como área educativa sin inventar resultados.

Para una reproducción visual sin interfaz de Facebook y más control sobre autoplay, sustituir las inserciones por archivos MP4 originales autorizados usando video con autoplay, muted, loop y playsinline.

## Fuentes

https://sistemaecoturistico.org/
https://sistemaecoturistico.org/sobre-nosotros/
https://sistemaecoturistico.org/historia/
https://sistemaecoturistico.org/contacto/
https://sistemaecoturistico.org/matricula-en-linea/
https://www.wootit.com/cep/matriculaexterna/matricula.cfm

Videos: Facebook del Colegio Ecoturístico del Pacífico; IDs 1359237916017556, 1244840920516702, 2153208032080633, 2350811442389245 y 680827635015298.
