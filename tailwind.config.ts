import type { Config } from "tailwindcss";

export default {
  darkMode: ['class'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      s: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: '#8ef805',
      },
      dropShadow: {
        sm: '0px 0.1px 0.1px #001E00',
        accent: '0px 0.8px 0.5px #8ef805',
      },
    },
  },
  plugins: [],
} satisfies Config;
