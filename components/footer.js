import Container from 'components/container'
import Twitter from 'components/tw'
import Instagram from 'components/ig'

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-accent-2 py-5">
      <Container>
        <div className="flex flex-col lg:flex-row w-full justify-between">
          <div id="info-side" className="flex flex-col lg:flex-row w-full lg:w-1/2">
            {/*<div className="flex flex-col mb-2 lg:mb-0 lg:mr-4">
              <span className="font-bold text-sm uppercase">Learn</span>
              <a href="/how-to-wear" className="text-xs">How to wear</a>
              <a href="/creators" className="text-xs">Make your own filters</a>
  </div>*/}
            <div className="flex flex-col my-2 lg:my-0 lg:mx-4">
              <span className="font-bold text-sm uppercase">Company</span>
              <a href="/about" className="text-xs">About</a>
              <span className="text-xs cursor-pointer" onClick={() => alert('support@lettermatch.co')}>
                Support
              </span>
            </div>
          </div>
          <div id="social-side" className="flex flex-col lg:justify-end w-full lg:w-1/2">
            {/*
            <div>newsletter</div>
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
            */}
            <span className="mt-1 lg:mt-0 w-full text-xs lg:text-sm text-left lg:text-right">
              &copy; 2020 Sankofa Systems
            </span>
          </div>
        </div>
      </Container>
    </footer>
  )
}