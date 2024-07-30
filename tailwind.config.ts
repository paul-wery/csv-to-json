import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        border: "hsl(var(--border))",
        borderPrimary: "hsl(var(--border-primary))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        dark: {
          ...colors.slate,
          DEFAULT: colors.slate[950],
          foreground: colors.slate[100],
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          ...colors.blue,
          "200": "hsl(var(--primary-200))",
          "300": "hsl(var(--primary-300))",
          light: "hsl(var(--primary-light))",
        },
        primary2: {
          DEFAULT: "hsl(var(--primary2))",
          foreground: "hsl(var(--primary-foreground))",
          ...colors.slate,
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
        green: {
          DEFAULT: "hsl(var(--green))",
          foreground: "hsl(var(--primary-foreground))",
          ...colors.green,
        },
        red: {
          DEFAULT: "hsl(var(--red))",
          foreground: "hsl(var(--primary-foreground))",
          ...colors.red,
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      padding: {
        container: "var(--container-padding)",
      },
      boxShadow: {
        card: "0px 4px 6px 0px rgba(0, 0, 0, 0.10), 0px -1px 4px 0px rgba(0, 0, 0, 0.05)",
      },
      height: {
        page: "calc(100vh - 5rem)",
      },
      maxHeight: {
        page: "calc(100vh - 8rem)",
      },

      transitionProperty: {
        height: "height",
      },
    },
  },
  plugins: [],
};
export default config;
