const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./views/**/*.njk"],
	theme: {
		container: {
			center: true
		}
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			"light",
			{
				mytheme: {
					"primary": "#A77100",
					"secondary": "#CFD15B",
					"accent": "#914540",
					"neutral": "#2a323c",
					"base-100": "#fff",
					"info": "#3abff8",
					"success": "#36d399",
					"warning": "#fbbd23",
					"error": "#f87272",
				},
			}
		],
	}
};