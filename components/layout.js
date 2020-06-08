import Footer from 'components/footer'
import Meta from 'components/meta'
import Container from 'components/container'
import Navbar from 'components/navbar'

export default function Layout({ preview, noNav, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        {!noNav && (
          <>
            <Navbar alert={(
              <div
                id="banner-alert"
              >
                <Container>
                  <div className="py-2 text-center text-sm">
                    Check out <a className="underline" href="https://blog.mezcla.xyz/posts/our-approach-to-sustainability">
                      our approach to sustainability.
                      </a>
                  </div>
                </Container>
              </div>
            )} />
            <main className="pt-12">{children}</main>
          </>
        )}
      </div>
      <Footer />
    </>
  )
}
