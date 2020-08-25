import Head from 'next/head'

const isUrl = string => {
  try {
    new URL(string)
  } catch (_) {
    return false
  }
  return true
}

export default function DynamicMeta({ title, description, url, imageUrl }) {
  const pageTitle = title || 'LetterMatch'
  const pageDescription = description || 'Find clothing, posters and accessories with mixed reality experiences.'
  const pageUrl = url || 'https://lettermatch.co'
  let pageImageUrl = null
  if (!!imageUrl && !isUrl(imageUrl)) {
    pageImageUrl = `https://lettermatch.co${imageUrl}`
  } else {
    pageImageUrl = imageUrl || 'https://lettermatch.co/assets/img/default-card-cohesive.png'
  }
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta key="desc" name="description" content={pageDescription} />
      <meta key="tw-img-src" name="twitter:image" content={pageImageUrl} />
      <meta key="tw-site" name="twitter:site" content="@lettermatchco" />
      <meta key="tw-card" name="twitter:card" content="summary_large_image" />
      <meta key="tw-title" name="twitter:title" content={pageTitle} />
      <meta key="tw-desc" name="twitter:description" content={pageDescription} />
      <meta key="og-img" property="og:image" content={pageImageUrl} />
      <meta key="og-title" property="og:title" content={pageTitle} />
      <meta key="og-url" property="og:url" content={pageUrl} />
      <meta key="og-desc" property="og:description" content={pageDescription} />
    </Head>
  )
}
