import Head from 'next/head'
import { NextSeo } from 'next-seo'
import ImagePicker from '../components/ImagePicker'
import Feedback from '../components/Feedback'

export default function Home() {
  return (
      <div className="bg-bg flex flex-col justify-between items-center min-h-screen">
        <Head>
          <title>Clubhouse tools</title>
          <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛠</text></svg>"/>
        </Head>
				<NextSeo
					title="Clubhouse Tools"
					description="Change your Clubhouse status with a badge in your image profile"
					canonical="https://clubhousetools.app/"
					openGraph={{
						title: '🛠 Clubhouse Tools',
						description: 'Change your Clubhouse status with a picture!',
						images: [
							{
								url: 'https://clubhousetools.app/open-graph-image.jpg',
								width: 800,
								height: 600,
								alt: 'Featured image of Clubhouse Tools',
							}
						],
					}}
				/>

        <h1 className="p-4 text-4xl font-bold text-gray-800">🛠 Clubhouse tools</h1>
        <article className="flex flex-col flex-grow mt-8 items-center">
          <h2 className="text-center text-2xl font-extrabold text-gray-800">Change your status</h2>
          <p className="text-gray-600 pb-5">Update your profile picture with a status badge</p>
          <ImagePicker className="p-4"/>
        </article>
        <footer className="p-4 text-sm text-gray-600 flex justify-between items-end w-full">
					<div></div>
					<div>
						Made with <span>❤️</span> by <a className="pointer-cursor font-semibold text-gray-700" href="https://twitter.com/g_perales" target="_blank">Gabriel Perales</a>
					</div>
					<Feedback />
				</footer>
      </div>
  )
}
