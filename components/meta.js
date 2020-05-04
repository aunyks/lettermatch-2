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
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta key="desc" name="description" content="Technology is culture." />
      <meta key="tw-img-src" name="twitter:image" content="https://trustless.science/assets/default-card.png" />
      <meta key="tw-site" name="twitter:site" content="@thetrustless" />
      <meta key="tw-card" name="twitter:card" content="summary_large_image" />
      <meta key="tw-title" name="twitter:title" content="The Trustless Log" />
      <meta key="tw-desc" name="twitter:description" content="Technology is culture." />
      <meta key="og-img" property="og:image" content="https://trustless.science/assets/default-card.png" />
      <meta key="og-site-name" property="og:site_name" content="The Trustless Log" />
      <meta key="og-type" property="og:type" content="blog" />
      <meta key="og-title" property="og:title" content="The Trustless Log" />
      <meta key="og-url" property="og:url" content="https://trustless.science" />
      <meta key="og-desc" property="og:description" content="Technology is culture." />
    </Head>
  )
}
