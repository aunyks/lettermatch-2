import {
  useState,
  useEffect
} from 'react'
import Head from 'next/head'
import Container from '../components/container'
import Layout from '../components/layout'

export default function CartPage() {
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
  return (
    <>
      <Layout>
        <Head>
          <title>Your Cart - MEZCLA</title>
        </Head>
        <div className="px-6">
          <h1 className="tracking-tight font-bold text-5xl text-center">
            {
              isLoading ?
                'Loading...' :
                (cart.length > 0 ? 'Checkout' : 'Cart Empty')
            }
          </h1>
          <div className="lg:flex lg:flex-row">
            <section className="lg:overflow-y-scroll lg:w-3/4 flex flex-col">
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
                                updateCart(tempCart)
                              }} className="border-black border rounded-l text-xl px-6 font-bold text-center">+</button>
                              <button onClick={() => {
                                const itemIdx = cart.findIndex(item => item.sku === sku)
                                const tempCart = [...cart]
                                tempCart[itemIdx].qty = tempCart[itemIdx].qty - 1
                                window.localStorage.setItem('cart', JSON.stringify(tempCart))
                                updateCart(tempCart)
                              }} className="border-black border rounded-r text-xl px-6 font-bold text-center">-</button>
                              <br />
                              <br />
                              <button onClick={() => {
                                const filteredCart = cart.filter(item => item.sku !== sku)
                                window.localStorage.setItem('cart', JSON.stringify(filteredCart))
                                updateCart(filteredCart)
                              }} className="border-black border rounded px-2 py-1 font-bold text-center">Delete</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
              }
            </section>
            <section className="lg:w-1/4">
              f
            </section>
          </div>
        </div>
      </Layout>
    </>
  )
}
