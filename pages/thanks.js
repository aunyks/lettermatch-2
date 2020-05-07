import Head from 'next/head'
import Layout from '../components/layout'

export default function ThanksPage() {
  return (
    <>
      <Layout>
        <Head>
          <title>Thank You - MEZCLA</title>
        </Head>
        <div className="p-6 flex flex-col">
          <h1 className="tracking-tight font-bold text-5xl lg:text-center">
            Thanks!
          </h1>
          <div className="my-3 lg:my-5 lg:px-64 lg:text-justify">
            <p className="my-4">
              We appreciate your order! You'll receive an email with your receipt very soon.
            </p>
          </div>
        </div>
      </Layout>
    </>
  )
}
