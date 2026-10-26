import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      fontFamily: {
        body: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        headline: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        code: ["monospace"],
      },
      // Literal values (the same as the :root variables in globals.css, which never change: the site is
      // dark-only) so Tailwind can build real see-through fallbacks for /opacity utilities in browsers
      // without color-mix() (iOS Safari < 16.4). With var() it falls back to the solid colour.
      colors: {
        background: "hsl(150 20% 2%)",
        foreground: "hsl(150 11% 96%)",
        card: {
          DEFAULT: "hsl(150 13% 4%)",
          foreground: "hsl(150 11% 96%)",
        },
        popover: {
          DEFAULT: "hsl(150 12% 6%)",
          foreground: "hsl(150 11% 96%)",
        },
        primary: {
          DEFAULT: "hsl(150 100% 47%)",
          foreground: "hsl(0 0% 0%)",
        },
        secondary: {
          DEFAULT: "hsl(150 10% 7%)",
          foreground: "hsl(150 11% 96%)",
        },
        muted: {
          DEFAULT: "hsl(150 8% 8%)",
          foreground: "hsl(150 3% 68%)",
        },
        accent: {
          DEFAULT: "hsl(150 100% 56%)",
          foreground: "hsl(150 20% 2%)",
        },
        destructive: {
          DEFAULT: "hsl(0 62.8% 30.6%)",
          foreground: "hsl(0 0% 98%)",
        },
        border: "hsl(150 8% 18%)",
        input: "hsl(150 8% 18%)",
        ring: "hsl(150 100% 47%)",
        chart: {
          "1": "hsl(12 76% 61%)",
          "2": "hsl(173 58% 39%)",
          "3": "hsl(197 37% 24%)",
          "4": "hsl(43 74% 66%)",
          "5": "hsl(27 87% 67%)",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        scroll: {
          to: {
            transform: 'translate(calc(-50% - 0.5rem))',
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        scroll: 'scroll 40s linear infinite',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
