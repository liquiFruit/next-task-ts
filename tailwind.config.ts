import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "muted-dark": "#102A29",
        "muted-light": "#103937",
        "primary": "#99DABB",
        "secondary": "#ADD198",
        "white": "#EAFAFA",
        dark: {
          1: "#0E1118",
          2: "#161920",
          3: "#1C1F26",
        },
        light: {
          1: "white",
          2: "#AFB0B6"
        }
      },
      
    },
  },
  plugins: [],
} satisfies Config;
