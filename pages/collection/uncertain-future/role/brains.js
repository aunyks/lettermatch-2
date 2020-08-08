import {
  useState,
  useEffect
} from 'react'
import Error from 'next/error'
import DynamicMeta from 'components/dynamic-meta'
import Container from 'components/container'
import Layout from 'components/layout'
import ItemBox from 'components/item-box'
import firebase from 'firebase/clientApp'

const UFCollectionPage = ({ errorCode, itemsList }) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }
  return (
    <>
      <Layout>
        <DynamicMeta
          title="Uncertain Future: Brains Role - MEZCLA"
          url="https://mezcla.xyz/collection/uncertain-future"
          imageUrl="/assets/img/uf-banner.png"
          description="The brains of the group, this role performs all the strategic planning and coordination for the team. Equipped with a cybernetic augmentation that allows for rapid and deep computation, no problem is too difficult to solve for this individual."
        />
        <div className="px-6 pt-8 pb-6 flex flex-col">
          <h3 className="text-5xl text-center tracking-tight font-bold mt-6 inline px-3  mx-auto">
            Brains
          </h3>
          <p className="my-3 lg:my-5 lg:px-64 text-justify">
            The brains of the group, this role performs all the strategic planning and coordination for the team. Equipped with a cybernetic augmentation that allows for rapid and deep computation, no problem is too difficult to solve for this individual.
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
                  <p className="my-3 lg:px-64 text-justify">Coming soon. Follow us @mezclaxyz for updates.</p>
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
    .where('collection', '==', 'uncertain-future')
    .get()
  let itemsList = []
  items.forEach(item => {
    const thisItem = { ...item.data(), item: item.id }
    if (!thisItem.hasOwnProperty('visible') || !thisItem.visible || (isProd && !thisItem.live) || thisItem.role !== 'brains') {
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

export default UFCollectionPage