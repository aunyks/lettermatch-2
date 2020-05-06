import {
  useState,
  useEffect
} from 'react'
import Head from 'next/head'
import Container from '../components/container'
import Layout from '../components/layout'
import ItemBox from '../components/item-box'

const unknownShopPage = (
  <>
    <Layout>
      <Head>
        <title>Uh oh! - MEZCLA</title>
      </Head>
      <div className="px-6 flex flex-col">
        <h1 className="tracking-tight font-bold text-5xl text-center">
          An unknown error occurred! Please try again later
          </h1>
      </div>
    </Layout>
  </>
)

const loadingShopPage = (
  <>
    <Layout>
      <Head>
        <title>Loading Items</title>
      </Head>
      <div className="px-6 flex flex-col">
        <h1 className="tracking-tight font-bold text-5xl text-center">
          Loading items...
        </h1>
      </div>
    </Layout>
  </>
)

export default function ShopPage() {
  const [isLoading, setLoading] = useState(true)
  const [itemsList, setItems] = useState(null)
  useEffect(() => {
    const firebase = require('../firebase/clientApp')
    async function asyncBoi() {
      try {
        const items = await firebase.firestore().collection('items').orderBy('additionDate').get()
        let tempItemsList = []
        items.forEach(n => {
          tempItemsList.push({ ...n.data(), id: n.id })
        })
        setItems(tempItemsList)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    asyncBoi()
  }, [])

  if (isLoading) {
    return loadingShopPage
  }
  if (!isLoading && itemsList === null) {
    return unknownShopPage
  }
  console.log(itemsList)
  return (
    <>
      <Layout>
        <Head>
          <title>Shop - MEZCLA</title>
        </Head>
        <div className="px-6 flex flex-col">
          <h1 className="tracking-tight font-bold text-5xl text-center">
            Items
          </h1>
          <div className="my-5 mx-auto grid grid-cols-1 lg:grid-cols-3">
            {
              itemsList.map(({ id, slug, name, price, description, defaultImg }) => {
                return (
                  <div className="py-3 lg:p-3" key={id}>
                    <ItemBox
                      id={id}
                      slug={slug}
                      name={name}
                      price={price}
                      description={description}
                      image={defaultImg}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>
      </Layout>
    </>
  )
}