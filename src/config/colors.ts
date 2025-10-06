// src/config/colors.ts
// Configuración global de colores para todo el sitio

export const BRAND_COLORS = {
  // Colores principales de Tecnomata
  primary: {
    main: '#eab308', // yellow-500
    light: '#fbbf24', // yellow-400
    dark: '#a16207', // yellow-600
    contrast: '#000000'
  },
  
  // Colores de Google (para elementos específicos)
  google: {
    blue: '#4285F4',
    red: '#EA4335', 
    yellow: '#FBBC05',
    green: '#34A853'
  },
  
  // Estados y feedback
  success: {
    main: '#059669', // green-600
    light: '#34d399', // green-400
    bg: '#d1fae5' // green-100
  },
  
  warning: {
    main: '#d97706', // orange-600
    light: '#fb923c', // orange-400
    bg: '#fed7aa' // orange-100
  },
  
  error: {
    main: '#dc2626', // red-600
    light: '#f87171', // red-400
    bg: '#fecaca' // red-100
  },
  
  // Neutros
  neutral: {
    900: '#111827', // gray-900
    700: '#374151', // gray-700
    600: '#4b5563', // gray-600
    500: '#6b7280', // gray-500
    400: '#9ca3af', // gray-400
    300: '#d1d5db', // gray-300
    200: '#e5e7eb', // gray-200
    100: '#f3f4f6', // gray-100
    50: '#f9fafb'   // gray-50
  }
};

// Configuración de iconos por contexto
export const ICON_CONTEXTS = {
  // Iconos de características/beneficios
  feature: {
    color: 'primary' as const,
    variant: 'solid' as const,
    size: '2xl' as const
  },
  
  // Iconos en formularios
  form: {
    color: 'primary' as const, 
    variant: 'solid' as const,
    size: 'xl' as const
  },
  
  // Iconos en navegación
  nav: {
    color: 'neutral' as const,
    variant: 'solid' as const, 
    size: 'lg' as const
  },
  
  // Iconos en pricing/planes
  pricing: {
    color: 'primary' as const,
    variant: 'solid' as const,
    size: 'lg' as const
  }
};