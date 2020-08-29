import {
  useState,
  useEffect
} from 'react'
import CollectionsDropdown from 'components/collections-dropdown'

export default function Navbar({ alert }) {
  const [isOpen, setNavbarOpen] = useState(false)
  useEffect(() => {
    const smallScreenW = 640
    const mediumScreenW = 768
    const largeScreenW = 1024
    if (document.body.clientWidth >= largeScreenW) {
      setNavbarOpen(true)
    }
  }, [])
  return (
    <nav id="navbar"
      className="z-50 bg-white top-0 inset-x-0 fixed block">
      {alert}
      <div className="flex items-center justify-between flex-wrap px-6 lg:px-16 py-5">
        <div className="flex items-center flex-shrink-0 mr-6">
          <a href="/" className="text-xl tracking-tight">LetterMatch</a>
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
            <a href="#" className="primary-btn inline-block text-sm px-6 py-2 leading-none rounded mt-4 lg:mt-0">
              Log in
              </a>
          </div>
        </div>
      </div>
    </nav>
  )
}