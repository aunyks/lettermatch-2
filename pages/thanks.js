import Head from 'next/head'
import Layout from 'components/layout'
import Twitter from 'components/tw'
import Instagram from 'components/ig'

export default function ThanksPage() {
  return (
    <>
      <Layout>
        <Head>
          <title>Thank You - MEZCLA</title>
        </Head>
        <div className="px-6 pt-8 flex flex-col">
          <h1 className="tracking-tight font-bold text-5xl lg:text-center">
            Thanks!
          </h1>
          <div className="my-3 lg:px-64">
            <p className="my-4">
              We appreciate your order! You'll receive an email with your receipt very soon. In the meantime, follow us on Instagram and Twitter @mezclaxyz. Tag us or use hashtag <span className="font-bold">#BeyondReality</span> to be featured on our social media.
            </p>
            <p>
              Ordered some clothing? Learn <a className="underline" href="/how-to-wear">how to wear</a> your items for pics and filters.
            </p>
            <div className="flex flex-col mt-5">
              <div className="flex flex-row justify-start">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://instagram.com/mezclaxyz"
                  className="mr-3 font-bold"
                  style={{ paddingTop: '10px' }}
                >

                  <Instagram width="45" />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com/mezclaxyz"
                  className="mx-3 font-bold"
                >
                  <Twitter width="67" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
