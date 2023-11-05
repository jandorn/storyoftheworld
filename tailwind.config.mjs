/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'primary': '#F9F4DA',
				'secondary': '#F38BA3',
				'accent': '#ED203D',
				'background': '#0F0D0E',
				'background-accent': '#241F20',
				'mypink': '#ED879F',
			}
		},
		fontFamily: {
			'mono': ['Space Mono', 'sans-serif'],
		},
	},
	plugins: [],
}
