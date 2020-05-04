import Container from './container'

export default function Alert({ preview }) {
  return (
    <div
      id="banner-alert"
    >
      <Container>
        <div className="py-2 text-center text-sm">
          Need a COVID-19 test but can't find one? Here's the CDC's testing page.
        </div>
      </Container>
    </div>
  )
}
