import Container from 'components/container'
import Layout from 'components/layout'

export default () => {
  return (
    <>
      <Layout>
        <style jsx>{`
          #primary-hero {
            height: 75vh;
          }

          @media only screen and (max-width: 640px) {
            #primary-hero {
              height: 100vh;
            }
          }
        `}</style>
        <section id="primary-hero" className="px-6 lg:px-16 pb-4 flex flex-col lg:flex-row">
          <div className="lg:w-3/4 flex flex-col justify-center pt-2 lg:pt-0">
            <h1 id="hero-main-text" className="text-4xl lg:text-6xl font-medium leading-tight underline">
              Create higher impact ads with newsletters
            </h1>
            <h2 className="leading-snug lg:leading-normal text-2xl lg:text-4xl lg:w-full">
              Get closer to your audience with LetterMatch
            </h2>
            <div className="mt-3 flex flex-col lg:flex-row">
              <a href="/signup" className="mb-1 lg:mb-0 lg:mr-2  secondary-btn inline-block text-xl lg:text-3xl px-4 py-2 leading-none rounded mt-0">
                Sign up now
              </a>
            </div>
          </div>
        </section>
        <section style={{ background: '#ff4433' }} className="px-6 lg:px-16 py-8 text-white">
          <h3 className="text-4xl font-black">How does it work?</h3>
          <div className="flex flex-col lg:flex-row justify-around lg:justify-between">
            <div>
              <h4 className="text-3xl leading-snug">For Newsletter Owners</h4>
              <p className="text-lg lg:text-2xl mb-4 lg:mb-0 lg:mr-4">
                Register your newsletters on LetterMatch, tell us about your audience, and we'll let you know when someone wants to advertise in your newsletter.
              </p>
            </div>
            <div>
              <h4 className="text-3xl leading-snug">For Advertisers</h4>
              <p className="text-lg lg:text-2xl">
                Create high-impact marketing campaigns by selecting newsletters based on your target audience. Set budgets for each campaign, and we'll only charge you when your ad makes an impression!
              </p>
            </div>
          </div>
        </section>
        <section className="px-6 lg:px-16 py-8">
          <h3 className="text-4xl font-black">Common Questions</h3>
          <div>
            <h4 className="text-3xl">When will advertisers be charged?</h4>
            <p className="text-lg lg:text-2xl w-3/4">
              Advertisers pay a monthly subscription fee for access to our curated database of newsletters spanning across several niches.
            </p>
          </div>
          <div>
            <h4 className="text-3xl">What is the cost per ad?</h4>
            <p className="text-lg lg:text-2xl w-3/4">
              Pricing for ad space in a newsletter is determined by the newsletter owner and differs on a case-by-case basis.
            </p>
          </div>
          <a href="/signup" className="mt-4 secondary-btn inline-block text-xl lg:text-3xl px-4 py-2 leading-none rounded mt-0">
            Get started →
          </a>
        </section>
      </Layout>
    </>
  )
}