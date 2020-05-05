import {
  useState,
  useEffect
} from 'react'
import Head from 'next/head'
import Container from '../../components/container'
import Layout from '../../components/layout'

const unknownPage = (
  <>
    <Layout>
      <Head>
        <title>Unknown item - MEZCLA</title>
      </Head>
      <div className="px-6 flex flex-col">
        <h1 className="tracking-tight font-bold text-5xl text-center">
          Unknown item
          </h1>
      </div>
    </Layout>
  </>
)

const loadingPage = (
  <>
    <Layout>
      <Head>
        <title>Loading Item</title>
      </Head>
      <div className="px-6 flex flex-col">
        <h1 className="tracking-tight font-bold text-5xl text-center">
          Loading...
        </h1>
      </div>
    </Layout>
  </>
)

export default function ItemPage() {
  const [item, setItem] = useState(null)
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    const firebase = require('../../firebase/clientApp')
    const pathLevels = window.location.pathname.split('/')
    const slug = pathLevels[pathLevels.length - 1]
    async function asyncBoi() {
      try {
        const queryResults = await firebase.firestore().collection('items').where('slug', '==', slug).get()
        //queryResults.forEach(item => console.log(item, item.data()))
        const resultingItem = queryResults.docs[0].data()
        setItem(resultingItem)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    asyncBoi()
  }, [])
  if (!isLoading && item === null) {
    return unknownPage
  }
  if (isLoading) {
    return loadingPage
  }
  const {
    name,
    defaultImg,
    description,
    price,
  } = item
  return (
    <>
      <Layout>
        <Head>
          <title>{name} - MEZCLA</title>
        </Head>
        <div className="px-6 pb-12">
          <section className="mb-6 lg:mb-12">
            <h1 className="tracking-tight font-bold text-5xl lg:text-center">
              {name}
            </h1>
            <img className="my-5 mx-auto lg:w-2/5 lg:h-2/5" src={defaultImg} />
            <div className="mx-auto lg:w-2/5">
              <h2 className="font-bold text-2xl">
                {
                  (new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }))
                    .format(price / 100)
                }
              </h2>
              <button className="add-to-cart border rounded py-2 w-full my-2">
                Add to Cart
              </button>
              <p className="text-justify text-base">
                {description}
              </p>
            </div>
          </section>
          <section className="mx-auto lg:w-2/5">
            <h3 className="font-bold text-3xl">
              Related Items
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3">
              <span>sumn</span>
              <span>sumn</span>
              <span>sumn</span>
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}