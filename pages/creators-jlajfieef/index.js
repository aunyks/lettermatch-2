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
        <div className="p-6 flex flex-col">
          <h1 className="tracking-tight font-bold text-5xl text-center">
            CREATORS
          </h1>
          <div className="lg:px-64 text-justify">
            <p className="my-4">
              We invite filter designers, mixed reality artists, and creatives of all types to use each of our items as your own canvas for creative expression.
            </p>
            <p className="my-4">
              Use our Alpha Collection filter template to get started making your own filter. Never made an Instagram filter before? Check out our Get Started Guide to make your first one!
            </p>
            <p className="my-4">
              Any questions? DM us @mezclaxyz.
            </p>
          </div>
        </div>
      </Layout>
    </>
  )
}