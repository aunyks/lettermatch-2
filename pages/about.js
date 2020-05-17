import Head from 'next/head'
import Layout from '../components/layout'

export default function AboutPage() {
  return (
    <>
      <Layout>
        <Head>
          <title>About - MEZCLA</title>
          <meta key="tw-title" name="twitter:title" content="About - MEZCLA" />
          <meta key="og-title" property="og:title" content="About - MEZCLA" />
          <meta key="og-url" property="og:url" content="https://mezcla.xyz/about" />
        </Head>
        <div className="p-6 flex flex-col">
          <h1 className="tracking-tight font-bold text-5xl text-center">
            BEYOND REALITY.
          </h1>
          <div className="my-3 lg:my-5 lg:px-64 text-justify">
            <p className="my-4">
              MEZCLA is a brand that exists beyond reality. Born out of frustration with the limitations of the physical world, it expands the boundaries of creative expression by fusing the physical and virtual worlds.
            </p>
            <p className="my-4">
              We take the sustainable approach to apparel, as each of our items has not only physical designs but also accompanying <a className="underline" href="/filters">social media filters</a> that bring the items to life. Our approach helps us aggressively reduce waste since customers don't need to constantly purchase new items to get new designs.
            </p>
            <p className="my-4">
              Join the movement. Expand your reality.
            </p>
          </div>
        </div>
      </Layout>
    </>
  )
}
