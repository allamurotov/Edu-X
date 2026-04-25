/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ba8d5b",
        secondary: "#cda88a",
        background: "#f5f7fa",
        card: "#ffffff",
        textMain: "#333333",
        textMuted: "#757575",
        status: {
          red: "#ef4444",    
          blue: "#3b82f6",   
          yellow: "#eab308", 
          green: "#22c55e",  
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
