import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "muted-dark": "#102A29",
        "muted-light": "#103937",
        "primary": "#00804B",
        "secondary": "#ADD198",
        "white": "#EAFAFA"
      }
    },
  },
  plugins: [],
} satisfies Config;
