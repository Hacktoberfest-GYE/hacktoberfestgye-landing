/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				body: "#f7fafc",
				primary: "#d1ff19",
				secondary: "#15171a",
				"secondary-blue": "#1f2937",
				"muted": "#94a3b8",
			}
		},
	},
	plugins: [],
}
