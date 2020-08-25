import Head from 'next/head'

export default function Meta() {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#FF4433" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#FF4433" />
      <meta key="desc" name="description" content="A marketplace connecting newsletters with marketers and advertisers." />
      <meta key="tw-img-src" name="twitter:image" content="https://lettermatch.co/assets/img/default-card-cohesive.png" />
      <meta key="tw-site" name="twitter:site" content="@lettermatch" />
      <meta key="tw-card" name="twitter:card" content="summary_large_image" />
      <meta key="tw-title" name="twitter:title" content="LetterMatch" />
      <meta key="tw-desc" name="twitter:description" content="A marketplace connecting newsletters with marketers and advertisers." />
      <meta key="og-img" property="og:image" content="https://lettermatch.co/assets/img/default-card-cohesive.png" />
      <meta key="og-site-name" property="og:site_name" content="LetterMatch" />
      <meta key="og-type" property="og:type" content="website" />
      <meta key="og-title" property="og:title" content="LetterMatch" />
      <meta key="og-url" property="og:url" content="https://lettermatch.co" />
      <meta key="og-desc" property="og:description" content="A marketplace connecting newsletters with marketers and advertisers." />
    </Head>
  )
}
