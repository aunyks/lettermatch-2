import Head from 'next/head'
import Layout from '../../components/layout'

export default function CreatorsPage() {
  return (
    <>
      <Layout>
        <Head>
          <title>Creators - MEZCLA</title>
          <meta key="tw-title" name="twitter:title" content="Creators - MEZCLA" />
          <meta key="og-title" property="og:title" content="Creators - MEZCLA" />
          <meta key="og-url" property="og:url" content="https://mezcla.xyz/creators" />
        </Head>
        <div className="px-6 pt-12 pb-6 flex flex-col">
          <h1 className="tracking-tight font-bold text-5xl text-center">
            CREATORS
          </h1>
          <div className="lg:px-64 text-justify">
            <p className="my-4">
              We invite filter designers, AR/VR artists, and creatives of all types to use our items as canvases for creative expression.
            </p>
            <p className="my-4">
              Interested? Shoot us a message letting us know at <a className="underline" href="mailto:creators@mezcla.xyz">creators@mezcla.xyz</a> and we'll see if we can help out.
            </p>
          </div>
        </div>
      </Layout>
    </>
  )
}