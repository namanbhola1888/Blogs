/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#FDFBF7',
          100: '#FAF7F2',
          200: '#F4EFE6',
          300: '#EAE2D5',
          400: '#D6CBB8',
          500: '#B8A68F',
          600: '#8C7A63',
          700: '#635544',
          800: '#3D3429',
          900: '#1F1A14',
        },
        obsidian: {
          50: '#F4F3F1',
          100: '#E4E2DC',
          200: '#C5C1B6',
          300: '#9E988A',
          400: '#6E685C',
          500: '#48433A',
          600: '#2E2B25',
          700: '#24211D',
          800: '#1C1A17',
          900: '#141311',
          950: '#0E0D0C',
        },
        editorial: {
          terracotta: {
            DEFAULT: '#9E472A',
            dark: '#D47A57',
            light: '#F8EFEA',
          },
          olive: {
            DEFAULT: '#365347',
            dark: '#6E9484',
            light: '#EBF1EE',
          },
          ochre: {
            DEFAULT: '#A6732E',
            dark: '#D4A359',
            light: '#FBF5EB',
          },
        },
      },
      fontFamily: {
        serif: ['Newsreader', 'Lora', 'Georgia', 'serif'],
        display: ['Newsreader', 'Playfair Display', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: '68ch',
            color: '#1F1D1A',
            lineHeight: '1.8',
            fontSize: '1.125rem',
            p: {
              marginTop: '1.5em',
              marginBottom: '1.5em',
            },
            h1: {
              fontFamily: theme('fontFamily.serif').join(','),
              fontWeight: '600',
              letterSpacing: '-0.02em',
              color: '#1F1D1A',
            },
            h2: {
              fontFamily: theme('fontFamily.serif').join(','),
              fontWeight: '600',
              letterSpacing: '-0.015em',
              marginTop: '2em',
              marginBottom: '0.8em',
              color: '#1F1D1A',
            },
            h3: {
              fontFamily: theme('fontFamily.serif').join(','),
              fontWeight: '500',
              marginTop: '1.6em',
              marginBottom: '0.6em',
              color: '#1F1D1A',
            },
            blockquote: {
              fontFamily: theme('fontFamily.serif').join(','),
              fontStyle: 'italic',
              fontWeight: '400',
              borderLeftColor: '#9E472A',
              borderLeftWidth: '2px',
              paddingLeft: '1.5em',
              color: '#3D3429',
            },
            code: {
              fontFamily: theme('fontFamily.mono').join(','),
              fontWeight: '400',
              fontSize: '0.875em',
              backgroundColor: '#F3EFEA',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
            },
          },
        },
        invert: {
          css: {
            color: '#EDE8E1',
            p: {
              color: '#DDD6CD',
            },
            h1: {
              color: '#EDE8E1',
            },
            h2: {
              color: '#EDE8E1',
            },
            h3: {
              color: '#EDE8E1',
            },
            blockquote: {
              borderLeftColor: '#D47A57',
              color: '#E0D8CE',
            },
            code: {
              backgroundColor: '#24211D',
              color: '#EDE8E1',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
