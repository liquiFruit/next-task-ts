import { defineConfig, presetWind, presetWebFonts, presetIcons } from "unocss"

export default defineConfig({
    preflights: [
        {
            getCSS: ({ theme }) => `
            * {
              color: ${theme.colors?.white};
            }
          `
        }
    ],
    presets: [
        presetWind(),
        presetWebFonts({
            provider: "fontshare",
            fonts: {
                serif: "Satoshi",
            }
        }),
        presetIcons({
            cdn: 'https://esm.sh/'
        })
    ],
    theme: {
        colors: {
            "success": "rgb(52, 211, 153)",
            "warning": "#FFC567",
            "danger": "#FF8984",

            "primary": "#60C597",
            "secondary": "#ADD198",
            "white": "#EAFAFA",
            dark: {
                1: "#0E1118",
                2: "#161920",
                3: "#1C1F26",
            },
            light: {
                1: "#EAFAFA",
                2: "#AFB0B6"
            }
        },
    },
    shortcuts: [["rounded", "rounded-3xl"]]
})