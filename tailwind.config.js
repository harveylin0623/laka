/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      'sm': '600px',
      'md': '600px',
      'lg': '600px',
      'xl': '600px',
      '2xl': '600px',
    },
    container: {
      center: true,
      padding: '10px',
    },
    extend: {
      colors: {
        base: '#f0f0f0',
        'page-name': '#4A4A4A',
        'primary-1': '#797979',
        'primary-2': '#C9C9C9',
        'primary-3': '#292929',
        'primary-4': '#8B169C',
        'primary-5': '#007AFF'
      },
      fontSize: {
        basic: '15px'
      },
      borderRadius: {
        five: '5px'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'base',
    }),
  ],
}
