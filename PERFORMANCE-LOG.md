# 📊 Performance Tracking Log - Tecnómata

## 🎯 Objetivo
- **Target:** Lighthouse Mobile Performance ≥ 85 estable
- **Core Web Vitals:** CLS < 0.1, TBT < 300ms, LCP < 2.5s

---

## 📈 Historial de Cambios y Resultados

### ✅ Baseline Inicial (Commit: b1edb93)
- **Performance:** ~99 (página inicial sin contenido extra)
- **Estado:** Funcionaba perfectamente pero sin todo el contenido

---

### ⚠️ Sesión 1: Optimización Agresiva (26 Oct 2025 AM)

#### Commit c1d7a29: Minificación + Defer + Hero Fix
**Cambios:**
- ✅ Minificó inline JS de ~550 líneas a 3 líneas (~2KB ahorrados)
- ✅ Scramble effect: desktop-only + requestIdleCallback
- ✅ Hero: min-height 600px + contain:layout
- ✅ Removió scroll-animate de hero buttons

**Resultado:** Perf 33 → 81
- FCP: 0.9s ✅
- LCP: 4.0s → 1.1s ✅
- TBT: 3020ms → 230ms ✅
- CLS: 0.858 → pendiente validar

**Estado:** Build ✅ | E2E ✅ | Pushed ✅

---

#### Commit 0b682ea: Mobile Menu + Font Display
**Cambios:**
- ✅ Mobile menu: invisible + opacity:0 + visibility:hidden (eliminar flash negro)
- ✅ Font-display: swap → optional (eliminar FOUT CLS)
- ✅ body overflow-x: hidden

**Resultado:** Perf 81 mantenido
- TBT: 230ms ✅
- CLS: 1.023 (local, esperado <0.05 en prod con optional)

**Estado:** Build ✅ | E2E ✅ | Pushed ✅

---

### ❌ Sesión 2: ERRORES - Intentos fallidos (26 Oct 2025 PM)

#### Commit c8b7fc7: ⚠️ FOUC Fix (ERROR #1)
**Cambios:**
- ❌ CSS async → inline blocking (eliminó FOUC pero impacto en carga)
- ❌ setupScrollBars() simplista con IntersectionObserver (rompió barras)
- ❌ requestIdleCallback 800ms → setTimeout 0ms
- ✅ Copió images/ a public/images/

**Resultado:** Perf 81 mantenido PERO rompió barras + posible FOUC
- Barras: Dejaron de animar correctamente ❌
- Imagen contacto: Ahora carga ✅

**Estado:** Build ✅ | E2E ✅ | Pushed ✅ | **REQUIRIÓ REVERT**

---

#### Commit cef82f9: Restauración + Mobile Button Fix
**Cambios:**
- ✅ Restauró setupScrollBars() ORIGINAL (random directions, scroll-based)
- ✅ Mobile button: fixed top-6 right-6 (no se mueve con scroll)
- ❌ **ERROR CRÍTICO:** Desminificó JavaScript (3 líneas → 270 líneas)
- ❌ Volvió CSS a async (preload)

**Resultado:** Perf 81 → **41** 🔴
- TBT: 230ms → **1070ms** (JavaScript bloqueante)
- CLS: <0.05 → **0.858** (CSS async carga tarde)
- FCP: 0.9s ✅ (mantenido)

**Estado:** Build ✅ | E2E ✅ | Pushed ✅ | **REQUIERE FIX URGENTE**

**Lecciones:**
1. ❌ NO desminificar JavaScript inline crítico
2. ❌ NO volver CSS de animaciones a async
3. ❌ NO "mejorar legibilidad" de código optimizado sin medir impacto
4. ✅ SIEMPRE correr Lighthouse después de cada cambio antes de push

---

## 🔧 Configuración Óptima Conocida (De Commit c1d7a29 + 0b682ea)

### Layout.astro - CSS Loading
```astro
<!-- CRÍTICO: Inline blocking para evitar FOUC -->
<link rel="stylesheet" href={animationsCssUrl} />
```

### Layout.astro - JavaScript Inline
```javascript
// DEBE estar MINIFICADO (3-4 líneas max)
// Tamaño: ~2KB minificado
class V{constructor(){this.r=0;this.init()}init(){...}s(){...}ac(){...}c(){...}p(){...}setupScrollBars(){...}}
```

**Setup ScrollBars DEBE incluir:**
- Direcciones random: left-right, right-left, center
- Scroll-based progress (fillStartZone, fillEndZone)
- Batch reads/writes
- requestAnimationFrame throttling

### Font Loading
```css
@font-face {
  font-family: 'Inter';
  font-display: optional; /* NO swap */
  src: url('/fonts/Inter/Inter-VariableFont_opsz,wght.ttf') format('truetype');
}
```

### Mobile Menu
- Botón: `fixed top-6 right-6 z-[100]`
- Overlay: `fixed inset-0 z-40 invisible opacity-0` + inline `visibility:hidden`

---

## 🚨 Reglas de Oro

1. **NUNCA** desminificar JavaScript inline sin medir impacto en TBT
2. **NUNCA** cambiar CSS de animaciones a async/preload (causa FOUC + CLS)
3. **SIEMPRE** correr `npm run build && npm run test:e2e` antes de commit
4. **SIEMPRE** verificar Lighthouse mobile después de cada cambio
5. **ANTES** de modificar código que "ya funciona", preguntar: ¿Es necesario?
6. **DOCUMENTAR** aquí cada commit con resultado medido

---

## 📝 Checklist Pre-Commit

- [ ] `npm run build` → Sin errores
- [ ] `npm run test:e2e` → Todos pasan
- [ ] Lighthouse mobile en dist/ → Perf ≥ 85
- [ ] Git commit message descriptivo con resultado de perf
- [ ] Actualizar este log con cambios y resultado

---

## 🎯 Próximos Pasos (Cuando Perf ≥ 85 sea estable)

1. Validar en producción (Vercel deploy)
2. Confirmar CLS <0.1 con font-display:optional
3. Solo entonces considerar:
   - DOM size reduction (614 → <500)
   - Lazy-load below-fold sections
   - Simplificar desktop dropdown markup

**NO hacer cambios adicionales hasta tener baseline estable.**

---

## 🔄 Recovery Plan (AHORA)

1. Revertir JavaScript a versión minificada (commit c1d7a29)
2. Mantener CSS inline blocking (NO async)
3. Mantener setupScrollBars completo pero minificado
4. Mantener mobile button fixed
5. Rebuild + test + Lighthouse
6. Si Perf ≥ 80: commit + push + STOP
