import Container from './container'

export default function Alert({ preview }) {
  return (
    <div
      id="banner-alert"
    >
      <Container>
        <div className="py-2 text-center text-sm">
          Due to COVID-19, our shipping speeds may be slower than usual.
        </div>
      </Container>
    </div>
  )
}
