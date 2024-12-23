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
      boxShadow: {
        'custom-light': '0 0 0 30px rgba(234, 121, 0, 0.6), 0 0 0 2000px rgba(0,0,0,0.5)',
        'printer': '0 0.25rem 0.25rem #585e6e inset',
        'dark-printer': '0 0.25rem 0.25rem #25282f inset',
      },
      blur: {
        '50': '50px',
      },
      translate: {
        '15vw': '15vw',
        '-50vw': '-50vw',
      },
      rotate: {
        '45': '45deg',
      },
      dropShadow: {
        sm: '0px 0.1px 0.1px #001E00',
        accent: '0px 0.8px 0.5px #8ef805',

      },
    },
  },
  plugins: [],
} satisfies Config;
