import Head from 'next/head'
import Container from 'components/container'
import Layout from 'components/layout'
import ItemBox from 'components/item-box'
import firebase from 'firebase/clientApp'

const HomePage = ({ featuredItems }) => {
  let featuredItemsComponent = null
  if (featuredItems.length !== 0) {
    featuredItemsComponent = (
      <>
        <h3 className="text-3xl font-bold text-center">Featured Items</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {featuredItems.map(({ id, slug, name, defaultPrice, description, defaultImg, defaultImgAlt }) => (
            <div key={id} className="my-2 lg:px-2">
              <ItemBox
                id={id}
                slug={slug}
                name={name}
                price={defaultPrice}
                description={description}
                image={defaultImg}
                alt={defaultImgAlt}
              />
            </div>
          ))}
        </div>
        <a href="/shop" className="bold-border-btn inline-block text-xl px-4 py-2 leading-none border rounded mt-5">
          See more
          </a>
      </>
    )
  }

  return (
    <>
      <Layout>
        <Head>
          <title>MEZCLA - Beyond reality</title>
          <meta name="google-site-verification" content="MyNil_49wI2nJ3zc8VzY5bS4-fz8vVOkTVrBn1oexIA" />
        </Head>
        {/* 
        <video
          style={{ zIndex: '-1', top: '20px', width: '100vmax' }}
          className="opacity-50 absolute left-0 right-0 bottom-0"
          loop muted autoPlay poster="URL/TO/poster.jpg">
          <source src="/assets/rm.mp4" type="video/mp4" />
          <source src="URL/TO/video.webm" type="video/webm" />
          <source src="URL/TO/video.ogv" type="video/ogv" />
        </video>
        */}
        <section style={{ height: `90vh` }} className="px-6 py-8 flex flex-col justify-center">
          <div>
            <h1 className="text-3xl lg:text-6xl font-bold">
              Extend your reality
          </h1>
            <h2 className="text-xl lg:text-3xl lg:w-1/2">
              Find clothing and accessories with mixed reality experiences
          </h2>
            <div className="mt-3">
              <a href="/shop" className="primary-btn inline-block text-xl lg:text-2xl px-4 py-2 leading-none border rounded mt-0">
                Shop now
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
        <section className="p-6 h-1/2 text-center">
          {featuredItemsComponent}
        </section>
      </Layout>
    </>
  )
}


export async function getServerSideProps() {
  const isProd = process.env.ENV_LEVEL === 'production'
  const featuredResult = await firebase.firestore().collection('items')
    .where('featured', '==', true)
    .limit(3)
    .get()
  let featuredItems = []
  featuredResult.forEach(item => {
    const thisItem = { ...item.data(), id: item.id }
    if (!thisItem.hasOwnProperty('visible') || !thisItem.visible || (isProd && !thisItem.live)) {
      return
    }
    thisItem.additionDate = {
      seconds: thisItem.additionDate.seconds,
      nanoseconds: thisItem.additionDate.nanoseconds
    }
    featuredItems.push(thisItem)
  })
  return { props: { featuredItems } }
}

export default HomePage