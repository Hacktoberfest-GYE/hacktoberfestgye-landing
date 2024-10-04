/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
        sans: ['Inter Variable', ...defaultTheme.fontFamily.sans],
      },
			colors: {
				body: "#f7fafc",
				primary: "#d1ff19",
				secondary: "#15171a",
				"secondary-blue": "#1f2937",
				"muted": "#94a3b8",
			},
			backgroundImage: {
        'radial-gradient': 'radial-gradient(circle 500px at 50% 200px, rgba(209, 255, 25, 0.18), transparent)',
      },
			typography: {
        DEFAULT: {
          css: {
            maxWidth: '100ch',
          }
        }
			},
			container: {
				screens: {
					'2xl': '1300px',
				},
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
