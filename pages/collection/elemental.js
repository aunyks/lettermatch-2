import {
  useState,
  useEffect
} from 'react'
import Head from 'next/head'
import Error from 'next/error'
import Container from 'components/container'
import Layout from 'components/layout'
import ItemBox from 'components/item-box'
import firebase from 'firebase/clientApp'

const ElementalCollectionPage = ({ errorCode, itemsList }) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }
  const pageTitle = `ELEMENTAL Collection - MEZCLA`
  return (
    <>
      <Layout>
        <Head>
          <title>{pageTitle}</title>
          <meta key="tw-title" name="twitter:title" content={pageTitle} />
          <meta key="og-title" property="og:title" content={pageTitle} />
          <meta key="og-url" property="og:url" content="https://mezcla.xyz/collection/element" />
        </Head>
        <div className="px-6 flex flex-col">
          <h3 className="text-5xl text-center tracking-tight font-bold mt-6 inline px-3  mx-auto">
            ELEMENTAL
          </h3>
          <p className="my-3 lg:my-5 lg:px-64 text-justify">
            A vision of fashion that pushes the boundaries of reality, our ELEMENTAL Collection lends itself to be a canvas of the future and a celebration of the Earth we inhabit. This set of minimally designed, nature-inspired apparel is brought to life using the collection's associated <a href="/filters/collection/elemental" className="underline">Instagram Filters</a>.
          </p>
          <div className={`${itemsList.length > 0 ? 'my-5 mx-auto grid grid-cols-1 lg:grid-cols-3' : ''}`}>
            {
              itemsList.length > 0 ? itemsList.map(({ id, slug, name, defaultPrice, description, defaultImg, defaultImgAlt }) => {
                return (
                  <div className="py-3 lg:p-3" key={id}>
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
                )
              }) : (
                  <p className="my-3 lg:px-64 text-justify">Come back later to see items in this collection!</p>
                )
            }
          </div>
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps() {
  const isProd = process.env.ENV_LEVEL === 'production'
  const items = await firebase.firestore().collection('items')
    .where('collection', '==', 'elemental')
    .get()
  let itemsList = []
  items.forEach(item => {
    const thisItem = { ...item.data(), item: item.id }
    if (!thisItem.visible || (isProd && !thisItem.live)) {
      return
    }
    thisItem.additionDate = {
      seconds: thisItem.additionDate.seconds,
      nanoseconds: thisItem.additionDate.nanoseconds
    }
    itemsList.push(thisItem)
  })
  return { props: { itemsList, errorCode: false } }
}

export default ElementalCollectionPage