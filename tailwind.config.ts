import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        'post-card': '2px 4px 12px rgba(0, 0, 0, 0.0784)'
      },
      borderRadius: {
        'post-card': '18px'
      },
    },
  },
  plugins: [],
} satisfies Config;
