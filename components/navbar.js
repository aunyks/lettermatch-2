import {
  useState,
  useEffect
} from 'react'

export default function Navbar({ alert }) {
  const [isOpen, setNavbarOpen] = useState(false)
  const [cartLen, setCartLen] = useState(null)
  useEffect(() => {
    const smallScreenW = 640
    const mediumScreenW = 768
    const largeScreenW = 1024
    if (document.body.clientWidth >= largeScreenW) {
      setNavbarOpen(true)
    }


    const updateCartSize = serializedCart => {
      if (typeof serializedCart !== 'string') {
        return
      }
      const deserializedCart = JSON.parse(serializedCart)
      let cartSize = 0
      deserializedCart.forEach(item => {
        cartSize += item.qty
      })
      setCartLen(cartSize)
    }
    window.addEventListener('message', ({ origin, data }) => {
      if (origin === window.location.origin) {
        updateCartSize(data)
      }
    }, false)
    const storedCart = window.localStorage.getItem('cart')
    if (storedCart !== null) {
      updateCartSize(storedCart)
    }
  }, [])
  return (
    <nav id="navbar"
      className="bg-white top-0 inset-x-0 fixed block">
      {alert}
      <div className="flex items-center justify-between flex-wrap px-5 py-3">
        <div className="flex items-center flex-shrink-0 mr-6">
          <a href="/" className="font-semibold text-xl tracking-tight">MEZCLA</a>
        </div>
        <div className="block lg:hidden">
          <button onClick={() => setNavbarOpen(!isOpen)} className="flex items-center">
            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div style={{ display: `${isOpen ? 'flex' : 'none'}` }} id="navbar-items" className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            {/* LEFT SIDE OF NAV (LARGE SCREEN) */}
          </div>
          <div>
            {/* RIGHT SIDE OF NAV (LARGE SCREEN) */}
            <a href="/" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
              Home
            </a>
            <a href="/collection/elemental" className="nav-highlight block mt-4 lg:inline-block lg:mt-0 mr-4">
              ELEMENTAL Collection
            </a>
            {/*<a href="/creators" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
            Creators
            </a>
  */}
            <a href="/filters" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
              Filters
            </a>
            <a href="/shop" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
              Shop
            </a>
            <a href="/about" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
              About
            </a>

            {/*
              <strong className="mr-4 hidden lg:inline-block">|</strong>
              <a href="#" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
                Log In
              </a>
              <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded hover:border-transparent mt-4 lg:mt-0">
                Sign up
              </a>
            */}
            <a href="/cart" className="lg:border-b-2 block mt-4 lg:inline-block lg:mt-0 mr-4">
              {cartLen === null ? 'Cart (0)' : `Cart (${cartLen})`}
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}