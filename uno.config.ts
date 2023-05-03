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
    shortcuts: [["rounded", "rounded-3xl"]]
})