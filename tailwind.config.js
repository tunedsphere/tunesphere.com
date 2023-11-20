/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    "./content/**/*.{md,mdx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
	],
  theme: {   
    maxWidth: {
      xxs: '13rem',
      xs: '20rem',
      sm: '24rem',
      md: '28rem',
      lg: '32rem',
      xl: '36rem',
      '2xl': '42rem',
      '3xl': '48rem',
      '4xl': '56rem',
      '5xl': '64rem',
      '6xl': '72rem',
      '7xl': '80rem',
      '8xl': '90rem',
      '9xl': '100rem',
      full: '100%'
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        'xs': {'max': '375px'},
        'sm': {'min': '640px', 'max': '767px'},
        'md': {'min': '768px', 'max': '1023px'},
        'lg': {'min': '1024px', 'max': '1279px'},
        'xl': {'min': '1280px', 'max': '1535px'},
        '2xl': {'min': '1536px'},
        '7xl': { 'min': '2880px' },
        '8xl': { 'min': '3456px' },
        '&xs': {'raw': '(min-width: 320px)'},
        '&sm': {'raw': '(min-width: 384px)'},
        '&md': {'raw': '(min-width: 448px)'},
        '&lg': {'raw': '(min-width: 512px)'},
        '&xl': {'raw': '(min-width: 576px)'},
        '&2xl': {'raw': '(min-width: 672px)'},
      }
    },
    extend: {
      maxWidth: {
        '2xs': '16rem',
        '8xl': '90rem',
    },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      spacing: {
        sidebar: '240px',
        headerHeight: '380px',
        sidebarDashboardWidth: 'var(--sidebar-dashboard-width)',
      },
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
        '20000': '20000',
      },
      colors: {
        theme: {
          DEFAULT: "hsl(var(--primary))",
          50: "hsl(var(--theme-50))",
          100: "hsl(var(--theme-100))",
          200: "hsl(var(--theme-200))",
          300: "hsl(var(--theme-300))",
          400: "hsl(var(--theme-400))",
          500: "hsl(var(--theme-500))",
          600: "hsl(var(--theme-600))",
          700: "hsl(var(--theme-700))",
          800: "hsl(var(--theme-800))",
          900: "hsl(var(--theme-900))",
          950: "hsl(var(--theme-950))",
        },
        background: {
          DEFAULT: "hsl(var(--background))",
          index: "hsl(var(--background-index))",
          globalnav: "hsl(var(--background-globalnav))",
          navbarbottom: "hsl(var(--background-navbarbottom))",
          navbartop: "hsl(var(--background-navbartop))",
          footer: "hsl(var(--background-footer))",
          shop: "hsl(var(--background-shop))",
          shopHeader: "hsl(var(--background-shop-header))",
          dashboard: "hsl(var(--background-dashboard))",
          shopNavLink: "hsl(var(--background-shop-navlink))",
        },
        brand: "hsl(var(--brand))",
        texthigh: "hsl(var(--texthigh))",
        textlow: "hsl(var(--textlow))",
        indexhigh: "hsl(var(--indexhigh))",
        indexlow: "hsl(var(--indexlow))",
        textdark: "hsl(var(--textdark))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
        backgroundGradient: "hsl(var(--background-gradient))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          index: "hsl(var(--primary-index))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          index: "hsl(var(--secondary-index))",
          hero: "hsl(var(--secondary-hero))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          index: "hsl(var(--destructive-index))",
          foreground: "hsl(var(--destructive-foreground))",
          hover: "hsl(var(--destructive-hover))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          index: "hsl(var(--muted-index))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          9: "hsl(var(--accent-9))",
          8: "hsl(var(--accent-8))",
          7: "hsl(var(--accent-7))",
          6: "hsl(var(--accent-6))",
          5: "hsl(var(--accent-5))",
          4: "hsl(var(--accent-4))",
          3: "hsl(var(--accent-3))",
          2: "hsl(var(--accent-2))",
          1: "hsl(var(--accent-1))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          index: "hsl(var(--popover-index))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      boxShadow: {
        'avatar': "inset 0 10px 10px 10px",
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
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        translateXReset: {
          '100%': {
            transform: 'translateX(0)',
          },
        },
        fadeToTransparent: {
          '0%': {
            opacity: '1',
          },
          '40%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
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