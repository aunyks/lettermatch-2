import Container from './container'
import Twitter from './tw'
import Instagram from './ig'

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-accent-2 py-5">
      <Container>
        <div className="flex flex-col lg:flex-row w-full justify-between">
          <div id="info-side" className="flex flex-col lg:flex-row w-full lg:w-1/2">
            <div className="flex flex-col mb-2 lg:mb-0 lg:mr-2">
              <span className="font-bold text-sm uppercase">Shop</span>
              <a href="/shop" className="text-xs">All Items</a>
              <a href="/collection/elemental" className="text-xs">ELEMENTAL Collection</a>
            </div>
            <div className="flex flex-col my-2 lg:my-0 lg:mx-2">
              <span className="font-bold text-sm uppercase">Company</span>
              <a href="/about" className="text-xs">About</a>
              <a href="https://blog.mezcla.xyz" className="text-xs">Blog</a>
              <span className="text-xs cursor-pointer" onClick={() => alert('For all inquiries:\ncontact@mezcla.xyz')}>
                Contact
              </span>
            </div>
          </div>
          <div id="social-side" className="flex flex-col lg:justify-end w-full lg:w-1/2">
            {/*<div>newsletter</div>*/}
            <div className="flex flex-row justify-start lg:justify-end">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://instagram.com/mezclaxyz"
                className="mr-2 font-bold"
                style={{ paddingTop: '7px' }}
              >

                <Instagram width="30" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/mezclaxyz"
                className="ml-2 font-bold"
              >
                <Twitter width="45" />
              </a>
            </div>
            <span className="mt-1 lg:mt-0 w-full text-xs lg:text-sm text-left lg:text-right">
              &copy; 2020 Sankofa Systems
            </span>
          </div>
        </div>
      </Container>
    </footer>
  )
}