/**
 * ==============================================
 * SISTEMA DE ANIMACIONES CENTRALIZADO - VISINEX
 * ==============================================
 */

class VisinexAnimations {
  constructor() {
    this.init();
  }

  init() {
    if (typeof window !== 'undefined') {
      const initComponents = () => {
        this.setupScrollAnimations();
        this.setupCounters();
        this.setupParallax();
        this.setupScrollBars();
        
        // Re-escanear después para contenido dinámico
        setTimeout(() => {
          this.setupScrollBars();
        }, 1000);
      };

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initComponents);
      } else {
        // DOM ya cargado, ejecutar inmediatamente
        initComponents();
      }
    }
  }

  /**
   * Configura las animaciones on scroll
   */
  setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        const once = el.dataset.once === 'true';
        
        if (entry.isIntersecting) {
          el.classList.add('in-view');
          
          // data-animate: aplica clase de animación cuando entra en vista
          const anim = el.dataset.animate;
          if (anim) {
            const map = {
              'fade-up': 'animate-fade-in-up',
              'slide-left': 'animate-slide-in-left',
              'slide-right': 'animate-slide-in-right',
              'scale-in': 'animate-scale-in',
              'bounce-in': 'animate-bounce-in',
              'fill-left-right': 'animate-fill-left-right',
              'fill-right-left': 'animate-fill-right-left',
              'fill-random': 'animate-fill-random',
            };
            const cls = map[anim] || 'animate-fade-in-up';
            
            // delay opcional
            const delay = el.dataset.delay;
            if (delay) {
              const delayMs = parseInt(delay, 10);
              setTimeout(() => {
                el.classList.add(cls);
              }, delayMs);
            } else {
              el.classList.add(cls);
            }
          }

          // data-typewriter: escribe el contenido HTML de forma progresiva
          if (el.dataset.typewriter !== undefined) {
            const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (!prefersReduced) {
              const speed = parseInt(el.dataset.typeSpeed || '34', 10);
              const delay = parseInt(el.dataset.typeDelay || '0', 10);
              const loop = el.dataset.typeLoop === 'true';
              const loopPause = parseInt(el.dataset.typeLoopPause || '2400', 10);
              this.typewriter(el, { speed, delay, loop, loopPause });
            }
          }

          // data-stagger en contenedor: anima hijos secuenciales
          if (el.dataset.stagger !== undefined) {
            const targetSel = el.dataset.staggerTarget || ':scope > *';
            const baseAnim = el.dataset.staggerBase || 'animate-fade-in-up';
            const step = parseInt(el.dataset.staggerStep || '120', 10);
            const items = el.querySelectorAll(targetSel);
            VisinexAnimations.applySequentialAnimations(Array.from(items), baseAnim, step);
          }
          
          // Activar contador si tiene la clase counter
          if (el.classList.contains('counter')) {
            this.animateCounter(el);
          }

          // Dejar de observar si es one-shot
          if (once) observer.unobserve(el);
          
        } else if (!once && entry.boundingClientRect.top > 0) {
          // Solo resetear si el elemento está arriba (no abajo) y no es one-shot
          const anim = el.dataset.animate;
          if (anim) {
            const map = {
              'fade-up': 'animate-fade-in-up',
              'slide-left': 'animate-slide-in-left',
              'slide-right': 'animate-slide-in-right',
              'scale-in': 'animate-scale-in',
              'bounce-in': 'animate-bounce-in',
              'fill-left-right': 'animate-fill-left-right',
              'fill-right-left': 'animate-fill-right-left',
              'fill-random': 'animate-fill-random',
            };
            const cls = map[anim] || 'animate-fade-in-up';
            el.classList.remove(cls);
          }
          el.classList.remove('in-view');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px 0px'
    });

  // Candidatos: secciones, [data-animate], .scroll-animate, [data-observe], [data-typewriter]
  const candidates = document.querySelectorAll('section, [data-animate], .scroll-animate, [data-observe], [data-typewriter]');
    candidates.forEach(el => {
      if (!el.classList.contains('scroll-animate')) {
        el.classList.add('scroll-animate');
      }
      observer.observe(el);
    });

    // Observar contadores independientemente de scroll-animate con fallback para mobile
    // Batch read para evitar forced reflows
    const counters = Array.from(document.querySelectorAll('.counter'));
    const viewportHeight = window.innerHeight;
    
    // Leer todas las posiciones primero (batch read)
    const counterData = counters.map(counter => ({
      element: counter,
      rect: counter.getBoundingClientRect()
    }));
    
    // Luego procesar (batch write si es necesario)
    counterData.forEach(({element: counter, rect}) => {
      observer.observe(counter);
      
      const isVisible = rect.top < viewportHeight && rect.bottom > 0;
      
      if (isVisible && !counter.dataset.animated) {
        // Delay pequeño para mobile
        setTimeout(() => {
          this.animateCounter(counter);
        }, 500);
      }
    });
  }

  /**
   * Efecto máquina de escribir preservando el HTML interno
   * - Copia etiquetas completas de inmediato
   * - Escribe caracteres de texto con intervalo configurable
   */
  typewriter(element, { speed = 34, delay = 0, loop = false, loopPause = 2400 } = {}) {
    // Evitar repetir
    if (element.dataset.typing === 'true' || element.dataset.typed === 'true') return;
    element.dataset.typing = 'true';

  const original = element.innerHTML;
    // Si ya no hay contenido, no hacer nada
    if (!original || original.length === 0) {
      element.dataset.typed = 'true';
      element.dataset.typing = 'false';
      return;
    }

    // Mostrar sin animación si prefiere menos movimiento
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      element.innerHTML = original;
      element.dataset.typed = 'true';
      element.dataset.typing = 'false';
      return;
    }

  // Preparar contenido con marcadores para spans coloreados (insertar completos)
    const MARK_START = '[[TW:';
    const MARK_END = ']]';
    const placeholders = [];
    // Detectar spans con clases de color: Tailwind blue, Google brand, text-primary, o arbitrary color text-[#...]
    const coloredSpanRegex = /<span\b[^>]*class=['"][^'"]*(?:text-blue-|text-google-|text-primary|text-\[#)[^'"]*['"][^>]*>[\s\S]*?<\/span>/gi;
  const processed = original.replace(coloredSpanRegex, (m) => {
      const id = placeholders.push(m) - 1;
      return `${MARK_START}${id}${MARK_END}`;
    });

    // Reservar altura para evitar saltos del layout mientras escribe
    // Usar requestAnimationFrame para batch reads/writes
    requestAnimationFrame(() => {
      try {
        const h = element.getBoundingClientRect().height;
        if (h > 0) {
          requestAnimationFrame(() => {
            element.style.minHeight = h + 'px';
          });
        }
      } catch {}
    });

  element.innerHTML = '';
  let i = 0;
  // Contenedor actual de palabra para evitar cortes a media palabra
  let wordContainer = null;
    const len = processed.length;

    const step = () => {
      if (i >= len) {
        element.dataset.typed = 'true';
        element.dataset.typing = 'false';
        if (loop) {
          // Small pause, then restart with original content
          setTimeout(() => {
            element.innerHTML = original;
            element.dataset.typed = 'false';
            element.dataset.typing = 'false';
            // Re-run typing
            this.typewriter(element, { speed, delay, loop, loopPause });
          }, Math.max(0, loopPause));
        }
        return;
      }

      // Insertar placeholders de color instantáneamente
    if (processed.startsWith(MARK_START, i)) {
        const end = processed.indexOf(MARK_END, i + MARK_START.length);
        if (end !== -1) {
          const idStr = processed.substring(i + MARK_START.length, end);
          const id = parseInt(idStr, 10);
          element.insertAdjacentHTML('beforeend', placeholders[id] || '');
      // Reiniciar contenedor de palabra al insertar bloque completo
      wordContainer = null;
          i = end + MARK_END.length;
          setTimeout(step, speed);
          return;
        }
      }

      const ch = processed[i++];
      if (ch === '<') {
        // Copiar etiqueta completa
        let tag = '<';
        while (i < len && processed[i] !== '>') {
          tag += processed[i++];
        }
        if (i < len && processed[i] === '>') {
          tag += '>';
          i++;
        }
  element.insertAdjacentHTML('beforeend', tag);
  // Reiniciar contenedor de palabra tras etiquetas
  wordContainer = null;
      } else if (ch === '&') {
        // Copiar entidad completa
        let entity = '&';
        while (i < len && processed[i] !== ';') {
          entity += processed[i++];
        }
        if (i < len && processed[i] === ';') {
          entity += ';';
          i++;
        }
        element.insertAdjacentHTML('beforeend', entity);
      } else {
        // Manejo especial para espacios para evitar que se "pierdan" con letter-spacing
        if (ch === ' ' || ch === '\n' || ch === '\t') {
          element.appendChild(document.createTextNode(' '));
          // Un espacio cierra la palabra actual
          wordContainer = null;
          setTimeout(step, speed);
          return;
        }
        // Asegurar contenedor de palabra para que no se corte a media palabra
        if (!wordContainer) {
          wordContainer = document.createElement('span');
          wordContainer.className = 'tw-word';
          // inline-block evita quiebres internos; el corte ocurrirá en espacios
          wordContainer.style.display = 'inline-block';
          element.appendChild(wordContainer);
        }
        // Insertar carácter envuelto para desvanecer suavemente dentro de la palabra
        const span = document.createElement('span');
        span.className = 'tw-ch';
        span.textContent = ch;
        wordContainer.appendChild(span);
        // Siguiente frame: activar transición
        requestAnimationFrame(() => { span.style.opacity = '1'; });
      }

      setTimeout(step, speed);
    };

    setTimeout(step, Math.max(0, delay));
  }

  /**
   * Anima un contador desde 0 hasta su valor target
   */
  animateCounter(element) {
    // Evitar animar múltiples veces
    if (element.dataset.animated === 'true') return;
    element.dataset.animated = 'true';
    
    const target = parseInt(element.dataset.target || '0');
    const suffix = element.dataset.suffix || '';
    const prefix = element.dataset.prefix || '';
    const duration = parseInt(element.dataset.duration || '2000');
    
    if (target === 0) return;
    
    // Usar requestAnimationFrame para mejor performance en mobile
    const startTime = performance.now();
    const startValue = 0;
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function para suavizar la animación
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = startValue + (target * easeOutQuart);
      
      element.textContent = prefix + Math.floor(current) + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = prefix + target + suffix;
      }
    };
    
    requestAnimationFrame(animate);
  }

  /**
   * Configura efecto parallax suave en el hero
   */
  setupParallax() {
    const heroElements = document.querySelectorAll('.parallax-hero');
    
    if (heroElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      heroElements.forEach(hero => {
        if (scrolled < window.innerHeight) {
          hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
      });
    });
  }

  /**
   * Configura contadores específicamente (fallback para mobile)
   */
  setupCounters() {
    // Fallback para mobile que ejecuta después de cargar la página
    setTimeout(() => {
      const counters = Array.from(document.querySelectorAll('.counter:not([data-animated="true"])'));
      if (counters.length === 0) return;
      
      // Batch read todas las posiciones
      const viewportHeight = window.innerHeight;
      const counterData = counters.map(counter => ({
        element: counter,
        rect: counter.getBoundingClientRect()
      }));
      
      // Batch process
      counterData.forEach(({element: counter, rect}) => {
        const isVisible = rect.top < viewportHeight && rect.bottom > 0;
        if (isVisible) {
          this.animateCounter(counter);
        }
      });
    }, 1000);

    // También revisar en scroll para mobile con throttling
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const counters = Array.from(document.querySelectorAll('.counter:not([data-animated="true"])'));
          if (counters.length === 0) {
            ticking = false;
            return;
          }
          
          // Batch read
          const viewportHeight = window.innerHeight;
          const counterData = counters.map(counter => ({
            element: counter,
            rect: counter.getBoundingClientRect()
          }));
          
          // Batch process
          counterData.forEach(({element: counter, rect}) => {
            const isVisible = rect.top < viewportHeight * 0.8 && rect.bottom > 0;
            if (isVisible) {
              this.animateCounter(counter);
            }
          });
          
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /**
   * Aplica animaciones con delays secuenciales
   */
  static applySequentialAnimations(elements, baseClass = 'animate-fade-in-up', delayIncrement = 200) {
    elements.forEach((el, index) => {
  // Si el elemento aún no es observado, marcar como scroll-animate para que el IO lo active
  el.classList.add(baseClass);
  el.classList.add('scroll-animate');
  el.style.animationDelay = `${index * delayIncrement}ms`;
    });
  }

  /**
   * Fuerza la visibilidad de elementos (fallback)
   */
  static ensureVisibility() {
    setTimeout(() => {
      const hiddenElements = document.querySelectorAll('[style*="opacity: 0"], .animate-fade-in-up, .animate-slide-in-left, .animate-slide-in-right');
      
      hiddenElements.forEach(el => {
        const computed = getComputedStyle(el);
        if (computed.opacity === '0') {
          el.style.opacity = '1';
          el.style.transform = 'none';
        }
      });
    }, 3000);
  }

  /**
   * Configura las barras que se llenan/vacían con el scroll
   */
  setupScrollBars() {
    const scrollBars = document.querySelectorAll('[data-scroll-bar]');
    
    if (scrollBars.length === 0) return;

    // Asignar direcciones random a cada barra si no las tienen
    const randomDirections = ['left-right', 'right-left', 'center'];
    scrollBars.forEach((bar, index) => {
      if (!bar.dataset.scrollDirection || bar.dataset.scrollDirection === 'random') {
        // Cada barra get una dirección random independiente
        const randomDir = randomDirections[Math.floor(Math.random() * randomDirections.length)];
        bar.dataset.scrollDirection = randomDir;
        
        // Agregar un offset random pequeño para que no se sincronicen
        bar.dataset.scrollOffset = Math.random() * 0.15; // 0-15% offset (reducido)
      }
    });

    // Función para actualizar las barras - OPTIMIZADA para batch reads
    const updateScrollBars = () => {
      // BATCH READ: Leer todas las dimensiones primero
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      const maxScroll = documentHeight - viewportHeight;
      const generalScrollProgress = scrollTop / maxScroll;
      const isDesktop = windowWidth >= 1024;
      
      const fillStartZone = windowHeight * 0.8;
      const fillEndZone = windowHeight * 0.3;
      const totalDistance = fillStartZone - fillEndZone;
      
      // Leer todas las posiciones de elementos en un solo batch
      const barData = Array.from(scrollBars).map(container => {
        const rect = container.getBoundingClientRect();
        const elementTop = rect.top;
        
        // Calcular progreso inmediatamente con la data leída
        let progress;
        if (elementTop >= fillStartZone) {
          progress = 0;
        } else if (elementTop <= fillEndZone) {
          progress = 1;
        } else {
          const currentDistance = fillStartZone - elementTop;
          progress = currentDistance / totalDistance;
        }
        
        return {
          container,
          progress,
          direction: container.dataset.scrollDirection || 'left-right',
          colorBar: container.querySelector('.scroll-color-fill')
        };
      });
      
      // BATCH WRITE: Ahora aplicar todos los estilos
      barData.forEach(({container, progress, direction, colorBar}, index) => {
        if (!colorBar) return;
        
        // Aplicar diferentes estilos según la dirección
        switch (direction) {
          case 'left-right':
            colorBar.style.width = `${progress * 100}%`;
            colorBar.style.transformOrigin = 'left';
            colorBar.style.transform = 'scaleX(1)';
            break;
          case 'right-left':
            colorBar.style.width = `${progress * 100}%`;
            colorBar.style.transformOrigin = 'right';
            colorBar.style.transform = 'scaleX(1)';
            // Para right-left, posicionar desde la derecha
            colorBar.style.marginLeft = `${(1 - progress) * 100}%`;
            break;
          case 'center':
            colorBar.style.width = `${progress * 100}%`;
            colorBar.style.transformOrigin = 'center';
            colorBar.style.transform = 'scaleX(1)';
            // Para center, centrar el crecimiento
            colorBar.style.marginLeft = `${((1 - progress) / 2) * 100}%`;
            break;
          default:
            colorBar.style.width = `${progress * 100}%`;
        }
        
        // Suavizar la transición
        colorBar.style.transition = 'all 0.2s ease-out';
        
      });
    };

    // Escuchar el scroll
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollBars();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Configurar listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Actualización inicial
    updateScrollBars();
  }
}

// Auto-inicializar
const visinexAnimations = new VisinexAnimations();

// Fallback de visibilidad
VisinexAnimations.ensureVisibility();

// Exportar para uso manual si es necesario
window.VisinexAnimations = VisinexAnimations;
