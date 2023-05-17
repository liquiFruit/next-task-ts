import { defineConfig, presetWind, presetWebFonts, presetIcons } from "unocss"

const iconMap = new Map<string, string>([
    ["add", "i-solar-add-square-line-duotone"],
    ["time", "i-solar-alarm-line-duotone"],
    ["archive-complete", "i-solar-archive-check-line-duotone"],
    ["archive", "i-solar-archive-line-duotone"],
    ["check", "i-solar-check-square-line-duotone"],
    ["clipboard-remove", "i-solar-clipboard-remove-line-duotone"],
    ["pen", "i-solar-pen-new-square-line-duotone"],
    ["pie-chart", "i-solar-pie-chart-line-duotone"],
])



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
    shortcuts: [
        ["rounded", "rounded-3xl"],
        ["bounceTransition", "transition-all ease-[cubic-bezier(.30,-0.35,.85,1.70)]"],
        ["iconBase", "bounceTransition hover:scale-120 cursor-pointer"],


        [/^button-([a-z]+)$/, ([, color]) => {
            return `hover:bg-${color}/5 text-${color} rounded-full px-6 py-1.5 text-sm w-fit cursor-pointer transition duration-350 hover:animate-pulse hover:animate-delay-1000`
        }],
        [/^icon-([a-z]+)$/, ([, data]) => "iconBase " + iconMap.get(data!)]
    ],

    rules: [
        // [/^bg-radial-(\w+)/, ([, w], { rawSelector, currentSelector, theme, variants }) => {
        //     if (!w) return ""

        //     return `` +
        //     `${/\bhover:/.test(rawSelector) ? '.hover\\:' : '.'}` +
        //     `${currentSelector}${/\bhover:/.test(rawSelector) ? ':hover' : ''}` +
        //     `{ background: radial-gradient(ellipse at center, rgba(0,0,0,0) 30%, ${theme.colors[w]}10);}`
        // }]
    ]
})