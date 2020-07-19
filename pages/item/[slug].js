import {
  useState,
  useEffect
} from 'react'
import DynamicMeta from 'components/dynamic-meta'
import Error from 'next/error'
import Container from 'components/container'
import Layout from 'components/layout'
import ItemBox from 'components/item-box'
import firebase from 'firebase/clientApp'

const ItemPage = ({ errorCode, item, relatedItems, itemSlug, initialVariant }) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }
  const [variantOptions, updateVariant] = useState(initialVariant)
  const [browserStorage, setStorage] = useState(null)
  useEffect(() => {
    setStorage(window.localStorage)
  }, [])
  const variantKeysToIgnore = [
    'price',
    'sale',
    'salePrice',
    'image',
    'imageAlt'
  ]
  const variantChoiceCriteria = v => {
    // ignore price keys, because they'll almost always be different from
    // the default item price
    return Object.keys(variantOptions).every(k => variantKeysToIgnore.includes(k) || v[k] === variantOptions[k])
  }
  const variantExists = item.variants.some(variantChoiceCriteria)
  const chosenVariant = item.variants.find(variantChoiceCriteria)
  const {
    slug,
    name,
    defaultImg,
    defaultImgAlt,
    defaultPrice,
    description,
    variesBy,
    variants
  } = item
  const itemId = item.id
  const price = variantExists ? chosenVariant.price : defaultPrice
  const image = !!chosenVariant ? chosenVariant.image : defaultImg
  const imageAlt = !!chosenVariant ? chosenVariant.imageAlt : defaultImgAlt
  return (
    <>
      <Layout>
        <DynamicMeta
          title={`${name} - MEZCLA`}
          url={`https://mezcla.xyz/item/${itemSlug}`}
          imageUrl={defaultImg}
          description={description}
        />
        <div className="px-6 pt-12 pb-6">
          <main className="mb-6 mx-auto lg:mb-12 lg:w-3/5">
            <h1 className="tracking-tight font-bold text-5xl lg:text-center">
              {name}
            </h1>
            <img width="600" className="mx-auto my-5 lg:h-2/4" src={image || defaultImg} alt={imageAlt || defaultImgAlt} />
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
                          variants
                            .map(v => v[variantKey])
                            .filter((attr, attrIndex, self) => self.indexOf(attr) === attrIndex)
                            .map(attr => (
                              <option key={attr} value={attr}>
                                {attr}
                              </option>
                            ))
                        }
                      </select>
                    </div>
                  )
                })
              }
              <div className="grid grid-cols-1 gap-1 lg:grid-cols-2 mt-2 mb-3">
                <button
                  disabled={!variantExists}
                  className="primary-btn add-to-cart border rounded py-2"
                  onClick={() => {
                    const sku = chosenVariant.sku
                    if (browserStorage !== null) {
                      let currentCart = browserStorage.getItem('cart')
                      if (currentCart === null) {
                        currentCart = [{
                          id: itemId,
                          slug,
                          name,
                          price,
                          img: image,
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
                            img: image,
                            sku,
                            qty: 1
                          }]
                        }
                      }
                      browserStorage.setItem('cart', JSON.stringify(currentCart))
                      window.postMessage(browserStorage.getItem('cart'), window.location.origin)
                      if (confirm('Item added to cart! Ready to check out?')) {
                        window.location.pathname = '/cart'
                      }
                    }
                  }}>
                  Add to Cart
              </button>
                <a
                  href={`/filters/${slug}`}
                  className="text-center block bg-white border-2 border-black rounded py-2">
                  Filters
              </a>
              </div>
              {
                description.split('\\n').map(paragraph => (
                  <p className="text-justify text-base mb-4 lg:mt-2">
                    {paragraph}
                  </p>
                ))
              }
            </div>
          </main>
          <section className="mx-auto lg:w-3/5">
            <h3 className="font-bold text-3xl">
              {(relatedItems !== null && relatedItems.length > 0) && 'Related Items'}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3">
              {
                relatedItems
                  .map(({ id, slug, name, defaultPrice, description, defaultImg }) =>
                    <div className="my-2 lg:mr-2" key={id}>
                      <ItemBox
                        id={id}
                        slug={slug}
                        name={name}
                        price={defaultPrice}
                        description={description}
                        image={defaultImg}
                        noDescription
                      />
                    </div>
                  )
              }
            </div>
            <div className="flex flex-row justify-center">
              {(relatedItems !== null && relatedItems.length > 0) && (
                <a href="/shop" className="bold-border-btn inline-block text-xl px-4 py-2 leading-none border rounded mt-5">
                  See more
                </a>
              )}
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const isProd = process.env.ENV_LEVEL === 'production'
  const notFoundResponse = { props: { errorCode: 404 } }
  const { slug } = params
  const itemResult = await firebase.firestore().collection('items')
    .where('slug', '==', slug)
    .get()
  if (itemResult.docs.length === 0) {
    return notFoundResponse
  }
  const resultingItem = itemResult.docs[0]
  const item = resultingItem.data()
  if (!item.hasOwnProperty('visible') || !item.visible || (isProd && !item.live)) {
    return notFoundResponse
  }
  const variantResults = await firebase.firestore().collection(`/items/${resultingItem.id}/variants`).orderBy('sku').get()

  item.additionDate = {
    seconds: item.additionDate.seconds,
    nanoseconds: item.additionDate.nanoseconds
  }
  item.id = resultingItem.id
  item.variants = []
  variantResults.forEach(n => {
    const thisVariant = n.data()
    if (thisVariant.hasOwnProperty('visible') && thisVariant.visible) {
      item.variants.push(thisVariant)
    }
  })
  const someVariant = { ...item.variants[0] }
  delete someVariant.sku

  // just random items for now
  const fbRelatedItems = await firebase.firestore().collection('items')
    .limit(4)
    .get()
  let relatedItems = []
  fbRelatedItems.forEach(relatedItem => {
    const thisRelatedItem = { ...relatedItem.data(), id: relatedItem.id }
    if (!thisRelatedItem.hasOwnProperty('visible') || !thisRelatedItem.visible || thisRelatedItem.slug === slug
      || (isProd && !thisRelatedItem.live)) {
      return
    }
    thisRelatedItem.additionDate = {
      seconds: thisRelatedItem.additionDate.seconds,
      nanoseconds: thisRelatedItem.additionDate.nanoseconds
    }
    relatedItems.push(thisRelatedItem)
  })
  return { props: { item, relatedItems: relatedItems.slice(0, 3), itemSlug: slug, initialVariant: someVariant, errorCode: false } }
}

export default ItemPage