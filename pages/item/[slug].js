import {
  useState,
  useEffect
} from 'react'
import Head from 'next/head'
import Container from '../../components/container'
import Layout from '../../components/layout'
import ItemBox from '../../components/item-box'

const unknownItemPage = (
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

const loadingItemPage = (
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
  const [browserStorage, setStorage] = useState(null)
  const [relatedItems, setRelatedItems] = useState(null)
  useEffect(() => {
    const firebase = require('../../firebase/clientApp')
    const pathLevels = window.location.pathname.split('/')
    const slug = pathLevels[pathLevels.length - 1]
    setStorage(window.localStorage)
    async function asyncBoi() {
      try {
        const itemResult = await firebase.firestore().collection('items')
          .where('slug', '==', slug)
          .get()
        const resultingItem = itemResult.docs[0]
        const variantResults = await firebase.firestore().collection(`/items/${resultingItem.id}/variants`).orderBy('sku').get()
        const foundItem = resultingItem.data()
        foundItem.id = resultingItem.id
        foundItem.variants = []
        variantResults.forEach(n => foundItem.variants.push(n.data()))
        const someVariant = { ...foundItem.variants[0] }
        delete someVariant.sku
        updateVariant(someVariant)
        setItem(foundItem)

        // just random items for now
        const fbRelatedItems = await firebase.firestore().collection('items')
          .limit(3)
          .orderBy('additionDate')
          .get()
        let tempRelatedItemsList = []
        fbRelatedItems.forEach(n => {
          tempRelatedItemsList.push({ ...n.data(), id: n.id })
        })
        setRelatedItems(tempRelatedItemsList)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    asyncBoi()
  }, [])
  if (!isLoading && item === null) {
    return unknownItemPage
  }
  if (isLoading) {
    return loadingItemPage
  }
  const {
    slug,
    name,
    defaultImg,
    description,
    price,
    variesBy,
    variants
  } = item
  const itemId = item.id
  return (
    <>
      <Layout>
        <Head>
          <title>{name} - MEZCLA</title>
        </Head>
        <div className="px-6 pb-12">
          <main className="mb-6 mx-auto lg:mb-12 lg:w-3/5">
            <h1 className="tracking-tight font-bold text-5xl lg:text-center">
              {name}
            </h1>
            <img className="my-5 lg:h-2/4" src={defaultImg} />
            <div>
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
                className="primary-btn add-to-cart border rounded py-2 w-full my-2"
                onClick={() => {
                  const chosenVariant = variants.find(v => {
                    return Object.keys(variantOptions).every(k => v[k] === variantOptions[k])
                  })
                  const sku = chosenVariant.sku
                  if (browserStorage !== null) {
                    let currentCart = browserStorage.getItem('cart')
                    if (currentCart === null) {
                      currentCart = [{
                        id: itemId,
                        slug,
                        name,
                        price,
                        img: defaultImg,
                        qty: 1,
                        sku
                      }]
                    } else {
                      const itemWithVariantSku = cartItem => cartItem.sku === chosenVariant.sku
                      const trueCart = JSON.parse(currentCart)
                      if (trueCart.some(itemWithVariantSku)) {
                        // increment the item quantity if this variant's in the cart
                        const cartItemIndex = trueCart.findIndex(itemWithVariantSku)
                        currentCart = [...trueCart]
                        currentCart[cartItemIndex].qty = currentCart[cartItemIndex].qty + 1
                      } else {
                        // add it to the cart brand new
                        currentCart = [...trueCart, {
                          id: itemId,
                          slug,
                          name,
                          price,
                          img: defaultImg,
                          sku,
                          qty: 1
                        }]
                      }
                    }
                    browserStorage.setItem('cart', JSON.stringify(currentCart))
                    if (confirm('Item added to cart! Ready to check out?')) {
                      window.location.pathname = '/cart'
                    }
                  }
                }}>
                Add to Cart
              </button>
              <p className="text-justify text-base">
                {description}
              </p>
            </div>
          </main>
          <section className="mx-auto lg:w-3/5">
            <h3 className="font-bold text-3xl">
              Related Items
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3">
              {
                relatedItems
                  .filter(({ slug }) => slug !== item.slug)
                  .map(({ id, slug, name, price, description, defaultImg }) =>
                    <div className="my-2 lg:mr-2" key={id}>
                      <ItemBox
                        id={id}
                        slug={slug}
                        name={name}
                        price={price}
                        description={description}
                        image={defaultImg}
                        noDescription
                      />
                    </div>
                  )
              }
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}