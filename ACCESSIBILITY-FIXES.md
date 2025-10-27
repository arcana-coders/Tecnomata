# 🎯 Accessibility Improvement Plan

**SWEET POINT ACTUAL:** v1.1-perf100-ux-fixed (Commit: 615a117)  
**Performance:** 100 🏆 | **Accessibility:** 86  
**Target:** Accessibility 90+ | Performance ≥ 95

---

## ⚠️ IMPORTANTE: Estado de los archivos en sweet point

**Footer.astro (v1.1-perf100-ux-fixed):**
- Subtítulos: `text-gray-500` (Ubicación, Contacto, Servicios)
- Contenido: `text-gray-600` (direcciones, teléfonos, links de servicios)

**SectionHeader.astro (v1.1-perf100-ux-fixed):**
- Subtitle: `text-gray-600` (tema light)

**Hero.astro (v1.1-perf100-ux-fixed):**
- Description: `text-gray-600`
- Stat labels: `text-gray-600 font-medium`

**⚠️ NO CAMBIAR ESTOS VALORES** - Cualquier cambio a gray-700/gray-800 **destruye Performance** (-21 puntos)

---

**Baseline anterior:** v1.0-perf99-baseline (Performance 99)  
**Target:** Accessibility 90+ | Performance ≥ 95

---

## 📊 Issues Identified (Lighthouse Chrome DevTools - 2025-10-26)

### 🔴 CONTRASTE (Prioridad: ALTA - Mayor impacto)
- **Problema:** Los colores de fondo y de primer plano no tienen una relación de contraste adecuada
- **Ejemplos vistos en reporte:**
  - ~40% en llamadas (probablemente CTAs o botones)
  - Top 1 en Google Maps: 20 nuevas reseñas
  - +30% en tráfico orgánico
  - Servicios + 30% en tráfico orgánico
  - Múltiples elementos con `text-gray-600`, `text-gray-800` sobre fondos claros
- **Impacto estimado:** -10 a -12 puntos (es el problema principal)
- **Riesgo:** Medio (cambios visuales, requiere aprobación)

### 🟡 TABLAS Y LISTAS (Prioridad: Media)
- **Problema:** "Las listas no contienen únicamente elementos `<li>` y elementos que admiten secuencias de comandos (`<script>` y `<template>`)"
- **Impacto estimado:** -1 a -2 puntos
- **Riesgo:** Bajo (HTML semántico)

### 🟡 NAVEGACIÓN / ORDEN DE ENCABEZADOS (Prioridad: Media)
- **Problema:** "Los elementos de encabezado no aparecen en orden secuencial descendente"
- **Nota:** NO es el Footer h1 (ya probado y falló)
- **Impacto estimado:** -1 a -2 puntos
- **Riesgo:** Bajo (HTML semántico)

---

## 📝 Log de Cambios

### ❌ Intento 2: Footer + SectionHeader + Hero - Cambiar contraste (FALLIDO - REVERTIDO)

**Fecha:** 2025-10-26 23:24  
**Commit:** cd50373 → b908ec7 → 81d2592 (revertido con force push a 615a117)  
**Hipótesis:** Mejorar contraste de texto gray-600 → gray-800 para subir Accessibility  

**Cambios aplicados en 2 fases:**

**Fase 1 - Footer (Cambio 1.1):**
```diff
Footer.astro:
- text-gray-500 (subtítulos)
+ text-gray-700 font-medium

- text-gray-600 (contenido)
+ text-gray-800
```

**Resultado Fase 1:** Accessibility **86** (sin cambio), Performance no medido inmediatamente

**Fase 2 - SectionHeader + Hero (Cambio 2):**
```diff
SectionHeader.astro (línea 27):
- text-gray-600
+ text-gray-800

Hero.astro (línea 80):
- text-gray-600
+ text-gray-800 font-medium

Hero.astro (línea 129):
- text-gray-600 font-medium
+ text-gray-800 font-semibold
```

**Resultados Lighthouse Mobile (Chrome DevTools) - Fase 1+2 combinadas:**
- Performance: **79** ❌ (bajó de 100, **-21 puntos CRÍTICO**)
- Accessibility: **86** ❌ (sin cambio, 0 mejora)
- FCP: 3.8s (degradado desde 1.5s, **+153%**)
- TBT: 0ms (OK)
- Speed Index: 3.8s (degradado desde 1.5s, **+153%**)
- CLS: 0.002 (OK)

**Conclusión CRÍTICA:**
- ❌ **Cambiar gray-600 → gray-800 DESTRUYE Performance** (-21 puntos)
- ❌ **FCP y Speed Index se DUPLICAN** (1.5s → 3.8s)
- ❌ **Accessibility NO mejora** (86 → 86, cero impacto)
- ⚠️ **Causa probable:** Cambios en componentes core usados en TODAS las páginas (SectionHeader/Hero)
- ⚠️ **Lighthouse no distingue** entre cambios en Footer solo vs Footer+SectionHeader+Hero
- ✅ Build exitoso pero métricas Production colapsaron

**Lecciones aprendidas:**
1. ⚠️ **NO cambiar colores en componentes globales** (SectionHeader, Hero, Footer)
2. ⚠️ **Los cambios CSS "simples" SÍ afectan Performance** cuando son masivos
3. ⚠️ **Accessibility no se arregla con cambios de color generales** en texto estático
4. 💡 **El problema de contraste NO es texto descriptivo** (gray-600 está bien)
5. 💡 **Buscar elementos INTERACTIVOS** con bajo contraste (botones, links, CTAs)

**Acción:** Revertido con `git reset --hard v1.1-perf100-ux-fixed` + `git push --force` + commit vacío para forzar redeploy

---

### ❌ Intento 1: Footer h1 → div[role=heading] (FALLIDO - REVERTIDO)

**Fecha:** 2025-10-26  
**Commit:** d592b0d (revertido a 6a17759)  
**Hipótesis:** Footer tiene h1 que rompe jerarquía de página  
**Cambio aplicado:**
```diff
- <h1 id="tecnomata-animation" class="...">
+ <div id="tecnomata-animation" role="heading" aria-level="2" class="...">
```

**Resultados Lighthouse Mobile (Chrome DevTools):**
- Performance: **88** ❌ (bajó de 99, -11 puntos)
- Accessibility: **86** ❌ (sin cambio, 0 mejora)
- FCP: 0,9s
- TBT: 80ms
- Speed Index: 1,1s
- CLS: 0,002

**Problemas detectados en reporte:**
1. "Redirección forzada" (94ms) - nuevo issue de performance
2. "Los elementos de encabezado no aparecen en orden secuencial descendente" - **persiste**
3. "Las listas no contienen únicamente elementos `<li>`" - detectado en reporte

**Conclusión:**
- ❌ Performance degradado significativamente (-11 puntos)
- ❌ Accessibility sin mejora (el Footer h1 NO era el problema)
- ✅ Build y E2E tests pasaron (pero métricas empeoraron)

**Lección aprendida:**
1. El Footer h1 NO es el problema de "orden de encabezados"
2. Cambiar h1→div con ARIA puede afectar performance negativamente
3. El problema de headings está en **páginas individuales**, no en el Footer
4. Necesitamos analizar jerarquía página por página

**Acción:** Revertido con `git reset --hard v1.0-perf99-baseline`

---

## 🔄 Nueva Estrategia (Post-Mortem)

### Insight del fallo:
El mensaje "Los elementos de encabezado no aparecen en orden secuencial descendente" **persiste** después de cambiar Footer h1→div. Esto confirma que:
- El problema NO está en el Footer
- Lighthouse está detectando saltos en páginas específicas (ej: h1 → h3 sin h2)
- Necesitamos analizar **cada página** individualmente

### Próximo enfoque (más conservador):

**Opción A: CONTRASTE primero (Mayor impacto)**
- Es el problema #1 según reporte visual
- ~10-12 puntos de mejora potencial
- Riesgo medio: cambios visuales
- Requiere aprobación para cada color

**Opción B: Analizar jerarquía página por página**
- Cargar cada página en Chrome DevTools
- Ver qué página específica genera el warning
- Corregir solo esa página
- Validar inmediatamente

**Opción C: Listas primero (Menor riesgo)**
- Buscar `<ul>/<ol>` con `<script>` o `<template>` como hijos
- Mover scripts fuera de listas
- Bajo riesgo, bajo impacto (~1-2 puntos)

---

## 🎯 Recomendación

**1. CONTRASTE es el camino crítico** (10-12 puntos potenciales)
   - Identificar elementos con bajo contraste
   - Proponer ajustes de color manteniendo brand
   - Aplicar a 1 componente, validar, repetir

**2. Si CONTRASTE requiere mucha aprobación, ir por LISTAS**
   - Rápido de implementar
   - Bajo riesgo
   - ~1-2 puntos de mejora

**3. HEADINGS solo si encontramos la página exacta con el problema**
   - Requiere análisis página por página
   - Riesgo bajo pero tiempo alto

---

## 🚨 Reglas de Oro (Aprendidas)

1. **NUNCA cambiar Footer sin validar impacto en performance**
2. **Lighthouse puede mentir**: Footer h1→div no resolvió "orden de encabezados"
3. **Build + E2E ≠ Lighthouse OK**: Las métricas pueden empeorar aunque tests pasen
4. **SIEMPRE tener tag de recovery**: v1.0-perf99-baseline salvó el día
5. **Un problema puede estar en OTRO lugar**: "orden de encabezados" NO era el Footer

---

## 🔄 Rollback Instructions (YA EJECUTADO)

```bash
# ✅ EJECUTADO: Volver al baseline
git reset --hard v1.0-perf99-baseline

# Confirmar estado
git log --oneline -5

# Rebuild si es necesario
npm run build && npm run test:e2e
```

**Estado actual:** De vuelta en Performance 99, Accessibility 86 (baseline seguro)
