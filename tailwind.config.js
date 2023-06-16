/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
   './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
	],
  theme: {   

    container: {
      center: true,
      padding: "2rem",
      screens: {
        's': {'max': '375px'},
        'sm': {'min': '640px', 'max': '767px'},
        'md': {'min': '768px', 'max': '1023px'},
        'lg': {'min': '1024px', 'max': '1279px'},
        'xl': {'min': '1280px', 'max': '1535px'},
        '2xl': {'min': '1536px'},
        '&xs': { 'raw': '(min-width: 320px)' },
        '&sm': { 'raw': '(min-width: 384px)' },
        '&md': { 'raw': '(min-width: 448px)' },
        '&lg': { 'raw': '(min-width: 512px)' },
        '&xl': { 'raw': '(min-width: 576px)' },
        '&2xl': { 'raw': '(min-width: 672px)' },
      }
    },
    extend: {
      zIndex: {
        '100': '100',
        '200': '200',
        '300': '300',
        '400': '400',
        '500': '500',
        '600': '600',
        '700': '700',
        '800': '800',
        '900': '900',
        '9999': '9999',
        '10000': '10000',
      },
      colors: {
        brand: "var(--brand)",
        texthigh: "var(--texthigh)",
        textlow: "var(--textlow)",
        thcolor: "var(---thcolor)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        colortheme: "var(--colortheme)",
        colortheme2: "var(--colortheme2)",
        orange: "var(--orange)",
        backgroundgradient: "var(--backgroundgradient)",
        purple1: "var(--purple1)",
        purple2: "var(--purple2)",
        purple3: "var(--purple3)",
        purple4: "var(--purple4)",
        purple5: "var(--purple5)",
        purple6: "var(--purple6)",
        purple7: "var(--purple7)",
        purple8: "var(--purple8)",
        purple9: "var(--purple9)",
        purple10: "var(--purple10)",
        purple11: "var(--purple11)",
        purple12: "var(--purple12)",
        accent7: "var(--accent7)",
        accent6: "var(--accent6)",
        accent5: "var(--accent5)",
        accent4: "var(--accent4)",
        accent3: "var(--accent3)",
        accent2: "var(--accent2)",
        accent1:  "var(--accent1)",
        accent0:  "var(--accent0)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    // ...
    require('tailwindcss-animate'),
    // ...
  ],
  // ...
}