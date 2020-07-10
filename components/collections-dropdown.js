import {
  useState,
  useEffect
} from 'react'

export default function CollectionsDropdown({ }) {
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
        className="nav-highlight block mt-4 lg:inline-block lg:mt-0 mr-4">
        Collections
      </span>
      <div
        style={{ position: `${bigScreen ? 'absolute' : 'static'}`, display: `${menuVisible ? 'block' : 'none'}` }}
        className="bg-white border-solid lg:border-2 border-black rounded mt-2 py-1 lg:py-2 w-48">
        <a href="/collection/elemental" className="block px-4 py-2">
          ELEMENTAL
        </a>
        {/*
        {bigScreen && <hr className="w-5/6 ml-4" />}
        <a href="#" className="block px-4 py-2">
          Cyber 1.0
          </a>
         */}
      </div>
    </>
  )
}