import {
  useState,
  useEffect
} from 'react'
import Head from 'next/head'
import Error from 'next/error'
import Container from '../../components/container'
import Layout from '../../components/layout'
import ItemBox from '../../components/item-box'
import firebase from '../../firebase/clientApp'

const AlphaCollectionPage = ({ errorCode, itemsList }) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }
  const pageTitle = `Alpha Collection - MEZCLA`
  return (
    <>
      <Layout>
        <Head>
          <title>{pageTitle}</title>
          <meta key="tw-title" name="twitter:title" content={pageTitle} />
          <meta key="og-title" property="og:title" content={pageTitle} />
          <meta key="og-url" property="og:url" content="https://mezcla.xyz/collection/alpha" />
        </Head>
        <div className="px-6 flex flex-col">
          <h1 className="py-6 tracking-tight font-bold text-5xl text-center">
            Alpha Collection
          </h1>
          <p className="my-3 lg:my-5 lg:px-64 text-justify">
            An early vision of fashion that pushes the boundaries of reality, our Alpha Collection lends itself to be a canvas of the future. This set of minimally designed apparel is brought to life using the collection's associated <a href="/filters" className="underline">Instagram Filters</a>.
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
  const items = await firebase.firestore().collection('items')
    .where('collection', '==', 'alpha')
    .get()
  let itemsList = []
  items.forEach(item => {
    const thisItem = { ...item.data(), item: item.id }
    thisItem.additionDate = {
      seconds: thisItem.additionDate.seconds,
      nanoseconds: thisItem.additionDate.nanoseconds
    }
    if (thisItem.visible) {
      itemsList.push(thisItem)
    }
  })
  return { props: { itemsList, errorCode: false } }
}

export default AlphaCollectionPage