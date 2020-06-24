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

const ShopPage = ({ errorCode, itemsList }) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }
  const pageTitle = `Shop - MEZCLA`
  return (
    <>
      <Layout>
        <Head>
          <title>{pageTitle}</title>
          <meta key="tw-title" name="twitter:title" content={pageTitle} />
          <meta key="og-title" property="og:title" content={pageTitle} />
          <meta key="og-url" property="og:url" content="https://mezcla.xyz/shop" />
        </Head>
        <div className="px-6 flex flex-col">
          <h1 className="py-8 tracking-tight font-bold text-5xl text-center">
            Items
          </h1>
          <div className={`my-5 mx-auto ${itemsList.length > 0 ? 'grid grid-cols-1 lg:grid-cols-3' : ''}`}>
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
                  <h2 className="text-2xl text-center">Nothing here right now!</h2>
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
    .orderBy('additionDate', 'desc')
    .get()
  if (items.docs.length === 0) {
    return { props: { errorCode: 500 } }
  }
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

export default ShopPage