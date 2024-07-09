import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        "dm-sans": ["var(--font-dm-sans)"],
      },
      fontSize: {
        h1: ["var(--font-size-h1)", { lineHeight: "var(--line-height-h1)" }],
        "body-large": [
          "var(--font-size-body-large)",
          { lineHeight: "var(--line-height-body-large)" },
        ],
        h2: ["var(--font-size-h2)", { lineHeight: "var(--line-height-h2)" }],
        "body-small-tag": [
          "var(--font-size-body-small-tag)",
          { lineHeight: "auto" },
        ],
        h5: ["var(--font-size-h5)", { lineHeight: "auto" }],
        "body-medium": [
          "var(--font-size-body-medium)",
          { lineHeight: "var(--line-height-body-medium)" },
        ],
        "body-s": ["var(--font-size-body-s)", { lineHeight: "auto" }],
        h4: ["var(--font-size-h4)", { lineHeight: "var(--line-height-h4)" }],
        "body-bold": ["var(--font-size-body-bold)", { lineHeight: "auto" }],
        "body-s-bold": ["var(--font-size-body-s-bold)", { lineHeight: "auto" }],
        tag: ["var(--font-size-tag)", { lineHeight: "var(--line-height-tag)" }],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
