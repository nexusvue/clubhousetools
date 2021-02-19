const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')
const withImages = require('next-images')

module.exports = withPlugins([
	[
		withPWA,
		{
			pwa: {
				disable: process.env.NODE_ENV === 'development'
			}
		}
	],
	[
		withImages,
		{

		}
	]
])
