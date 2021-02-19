module.exports = {
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
		fontFamily: {
			'sans': ['Nunito', 'Roboto', 'sans-serif'],
			'body': ['Nunito'],
		},
    extend: {
			colors: {
				'bg': '#F1EFE5',
				'primary': '#25AE60',
				'secondary': '#C96367',
			}
		},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
