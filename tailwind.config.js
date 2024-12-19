/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
    './node_modules/flowbite/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
          light: '#ffffff', // For light mode (default)
          dark: '#111827', // Equivalent to bg-gray-900
      },
      scrollBehavior : ['smooth']
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
