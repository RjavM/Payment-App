/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d8e9ff",
          200: "#b5d4ff",
          300: "#84b7ff",
          400: "#5192ff",
          500: "#2b6ef5",
          600: "#1f55d8",
          700: "#1b44af",
          800: "#1c3b8b",
          900: "#1b356f"
        },
        surface: {
          DEFAULT: "#f5f7fb",
          elevated: "#ffffff"
        }
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "system-ui", "sans-serif"],
        roboto: ["Roboto", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        card: "0 10px 40px rgba(15, 23, 42, 0.08)"
      },
      borderRadius: {
        xl: "1.25rem"
      }
    },
  },
  plugins: [],
}
