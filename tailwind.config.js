/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB', // Rich blue for primary actions
        secondary: '#6B7280', // Neutral gray for secondary elements
        accent: '#10B981', // Success green for positive indicators
        warning: '#F59E0B', // Amber for warnings/alerts
        error: '#EF4444', // Red for critical notifications
        background: {
          light: '#F9FAFB',
          dark: '#111827'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'heading1': '2.25rem', // 36px
        'heading2': '1.875rem', // 30px
        'heading3': '1.5rem', // 24px
        'body': '1rem', // 16px
        'small': '0.875rem' // 14px
      },
      spacing: {
        'xs': '0.25rem', // 4px
        'sm': '0.5rem', // 8px
        'md': '1rem', // 16px
        'lg': '1.5rem', // 24px
        'xl': '2rem' // 32px
      },
      borderRadius: {
        'sm': '0.25rem', // 4px
        'md': '0.375rem', // 6px 
        'lg': '0.5rem', // 8px
        'full': '9999px'
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
}
