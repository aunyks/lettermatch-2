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
  const [variantOptions, updateVariant] = useState({})
  useEffect(() => {
    const firebase = require('../../firebase/clientApp')
    const pathLevels = window.location.pathname.split('/')
    const slug = pathLevels[pathLevels.length - 1]
    async function asyncBoi() {
      try {
        const itemResult = await firebase.firestore().collection('items').where('slug', '==', slug).get()
        const resultingItem = itemResult.docs[0]
        const variantResults = await firebase.firestore().collection(`/items/${resultingItem.id}/variants`).orderBy('sku').get()
        const foundItem = resultingItem.data()
        foundItem.variants = []
        variantResults.forEach(n => foundItem.variants.push(n.data()))
        const someVariant = { ...foundItem.variants[0] }
        delete someVariant.sku
        updateVariant(someVariant)
        setItem(foundItem)
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
    variesBy,
    variants
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
              {
                Object.keys(variesBy).sort((v1, v2) => {
                  if (v1 < v2) { return -1 }
                  if (v1 > v2) { return 1; }
                  return 0
                }).map(labelTitle => {
                  const variantKey = variesBy[labelTitle]
                  return (
                    <div className="inline-block" key={variantKey}>
                      <label className="mr-2 my-2" htmlFor={variantKey}>
                        {labelTitle}
                      </label>
                      <select value={variantOptions[variantKey]} onChange={e => {
                        const newValue = e.target.value
                        updateVariant(prevVariant => {
                          const newVariant = { ...prevVariant }
                          newVariant[variantKey] = newValue
                          return newVariant
                        })
                      }} className="mr-2 my-2" id={variantKey}>
                        {
                          variants.map(v => {
                            const variantAttr = v[variantKey]
                            return (
                              <option key={variantAttr} value={variantAttr}>
                                {variantAttr}
                              </option>
                            )
                          })
                        }
                      </select>
                    </div>
                  )
                })
              }
              <button
                disabled={
                  !(variants.some(v => {
                    return Object.keys(variantOptions).every(k => v[k] === variantOptions[k])
                  }))
                }
                className="add-to-cart border rounded py-2 w-full my-2"
                onClick={() => {
                  alert(variants.find(v => {
                    return Object.keys(variantOptions).every(k => v[k] === variantOptions[k])
                  }).sku)
                }}>
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