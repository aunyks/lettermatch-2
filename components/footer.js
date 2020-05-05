import Container from './container'
import Twitter from './tw'
import Instagram from './ig'

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-accent-2">
      <Container>
        <div className="py-4 flex flex-col lg:flex-row items-center">
          <h3 className="text-base tracking-tighter leading-tight text-center lg:text-left mb-5 lg:mb-0 lg:pr-4 lg:w-1/2">
            BEYOND REALITY.
          </h3>
          <div className="flex flex-row-reverse lg:pl-4 lg:w-1/2">
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
