import {
  useState,
  useEffect
} from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'

export default function CheckoutPage() {
  const [cartEmpty, setCartEmpty] = useState(false)
  const [subtotal, setSubtotal] = useState(null)
  const [shipping, setShipping] = useState(null)
  const [tax, setTax] = useState(null)
  const [total, setTotal] = useState(null)
  useEffect(() => {
    const cartFromStorage = window.localStorage.getItem('cart')
    if (cartFromStorage === null) {
      setCartEmpty(true)
    } else {
      const deserializedCart = JSON.parse(cartFromStorage)
      if (deserializedCart.length === 0) {
        setCartEmpty(true)
        return
      }
      setSubtotal(deserializedCart.reduce((sum, itemA) => {
        return sum + itemA.price * itemA.qty
      }, 0))
    }
    /*
    if (!cartEmpty && window.localStorage.getItem('shipping-info') === null) {
      window.location.pathname = '/checkout/shipping'
    }
    */
  }, [])
  //const error = null

  return (
    <>
      <Layout>
        <Head>
          <title>Payment - MEZCLA</title>
          <script src="https://js.stripe.com/v3/"></script>
          <script src="/assets/checkout.js"></script>
        </Head>
        <div className="px-6 flex flex-col">
          <main className="mb-6 mx-auto w-full lg:mb-12 lg:w-2/5">
            <h1 className="tracking-tight font-bold text-5xl lg:text-center">
              {cartEmpty ? 'Cart Empty' : 'Payment'}
            </h1>
            {!cartEmpty && (
              <>
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
                  <span>{shipping}</span>
                </div>
                <div className="text-xs flex flex-row justify-between">
                  <h2 className="font-bold">Tax</h2>
                  <span>{tax}</span>
                </div>
                <div className="text-2xl flex flex-row justify-between">
                  <h2 className="font-bold">Total</h2>
                  <span>{total}</span>
                </div>
                <button id="pay-now-btn" className="primary-btn my-1 w-full py-3 rounded border">
                  Pay now
                </button>
              </>
            )}
          </main>
        </div>
      </Layout>
    </>
  )
}