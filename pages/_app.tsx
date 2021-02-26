import 'tailwindcss/tailwind.css'
import { DefaultSeo } from 'next-seo'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
		<>
			<DefaultSeo
				openGraph={{
					type: 'website',
					locale: 'en_EN',
					url: 'https://clubhousetools.app/',
					site_name: 'Clubhouse Tools',
				}}
				twitter={{
					handle: '@g_perales',
					cardType: 'summary_large_image',
				}}
			/>
			<Component {...pageProps} />
		</>
	)
}

export default MyApp
