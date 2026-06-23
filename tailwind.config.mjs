/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,jsx,tsx,html}'],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#07070d',
        'bg-card': 'rgba(255, 255, 255, 0.04)',
        'glass-border': 'rgba(255, 255, 255, 0.08)',
        'accent-cyan': 'hsl(var(--accent-h) var(--accent-s) var(--accent-l))',
        'accent-purple': 'hsl(var(--accent-secondary-h) var(--accent-secondary-s) var(--accent-secondary-l))',
        'accent': 'hsl(var(--accent-h) var(--accent-s) var(--accent-l))',
        'accent-secondary': 'hsl(var(--accent-secondary-h) var(--accent-secondary-s) var(--accent-secondary-l))',
        'text-primary': '#f0f0f5',
        'text-secondary': '#8888a0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        glass: '16px',
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, var(--accent), var(--accent-secondary))',
      },
      animation: {
        'gradient-sweep': 'gradient-sweep 8s ease infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'gradient-sweep': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
