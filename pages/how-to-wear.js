import Head from 'next/head'
import Layout from 'components/layout'

export default function AboutPage() {
  return (
    <>
      <Layout>
        <Head>
          <title>How to Wear - MEZCLA</title>
          <meta key="tw-title" name="twitter:title" content="How to Wear - MEZCLA" />
          <meta key="og-title" property="og:title" content="How to Wear - MEZCLA" />
          <meta key="og-url" property="og:url" content="https://mezcla.xyz/how-to-wear" />
        </Head>
        <div className="pb-6 flex flex-col">
          <h1 className="tracking-tight font-bold text-3xl lg:text-5xl text-center">
            How To Show Off Your MEZCLA
          </h1>
          <div className="mb-6 px-4 lg:px-64">
            <p className="my-4 text-justify">
              Something like MEZCLA apparel is a completely new thing, so it may be a bit confusing to get the most out of your items. Here are some quick tips on how to
              wear your MEZCLA depending on the situation. Remember to use the hashtag <strong>#BeyondReality</strong> in your social media posts for a chance to be featured on our page.
            </p>
            <section className="text-left mb-2">
              <img className="h-64 lg:h-auto mx-auto" src="/assets/img/standing-tee.jpg" />
              <h2 className="font-bold text-3xl">For the pics</h2>
              <p>
                If you're taking normal pictures in MEZCLA apparel, feel free to style how you want. At the end of the day our clothing is still clothing, and you have 100% of the freedom to express yourself as you please.
              </p>
            </section>
            <section className="text-left mb-2">
              <img className="h-64 lg:h-auto mx-auto" src="/assets/img/showoff-tee.jpg" />
              <h2 className="font-bold text-3xl">For the filters</h2>
              <p>
                If you're looking to take your pictures to the next level with our <a className="underline" href="/filters">social media filters</a>, pinch your shirt at the top corners of your chest and hold it up.
                This ensures that the design is flat for the camera to get the best quality out of the filter. Make sure the camera is pointing straight at the design for best results. And don't be afraid to get close to the camera to make sure the design is clear and in frame.
              </p>
            </section>
          </div>
        </div>
      </Layout>
    </>
  )
}
