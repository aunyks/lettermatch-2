import Container from './container'
import Twitter from './tw'
import Instagram from './ig'

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-accent-2">
      <Container>
        <div className="py-4 flex flex-col lg:flex-row items-center">
          <h3 className="order-0 text-base tracking-tighter leading-tight text-center lg:text-left lg:pr-4 lg:w-1/3">
            BEYOND REALITY.
          </h3>
          <span className="text-xs lg:text-base order-2 lg:order-1 lg:w-1/3 text-center">&copy; 2020 Sankofa Systems</span>
          <div className="order-1 lg:order-2 flex flex-row-reverse lg:pl-4 lg:w-1/3">
            <a
              target="_blank"
              href="https://instagram.com/mezclaxyz"
              className="mx-3 font-bold"
              style={{ paddingTop: '7px' }}
            >

              <Instagram width="30" />
            </a>
            <a
              target="_blank"
              href="https://twitter.com/mezclaxyz"
              className="mx-3 font-bold"
            >
              <Twitter width="45" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
