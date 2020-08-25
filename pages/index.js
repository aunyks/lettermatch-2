import Container from 'components/container'
import Layout from 'components/layout'

export default () => {
  return (
    <>
      <Layout>
        <section style={{ height: `90vh` }} className="px-6 pb-0 lg:pb-4 flex flex-col lg:flex-row">
          <div className="lg:w-3/4 flex flex-col justify-center pt-4 lg:pt-0">
            <h1 id="hero-main-text" className="text-4xl lg:text-6xl font-medium leading-tight underline">
              Create higher impact ads with newsletters
            </h1>
            <h2 className="leading-snug lg:leading-normal text-2xl lg:text-4xl lg:w-full">
              Get closer to your audience with LetterMatch
            </h2>
            <div className="mt-3 flex flex-col lg:flex-row">
              <a href="/shop" className="mb-1 lg:mb-0 lg:mr-2  secondary-btn inline-block text-xl lg:text-3xl px-4 py-2 leading-none rounded mt-0">
                Learn more
              </a>
              <a href="/shop" className="mt-1 lg:mt-0 lg:ml-2  primary-btn inline-block text-xl lg:text-3xl px-4 py-2 leading-none rounded mt-0">
                Give me early access
              </a>
            </div>
          </div>
        </section>
        <section className="px-6 lg:px-0 py-16 bg-black text-white">
          <h3 className="text-2xl lg:text-3xl font-bold text-center mb-4">Extend Your Reality</h3>
          <p className="text-center text-lg lg:w-1/2 lg:mx-auto lg:text-justify lg:text-2xl">
            Discover a new era of expressive and sustainable apparel. We design products that provide explosive personality while minimizing manufacturing waste. Each of our products is brought to life using <a href="/filters" className="underline">social media filters</a>.
          </p>
        </section>
      </Layout>
    </>
  )
}