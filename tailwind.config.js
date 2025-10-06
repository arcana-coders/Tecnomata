/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,mdx,md}",
    "./public/**/*.html"
  ],
  theme: {
        extend: {
      colors: {
        'google-blue': '#4285F4',
        'google-red': '#EA4335',
        'google-yellow': '#FBBC05',
        'google-green': '#34A853',
        'primary': {
          DEFAULT: 'var(--color-primary-main)',
          light: 'var(--color-primary-light)',
          dark: 'var(--color-primary-dark)',
        },
        'secondary': {
          DEFAULT: 'var(--color-secondary-main)',
          light: 'var(--color-secondary-light)',
          dark: 'var(--color-secondary-dark)',
        },
        'success': {
          DEFAULT: 'var(--color-success-main)',
          light: 'var(--color-success-light)',
          dark: 'var(--color-success-dark)',
        },
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'dmsans': ['DM Sans', 'sans-serif'],
      },
      fontSize: {
        'visinex-hero': ['4rem', { lineHeight: '0.95', letterSpacing: '-0.06em' }],
        'visinex-title': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.05em' }],
        'visinex-subtitle': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.03em' }],
      },
      fontWeight: {
        'extra-black': '900',
      },
    },
  },
  plugins: [],
};
