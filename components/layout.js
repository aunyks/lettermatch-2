import Footer from 'components/footer'
import Meta from 'components/meta'
import Alert from 'components/alert'
import Navbar from 'components/navbar'

export default function Layout({ preview, noNav, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        {!noNav && (
          <>
            <Navbar alert={<Alert />} />
            <main className="pt-20 lg:pt-16">{children}</main>
          </>
        )}
      </div>
      <Footer />
    </>
  )
}
