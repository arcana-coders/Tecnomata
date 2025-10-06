# 📋 DOCUMENTACIÓN DEL PROYECTO TECNOMATA

## 🏗️ ESTRUCTURA GENERAL DEL PROYECTO

Este es un proyecto de sitio web para **Tecnomata** (empresa de SEO Local y Diseño Web en Morelos) construido con **Astro + Tailwind CSS** con un sistema de animaciones avanzado y componentes modulares.

---

## 📁 ESTRUCTURA DE CARPETAS

### 🔧 **Archivos de Configuración (Raíz)**
```
├── astro.config.mjs          # Configuración principal de Astro
├── package.json              # Dependencias y scripts del proyecto  
├── tailwind.config.js        # Configuración de Tailwind CSS
├── tsconfig.json            # Configuración de TypeScript
└── README.md                # Documentación básica del proyecto
```

### 🖼️ **Recursos Estáticos**
```
├── images/                   # Imágenes del sitio
│   ├── favicon40x40.svg     # Favicon pequeño
│   ├── hero-bg.webp         # Fondo del hero
│   ├── icon-*.svg           # Iconos de servicios
│   └── logo300x80.svg       # Logo principal
└── public/                   # Archivos públicos
    ├── favicon.svg          # Favicon principal
    ├── robots.txt           # SEO - Instrucciones para bots
    └── sitemap.xml          # SEO - Mapa del sitio
```

### 📝 **Contenido y Documentación**
```
└── src/filesmd/              # Archivos Markdown de contenido
    ├── home.md              # Contenido de la página principal
    ├── seolocal.md          # Información sobre SEO Local
    ├── disenoweb.md         # Información sobre Diseño Web
    ├── masresenas.md        # Contenido sobre reseñas
    ├── faq.md               # Preguntas frecuentes
    ├── guia-seo-local.md    # Guía completa de SEO
    ├── esquema.md           # Estructura del proyecto
    └── readme.md            # Documentación interna
```

---

## 🎯 ARQUITECTURA DEL CÓDIGO FUENTE (`src/`)

### 📄 **Páginas (`src/pages/`)**
Las páginas principales del sitio web:

| Archivo | Descripción | URL |
|---------|-------------|-----|
| `index.astro` | **Página principal** - Hero, servicios, testimonios | `/` |
| `contacto.astro` | **Página de contacto** - Formularios y información | `/contacto` |
| `faq.astro` | **Preguntas frecuentes** - FAQ con acordeones animados | `/faq` |
| `seo-local-morelos.astro` | **Servicio SEO Local** - Landing especializada | `/seo-local-morelos` |
| `diseno-web-seo.astro` | **Servicio Diseño Web** - Landing de diseño | `/diseno-web-seo` |
| `mas-resenas.astro` | **Gestión de reseñas** - Servicio de reputación online | `/mas-resenas` |
| `test-seo.astro` | **Auditoría SEO gratuita** - Herramienta de análisis | `/test-seo` |

### 🧩 **Componentes (`src/components/`)**

#### 📐 **Layout Principal**
- `src/layouts/Layout.astro` - **Layout base** con HEAD, meta tags, scripts globales

#### 🏠 **Componentes de Navegación**
- `src/components/Navbar.astro` - **Barra de navegación** principal
- `src/components/Footer.astro` - **Pie de página** con enlaces y barras de garantía

#### 📍 **Secciones de Página (`src/components/sections/`)**
| Componente | Función | Usado en |
|------------|---------|----------|
| `Hero.astro` | **Hero principal** con efecto typewriter | Home |
| `GoogleMaps.astro` | **Sección Google Maps** - Servicios de mapas | Home |
| `LocalSEO.astro` | **Sección SEO Local** - Estrategias | Home |
| `LocalResults.astro` | **Estadísticas de impacto** - Métricas de SEO | Home |
| `WebDesign.astro` | **Sección Diseño Web** - Servicios de diseño | Home |
| `MainServices.astro` | **Servicios principales** - Grid de servicios | Home |
| `Testimonials.astro` | **Testimonios de clientes** - Reseñas | Home |
| `FAQCategories.astro` | **Categorías de FAQ** - Preguntas organizadas | FAQ |
| `ContactInfoSection.astro` | **Información de contacto** | Contacto |
| `SEOLocalHeroMod.astro` | **Hero de SEO Local** con animación scale-in | SEO Local |

#### 🎨 **Componentes UI Reutilizables (`src/components/ui/`)**

##### 🎯 **Componentes de Interacción**
| Componente | Función | Características |
|------------|---------|----------------|
| `FAQItem.astro` | **Pregunta desplegable** | Animación lenta, modo noche automático |
| `CTA.astro` | **Call-to-action** | Botones de conversión |
| `Banner.astro` | **Banner animado** | Texto deslizante horizontal |
| `TrustBar.astro` | **Barra de confianza** | Elementos de credibilidad |

##### 📊 **Componentes de Datos**
| Componente | Función | Animaciones |
|------------|---------|-------------|
| `GuaranteeBar.astro` | **Barras de garantía** | Llenado con scroll, direcciones aleatorias |
| `StatsCard.astro` | **Tarjetas de estadísticas** | Contadores animados |
| `MetricsCard.astro` | **Métricas avanzadas** | Contadores con efectos |
| `TestimonialCard.astro` | **Tarjeta de testimonio** | Hover effects |

##### 🏷️ **Componentes de Contenido**
| Componente | Función | Estilos |
|------------|---------|---------|
| `FeatureCard.astro` | **Tarjeta de característica** | Grid layouts |
| `ServiceCard.astro` | **Tarjeta de servicio** | Tema oscuro/claro |
| `MainServiceCard.astro` | **Servicio principal** | CTAs integrados |
| `TestSEOCard.astro` | **Tarjeta de test SEO** | Métricas de salud |
| `FAQCategoryCard.astro` | **Categoría de FAQ** | Agrupación de preguntas |

##### 🎪 **Componentes de Presentación**
| Componente | Función | Características |
|------------|---------|----------------|
| `SectionHeader.astro` | **Encabezado de sección** | Pills, títulos, subtítulos |
| `MaterialSymbol.astro` | **Iconos Material** | Sistema de iconografía |
| `IconWithColor.astro` | **Iconos modulares** | Sistema de colores centralizado |
| `SocialIcons.astro` | **Redes sociales** | Enlaces a plataformas |
| `MobileDualCTA.astro` | **CTA móvil** | Botones para dispositivos |

### 🎨 **Estilos (`src/styles/`)**
- `src/styles/global.css` - **Estilos globales**, variables CSS, animaciones, sistema modular de colores

### ⚡ **Scripts (`src/scripts/`)**
- `src/scripts/animations.js` - **Sistema de animaciones centralizado** (VisinexAnimations)

---

## 🎭 SISTEMA DE ANIMACIONES

### 📍 **Ubicación**: `src/scripts/animations.js`

### 🔧 **Clase Principal**: `VisinexAnimations`

#### 🎯 **Funcionalidades Principales**:

| Método | Función | Elementos Afectados |
|--------|---------|-------------------|
| `setupScrollAnimations()` | **Animaciones en scroll** | Secciones con `scroll-animate` |
| `setupCounters()` | **Contadores animados** | Elementos con clase `counter` |
| `setupScrollBars()` | **Barras de scroll** | `GuaranteeBar` con llenado progresivo |
| `typewriter()` | **Efecto máquina de escribir** | Hero principal |

#### 🎨 **Tipos de Animaciones Disponibles**:
- `fade-up` - Desvanecimiento desde abajo
- `slide-left` - Deslizamiento desde la izquierda  
- `slide-right` - Deslizamiento desde la derecha
- `scale-in` - Zoom desde el centro

#### 🔄 **Características Especiales**:
- **Animaciones repetibles** - Se ejecutan cada vez que haces scroll
- **Stagger effects** - Elementos aparecen secuencialmente
- **Barras de scroll dinámicas** - Se llenan con direcciones aleatorias
- **Efecto typewriter preservando HTML** - Mantiene colores en texto

---

## 🎨 SISTEMA DE COLORES MODULAR

### 📍 **Ubicación**: `src/styles/global.css`

### 🎯 **Variables CSS Centralizadas**:
```css
:root {
  --color-primary-main: #2563eb;    /* Azul principal */
  --color-secondary-main: #dc2626;  /* Rojo secundario */
  --color-success-main: #16a34a;    /* Verde de éxito */
}
```

### 🔧 **Integración con Tailwind**: `tailwind.config.js`
- `text-primary` → `var(--color-primary-main)`
- `bg-primary` → `var(--color-primary-main)`
- **Control centralizado** - Cambiar un color afecta todo el sitio

---

## 📋 GUÍA DE CONSULTA RÁPIDA

### 🤔 **¿QUIERES SABER...?** → **REVISA ESTOS ARCHIVOS**

#### 🏠 **Estructura de páginas**
- **¿Cómo está organizada la home?** → `src/pages/index.astro`
- **¿Qué secciones tiene cada página?** → `src/pages/*.astro`

#### 🎨 **Diseño y estilos**
- **¿Cómo cambiar colores globalmente?** → `src/styles/global.css` (variables CSS)
- **¿Cómo funcionan los componentes UI?** → `src/components/ui/`
- **¿Configuración de Tailwind?** → `tailwind.config.js`

#### ⚡ **Animaciones y efectos**
- **¿Cómo funcionan las animaciones?** → `src/scripts/animations.js`
- **¿Cómo agregar nuevos efectos?** → Documentación en `VisinexAnimations`
- **¿FAQ con animaciones lentas?** → `src/components/ui/FAQItem.astro`

#### 📝 **Contenido**
- **¿Textos de servicios?** → `src/filesmd/`
- **¿Información de la empresa?** → `src/filesmd/home.md`
- **¿Preguntas frecuentes?** → `src/filesmd/faq.md`

#### 🔧 **Configuración técnica**
- **¿Dependencias del proyecto?** → `package.json`
- **¿Configuración de build?** → `astro.config.mjs`
- **¿Scripts disponibles?** → `package.json` (scripts)

#### 📱 **SEO y rendimiento**
- **¿Meta tags?** → `src/layouts/Layout.astro`
- **¿Sitemap y robots?** → `public/sitemap.xml`, `public/robots.txt`
- **¿Optimización de imágenes?** → `images/` (formato WebP)

---

## 🚀 COMANDOS DE DESARROLLO

### 📦 **Scripts Principales** (desde `package.json`):
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción  
npm run preview  # Preview del build
npm run format   # Formatear código con Prettier
```

### 🎯 **Tareas VS Code** (`.vscode/tasks.json`):
- **astro: dev** - Servidor de desarrollo
- **astro: build** - Build del proyecto
- **astro: preview** - Preview local
- **format** - Formatear código

---

## 🏆 CARACTERÍSTICAS DESTACADAS

### ✨ **Sistema Modular**
- **Colores centralizados** - Cambio global con una variable
- **Componentes reutilizables** - DRY principle
- **Animaciones consistentes** - Sistema unificado

### 🎭 **Experiencia de Usuario**
- **Animaciones suaves** - 60fps con requestAnimationFrame
- **Efectos únicos** - FAQ con modo noche y apertura lenta
- **Responsive design** - Funciona en todos los dispositivos

### 🎯 **SEO Optimizado**
- **Meta tags dinámicos** - Por página
- **Sitemap automático** - URLs estructuradas  
- **Robots.txt** - Control de indexación

### ⚡ **Rendimiento**
- **Astro Static** - Generación estática
- **Imágenes optimizadas** - WebP y SVG
- **CSS moderno** - Variables nativas

---

## 📞 SOPORTE Y MANTENIMIENTO

### 🔍 **Para Debugging**:
1. **Consola del navegador** - Ver logs de animaciones
2. **DevTools** - Inspeccionar componentes
3. **Astro DevToolbar** - Debug específico de Astro

### 📝 **Para Modificaciones**:
1. **Componentes** → `src/components/`
2. **Estilos** → `src/styles/global.css`
3. **Animaciones** → `src/scripts/animations.js`
4. **Contenido** → `src/filesmd/`

---

---

## 🚀 EXPANSIÓN SEO LOCAL - NUEVOS SERVICIOS

### 📅 **FECHA DE INICIO**: 4 de Octubre, 2025

### 🎯 **OBJETIVO**
Ampliar el alcance SEO creando páginas específicas para los servicios registrados en Google Business Profile (GBP) con palabras clave localizadas "en Morelos".

### 🎖️ **SERVICIOS A DESARROLLAR**

#### 📊 **1. Marketing por Internet en Morelos**
- **URL**: `/marketing-internet-morelos`
- **Keyword Principal**: "Marketing por internet en Morelos"
- **Keywords Secundarias**: 
  - "Agencia de marketing digital Morelos"
  - "Marketing online Cuernavaca"
  - "Estrategias digitales Morelos"

#### 🎨 **2. Diseñador Web en Morelos**
- **URL**: `/disenador-web-morelos`  
- **Keyword Principal**: "Diseñador web en Morelos"
- **Keywords Secundarias**:
  - "Diseño de páginas web Cuernavaca"
  - "Desarrollador web Morelos"
  - "Sitios web profesionales Morelos"

#### 📢 **3. Agencia de Publicidad en Morelos**
- **URL**: `/agencia-publicidad-morelos`
- **Keyword Principal**: "Agencia de publicidad en Morelos"
- **Keywords Secundarias**:
  - "Publicidad digital Cuernavaca"
  - "Campañas publicitarias Morelos"
  - "Agencia creativa Morelos"

#### 🎯 **4. Asesor de Marketing en Morelos**
- **URL**: `/asesor-marketing-morelos`
- **Keyword Principal**: "Asesor de marketing en Morelos"
- **Keywords Secundarias**:
  - "Consultor de marketing Cuernavaca"
  - "Asesoría en marketing Morelos"
  - "Estratega de marketing Morelos"

### 📋 **PLAN DE TRABAJO**

#### 🏗️ **FASE 1: ESTRUCTURA Y COMPONENTES** ⏳ *En Proceso*
- [ ] Crear páginas base con rutas optimizadas
- [ ] Adaptar componentes existentes para cada servicio
- [ ] Crear heroes específicos por servicio
- [ ] Desarrollar secciones de contenido únicas

#### 🎨 **FASE 2: DISEÑO Y UX**
- [ ] Personalizar colores y elementos visuales por servicio
- [ ] Crear CTAs específicos para cada tipo de cliente
- [ ] Implementar testimonios segmentados
- [ ] Optimizar para conversiones locales

#### 📝 **FASE 3: CONTENIDO SEO**
- [ ] Crear archivos .md con contenido optimizado
- [ ] Desarrollar FAQs específicas por servicio
- [ ] Implementar schema markup local
- [ ] Optimizar meta descriptions y titles

#### 🔗 **FASE 4: INTERCONEXIÓN**
- [ ] Agregar enlaces internos estratégicos
- [ ] Crear navegación entre servicios
- [ ] Implementar breadcrumbs
- [ ] Configurar sitemap actualizado

### 📊 **COMPONENTES REUTILIZABLES IDENTIFICADOS**

#### ✅ **Componentes Base Disponibles**:
- `Hero.astro` → Adaptable para cada servicio
- `SectionHeader.astro` → Headers personalizables
- `ServiceCard.astro` → Tarjetas de características
- `TestimonialCard.astro` → Testimonios segmentados
- `CTA.astro` → Llamadas a la acción
- `FAQItem.astro` → Preguntas por servicio
- `LocalResults.astro` → Estadísticas locales

#### 🔨 **Nuevos Componentes a Crear**:
- `ServiceHero.astro` → Hero genérico para servicios
- `LocalTestimonials.astro` → Testimonios con ubicación
- `ServiceFeatures.astro` → Características por servicio
- `LocalCTA.astro` → CTA con enfoque geográfico

### 📈 **MÉTRICAS DE ÉXITO**
- Posicionamiento en top 3 para cada keyword principal
- Incremento de tráfico orgánico local
- Mejora en conversiones por servicio
- Mayor visibilidad en Google Business Profile

### 🛠️ **HERRAMIENTAS TÉCNICAS**
- **Framework**: Astro (existente)
- **Estilos**: Sistema modular de colores (existente)
- **Animaciones**: VisinexAnimations (existente)
- **SEO**: Schema markup + meta tags locales
- **Analytics**: Seguimiento por página de servicio

---

## 📝 **LOG DE PROGRESO**

### 📅 **4 de Octubre, 2025**
- ✅ Plan de trabajo definido
- ✅ Estructura de URLs establecida  
- ✅ Keywords mapeadas por servicio
- ✅ **PRIMERA PÁGINA COMPLETADA**: Marketing por Internet en Morelos

#### 🎯 **TODAS LAS PÁGINAS COMPLETADAS - ✅ 4/4**

**📊 Página 1/4: Marketing Internet Morelos - COMPLETADA**
- ✅ Estructura base (`marketing-internet-morelos.astro`)
- ✅ URL: `/marketing-internet-morelos`
- ✅ Keyword: "Marketing por internet en Morelos"

**🎨 Página 2/4: Diseñador Web Morelos - COMPLETADA**
- ✅ Estructura base (`disenador-web-morelos.astro`)
- ✅ URL: `/disenador-web-morelos`
- ✅ Keyword: "Diseñador web en Morelos"

**📢 Página 3/4: Agencia Publicidad Morelos - COMPLETADA**
- ✅ Estructura base (`agencia-publicidad-morelos.astro`)
- ✅ URL: `/agencia-publicidad-morelos`
- ✅ Keyword: "Agencia de publicidad en Morelos"

**🎯 Página 4/4: Asesor Marketing Morelos - COMPLETADA**
- ✅ Estructura base (`asesor-marketing-morelos.astro`)
- ✅ URL: `/asesor-marketing-morelos`
- ✅ Keyword: "Asesor de marketing en Morelos"

### 🛠 **SISTEMA MODULAR IMPLEMENTADO**
- ✅ Componente ServiceHero (hero personalizable por servicio)
- ✅ Componente ServiceFeatures (características por servicio)  
- ✅ Componente LocalTestimonials (testimonios locales por servicio)
- ✅ Build exitoso verificado - 18 páginas compiladas
- ✅ Sistema de tipos TypeScript corregido
- ✅ **TODAS LAS 4 PÁGINAS SEO CREADAS EXITOSAMENTE**

### 📅 **4 de Octubre, 2025 - ACTUALIZACIÓN FINAL**
- 🎉 **EXPANSIÓN SEO COMPLETADA AL 100%**
- ✅ Las 4 páginas de servicios creadas exitosamente
- ✅ Sistema modular completamente implementado  
- ✅ Build exitoso con 18 páginas totales
- ✅ TypeScript sin errores de compilación

#### 🎨 **MENÚ Y RESPONSIVE - ✅ COMPLETAMENTE CORREGIDO**
- ✅ **Menú Desktop**: Desplegables con hover persistente que permite clics
  - 📊 "Servicios" → Todas las páginas de servicios locales  
  - 🛠 "SEO y Herramientas" → Herramientas y SEO
  - ✅ **PROBLEMA SOLUCIONADO**: Los enlaces ahora son clicables
- ✅ **Menú Móvil**: Desplegables funcionales con animaciones
  - 🎯 Botones colapsables con flechas animadas
  - 📱 Transiciones suaves max-height + opacity
  - 🎪 Cierre automático de otros desplegables
  - ✅ **ESTILO CORREGIDO**: "INICIO" ahora en mayúsculas y tamaño consistente
- ✅ **RESPONSIVE CORREGIDO**: Problemas de overflow eliminados
  - 📱 Títulos ajustados progresivamente (text-3xl → xl:text-7xl)
  - 🔒 Overflow horizontal prevenido con `overflow-x: hidden`
  - 📏 Word-wrap y break-word en títulos largos
  - ✅ **BOTÓN HAMBURGUESA**: Ya no se sale del viewport
- ✅ **JavaScript Mejorado**: Control de estados y animaciones
- ✅ **ERROR 404 CORREGIDO**: Eliminado `design-tokens.css` inexistente que causaba falla en menú
- ✅ **FOOTER DUPLICADO CORREGIDO**: Eliminados `<Footer />` redundantes de las 4 páginas de servicios
- ✅ **TÍTULOS CON PALABRAS AZULES**: Agregados spans con `text-blue-600` en títulos principales
  - "¿Por Qué Elegir Nuestro **Diseño Web**?" → Azul destacado
  - "Empresas de Morelos Que **Confían en Nosotros**" → Azul destacado
  - Aplicado en todas las 4 páginas de servicios
- ✅ **Build Exitoso**: 18 páginas compiladas correctamente
- ✅ **Servidor Activo**: http://localhost:4321/ para revisión

#### 🚀 **PRÓXIMOS PASOS SUGERIDOS**
1. **Contenido SEO**: Crear archivos .md específicos para cada servicio
2. **Optimización**: Implementar schema markup local
3. **Testing**: Probar las páginas en desarrollo
4. **Indexación**: Enviar URLs nuevas a Google Search Console

---

**🎉 ¡Proyecto de expansión SEO completamente implementado! El sistema modular permite agregar más servicios fácilmente en el futuro.**