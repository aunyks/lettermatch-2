import {
  useState,
  useEffect
} from 'react'
import Head from 'next/head'
import Container from 'components/container'
import Layout from 'components/layout'



export default function CartPage() {
  const flatShippingRate = 10
  const [isLoading, setLoading] = useState(true)
  const [cart, updateCart] = useState([])
  useEffect(() => {
    const cartFromStorage = window.localStorage.getItem('cart')
    if (cartFromStorage !== null) {
      const deserializedCart = JSON.parse(cartFromStorage)
      updateCart(deserializedCart)
    }
    setLoading(false)
  }, [])
  const subtotal = cart.reduce((sum, itemA) => {
    return sum + itemA.price * itemA.qty
  }, 0)
  const STRIPE_TOKEN = process.env.STRIPE_TOKEN
  const isProd = process.env.ENV_LEVEL === 'production'
  return (
    <>
      <Layout>
        <Head>
          <title>Your Cart - MEZCLA</title>
          <script src="https://js.stripe.com/v3/"></script>
        </Head>
        <div className="px-6 pb-6">
          <h1 className="tracking-tight font-bold text-5xl text-center">
            {
              isLoading ?
                'Loading...' :
                (cart.length > 0 ? 'Your Cart' : 'Cart Empty')
            }
          </h1>
          <div className="lg:flex lg:flex-row">
            <section className="lg:h-full lg:overflow-y-scroll lg:w-3/4 flex flex-col">
              {
                cart
                  .sort((itemA, itemB) => {
                    if (itemA < itemB) return -1;
                    if (itemA > itemB) return 1;
                    return 0
                  })
                  .map(({ slug, sku, name, qty, price, img }) => {
                    return (
                      <div key={sku} className="mb-5 flex flex-col lg:flex-row w-full">
                        <a href={`/item/${slug}`} className="lg:w-1/4 lg:h-1/4 lg:mr-2">
                          <img src={img} />
                        </a>
                        <div className="w-full flex flex-col lg:flex-row">
                          <div style={{ flexGrow: '2' }} className="flex-start">
                            <h2 className="font-bold text-2xl">
                              <a href={`/item/${slug}`}>
                                {name}
                              </a>
                            </h2>
                            <span className="mr-2 mb-2 inline-block">Price: {(new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                            }))
                              .format(price / 100)}
                            </span>
                            <span className="mr-2 mb-2 inline-block">Quantity: {qty}</span>
                          </div>
                          <div className="flex-end">
                            <div className="grid-cols-2 text-sm lg:text-right">
                              <button onClick={() => {
                                const itemIdx = cart.findIndex(item => item.sku === sku)
                                const tempCart = [...cart]
                                tempCart[itemIdx].qty = tempCart[itemIdx].qty + 1
                                window.localStorage.setItem('cart', JSON.stringify(tempCart))
                                window.postMessage(window.localStorage.getItem('cart'), window.location.origin)
                                updateCart(tempCart)
                              }} className="cart-qty border rounded-l text-lg px-4 font-bold text-center">+</button>
                              <button onClick={() => {
                                const itemIdx = cart.findIndex(item => item.sku === sku)
                                const tempCart = [...cart]
                                tempCart[itemIdx].qty = tempCart[itemIdx].qty - 1
                                window.localStorage.setItem('cart', JSON.stringify(tempCart))
                                window.postMessage(window.localStorage.getItem('cart'), window.location.origin)
                                updateCart(tempCart)
                              }} className="cart-qty border rounded-r text-lg px-4 font-bold text-center">-</button>
                              <br />
                              <br />
                              <button onClick={() => {
                                const filteredCart = cart.filter(item => item.sku !== sku)
                                window.localStorage.setItem('cart', JSON.stringify(filteredCart))
                                window.postMessage(window.localStorage.getItem('cart'), window.location.origin)
                                updateCart(filteredCart)
                              }} className="text-xs cart-qty border rounded px-2 py-1 font-bold text-center">Delete</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
              }
            </section>
            <section className="lg:w-1/4">
              {
                !isLoading &&
                (cart.length > 0 && (
                  <>
                    <hr className="lg:hidden" />
                    <div className="px-0 py-3 lg:px-6 lg:py-0">
                      <span id="payment-error" className="text-red-600"></span>
                      <div className="text-2xl flex flex-row justify-between">
                        <h2 className="font-bold">Subtotal</h2>
                        <span>
                          {(new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          }))
                            .format(subtotal / 100)}
                        </span>
                      </div>
                      <div className="text-xs flex flex-row justify-between">
                        <h2 className="font-bold">Shipping</h2>
                        <span>{(new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }))
                          .format(flatShippingRate)}</span>
                      </div>
                      <div className="text-2xl flex flex-row justify-between">
                        <h2 className="font-bold">Total</h2>
                        <span>{(new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }))
                          .format((subtotal + (flatShippingRate * 100)) / 100)}</span>
                      </div>
                      <button id="pay-now-btn" className="primary-btn block text-center border text-base w-full py-2 my-1"
                        onClick={async () => {
                          const stripe = Stripe(STRIPE_TOKEN)
                          try {
                            if (cart !== null) {
                              const stripeResult = await stripe.redirectToCheckout({
                                items: isProd ? [...cart.filter(({ qty }) => qty > 0).map(item => ({ sku: item.sku, quantity: item.qty })), { sku: `sku_HFChokUB3iPkcc`, quantity: 1 }] : [{ sku: 'sku_HEhZ0iN0oNAfrE', quantity: 1 }],
                                clientReferenceId: `${parseInt(Math.random() * (10 ** 15))}`,
                                shippingAddressCollection: {
                                  allowedCountries: [`US`],
                                },
                                successUrl: window.location.protocol + `//mezcla.xyz/thanks`,
                                cancelUrl: window.location.protocol + `//mezcla.xyz/cart`,
                              })
                              if (stripeResult.error) {
                                throw stripeResult.error.message
                              }
                            }
                          } catch (e) {
                            console.error(e)
                          }
                        }}>
                        Checkout
                      </button>
                    </div>
                  </>
                ))
              }
            </section>
          </div>
        </div>
      </Layout>
    </>
  )
}
