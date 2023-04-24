import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "muted-dark": "#102A29",
        "muted-light": "#103937",
        "primary": "#47FFB3",
        "secondary": "#ADD198",
        "white": "#EAFAFA"
      }
    },
  },
  plugins: [],
} satisfies Config;
