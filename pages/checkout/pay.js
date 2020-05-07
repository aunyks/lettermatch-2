import {
  useState,
  useEffect
} from 'react'

export default function PayPage() {
  const onSubmit = () => { }
  return (
    <>
      <Layout>
        <Head>
          <title>Checkout - MEZCLA</title>
        </Head>
        <div className="px-6 flex flex-col">
          <main className="mb-6 mx-auto lg:mb-12 lg:w-2/5">
            <h1 className="tracking-tight font-bold text-5xl lg:text-center">
              Checkout
            </h1>
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
          </main>
        </div>
      </Layout>
    </>
  )
}