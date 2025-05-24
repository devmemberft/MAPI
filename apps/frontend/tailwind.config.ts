/** @type {import('tailwindcss').Config} */
export default {
  darkMode:'class',

  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/app/*.{js,ts,jsx,tsx}',
    './src/app/pages/**/*.{js,ts,jsx,tsx}',
    './src/app/components/**/*.{js,ts,jsx,tsx}',
    './src/app/features/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
      },
    },
  },
  plugins: [],
}
