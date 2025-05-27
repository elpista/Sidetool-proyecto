module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981', // Verde
        danger: '#EF4444', // Rojo
        dark: '#1F2937', // Gris oscuro
        light: '#F9FAFB' // Gris claro
      },
      borderColor: {
        primary: '#3B82F6', // Esto habilita border-primary
      }
    }
  },
  plugins: [],
}