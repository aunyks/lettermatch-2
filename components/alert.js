import Container from 'components/container'

export default function Alert() {
  return (
    <div
      id="banner-alert"
    >
      <Container>
        <div className="py-2 text-center text-sm">
          Check out <a className="underline" target="_blank" href="https://blog.mezcla.xyz/posts/our-approach-to-sustainability">
            our approach to sustainability.
            </a>
        </div>
      </Container>
    </div>
  )
}