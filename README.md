# 🐉 Fractal Psyduck

## Descripción del proyecto
Este proyecto combina **fractales generativos** con **entrada de audio en tiempo real** usando p5.js y p5.sound. El resultado es una visualización interactiva donde un **Dragon Curve** evoluciona y reacciona al volumen del micrófono, acompañado de elementos gráficos lúdicos como la bola de Psyduck en el centro y un Psyduck sorpresa cuando el nivel de sonido alcanza su máximo.

La interfaz incluye controles para:
- Activar/desactivar el micrófono.
- Entrar en modo demo (sin micrófono).
- Cambiar entre tres paletas de color.
- Visualizar una barra de volumen sincronizada con el audio.

---

## Tipo de fractal implementado
- **Dragon Curve (curva del dragón)** generado mediante un sistema de **L-Systems**.
- Axioma: `FX`
- Reglas de producción:
  - `X → X+YF+`
  - `Y → -FX-Y`

---

## Parámetros del sonido que controlan el fractal
- **Nivel de volumen (`amp.getLevel()`)**:
  - Controla el número de iteraciones del fractal (entre 8 y 12).
  - Modifica la longitud de los segmentos (entre 6 y 12 píxeles).
  - Ajusta un desplazamiento angular adicional (0 a 40 grados).
  - Influye en la velocidad de rotación del fractal (rotación base + factor proporcional al volumen).
- **Volumen máximo detectado dinámicamente (`maxVol`)**:
  - Se recalibra con decaimiento para adaptar la sensibilidad del fractal a diferentes entornos sonoros.

---

## Técnicas y funciones de p5.sound utilizadas
- `p5.AudioIn()` → captura el micrófono.
- `userStartAudio()` → requerido en navegadores como Chrome para iniciar el audio.
- `p5.Amplitude()` → mide el nivel de volumen en tiempo real.
- `amp.getLevel()` → obtiene el valor actual de amplitud.
- Uso de **lerp** y **constrain** para suavizar la respuesta del fractal y evitar saltos bruscos.

---

## Decisiones estéticas y artísticas
- **Canvas a pantalla completa** para máxima inmersión.
- **Paletas de color intercambiables** (azul→rosa, verde→rojo, amarillo→violeta) para variar la atmósfera visual.
- **Rotación constante** con aceleración según el sonido, evocando dinamismo y energía.
- **Overlay UI gamer pero formal**: botones flotantes con estilo neon minimalista.
- **Easter egg**: aparece un Psyduck gigante cuando el volumen llega al máximo, reforzando el humor geek y la sorpresa.
- **Imagen central (bola Psyduck)** como punto de origen del fractal, aportando narrativa visual.

---

## Reflexión (opcional)
El proyecto busca explorar la relación entre **estructura matemática (fractales)** y **expresión sonora**, mostrando cómo el caos del sonido puede modular patrones geométricos precisos. La inclusión de Psyduck añade un toque humorístico y cultural, recordando que la programación creativa también puede ser juguetona y sorprendente.

---

## Uso de IA o referencias externas
- La IA se ha usado para la documentación y para ayudar en la generación de funciones del codigo.
- Se han usado referencias externas de imágenes (`psyduck.png`, `psyduck_ball.png`) como elementos gráficos.  
- La lógica fractal se inspira en el clásico **Dragon Curve**.

---
