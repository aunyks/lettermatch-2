import {
  useState,
  useEffect
} from 'react'
import Head from 'next/head'
import Container from '../../components/container'
import Layout from '../../components/layout'
import StateSelect from '../../components/state-select'

export default function ShippingPage() {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [addrOne, setAddrOne] = useState('')
  const [addrTwo, setAddrTwo] = useState('')
  const [city, setCity] = useState('')
  // if this is still null on submit we got a problem
  const [state, setState] = useState(null)
  const [zip, setZip] = useState('')
  const [error, setError] = useState(null)
  const [cartEmpty, setCartEmpty] = useState(false)
  const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  useEffect(() => {
    const cartFromStorage = window.localStorage.getItem('cart')
    if (cartFromStorage === null) {
      setCartEmpty(true)
    } else {
      const deserializedCart = JSON.parse(cartFromStorage)
      if (deserializedCart.length === 0) {
        setCartEmpty(true)
      }
    }
  }, [])
  const onSubmit = () => {
    if (!emailRegex.test(email)) {
      setError('* Please provide a valid email')
      return
    }
    if (firstName.length <= 0) {
      setError('* Please provide a first name')
      return
    }
    if (lastName.length <= 0) {
      setError('* Please provide a last name')
      return
    }
    if (addrOne.length <= 0) {
      setError('* Please provide an address')
      return
    }
    if (city.length <= 0) {
      setError('* Please provide a U.S. city')
      return
    }
    if (state === null || state === 'XX') {
      setError('* Please select a state')
      return
    }
    if (zip.length !== 5 || isNaN(zip)) {
      setError('* Please provide a valid ZIP code')
      return
    }
    setError(null)
    window.localStorage.setItem('shipping-info', JSON.stringify({
      email,
      firstName,
      lastName,
      addrOne,
      addrTwo,
      city,
      state,
      zip
    }))
    window.location.pathname = '/checkout/pay'
  }
  return (
    <>
      <Layout>
        <Head>
          <title>Shipping - MEZCLA</title>
        </Head>
        <div className="px-6 flex flex-col">
          <main className="mb-6 mx-auto lg:mb-12 lg:w-2/5">
            <h1 className="tracking-tight font-bold text-5xl lg:text-center">
              {cartEmpty ? 'Cart Empty' : 'Shipping'}
            </h1>
            {!cartEmpty && (
              <>
                <span className="text-red-600">{error}</span>
                <h2 className="font-bold">Contact</h2>
                <input className="my-1 w-full border rounded px-3 py-1" type="email" placeholder="Email *" value={email} onChange={e => setEmail(e.target.value)} />
                <h2 className="font-bold">Shipping</h2>
                <div className="w-full lg:justify-between lg:flex lg:flex-row grid-cols-1">
                  <input className="lg:mr-1 my-1 w-full lg:w-1/2 border rounded px-3 py-1" type="text" placeholder="First name *" value={firstName} onChange={e => setFirstName(e.target.value)} />
                  <input className="lg:ml-1 my-1 w-full lg:w-1/2 border rounded px-3 py-1" type="text" placeholder="Last name *" value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
                <input className="my-1 w-full border rounded px-3 py-1" type="text" placeholder="Address *" value={addrOne} onChange={e => setAddrOne(e.target.value)} />
                <input className="my-1 w-full border rounded px-3 py-1" type="text" placeholder="Apartment, suite, etc. (optional)" value={addrTwo} onChange={e => setAddrTwo(e.target.value)} />
                <input className="my-1 w-full border rounded px-3 py-1" type="text" placeholder="City *" value={city} onChange={e => setCity(e.target.value)} />
                <div className="w-full lg:justify-between lg:flex lg:flex-row grid-cols-1">
                  <StateSelect className="lg:ml-1 my-1 w-full lg:w-1/2 border rounded py-2 px-3" placeholder="State *" onChange={e => setState(e.target.value)} />
                  <input className="lg:ml-1 my-1 w-full lg:w-1/2 border rounded px-3 py-1" type="text" placeholder="ZIP code *" value={zip} onChange={e => setZip(e.target.value)} />
                </div>
                <button className="primary-btn my-1 w-full py-3 rounded border"
                  onClick={onSubmit}>Pay now</button>
              </>
            )}
          </main>
        </div>
      </Layout>
    </>
  )
}
