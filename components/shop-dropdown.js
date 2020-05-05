import {
  useState,
  useEffect
} from 'react'

export default function ShopDropdown({ }) {
  const [menuVisible, changeMenuVisibility] = useState(false)
  const [bigScreen, changeScreenSize] = useState(false)
  useEffect(() => {
    const smallScreenW = 640
    const mediumScreenW = 768
    const largeScreenW = 1024
    if (document.body.clientWidth >= largeScreenW) {
      changeScreenSize(true)
    }
  }, [])
  return (
    <>
      <span
        onClick={() => { changeMenuVisibility(!menuVisible) }}
        style={{ cursor: 'pointer' }}
        className="block mt-4 lg:inline-block lg:mt-0 mr-4">
        Shop
      </span>
      <div style={{ position: `${bigScreen ? 'absolute' : 'static'}`, display: `${menuVisible ? 'block' : 'none'}` }} className="rounded mt-2 py-2 w-48">
        <a href="#" className="block px-4 py-2">
          Posters
        </a>
        {bigScreen && <hr className="w-24 ml-4" />}
        <a href="#" className="block px-4 py-2">
          Clothing
          </a>
      </div>
    </>
  )
}