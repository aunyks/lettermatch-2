import Head from 'next/head'
import Error from 'next/error'
import Layout from 'components/layout'
import firebase from 'firebase/clientApp'
import Filter from 'components/filter'

const ItemFiltersPage = ({ errorCode, itemName, itemSlug, filtersList }) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }
  const pageTitle = `${itemName} Filters - MEZCLA`
  return (
    <>
      <Layout>
        <Head>
          <title>{pageTitle}</title>
          <meta key="tw-title" name="twitter:title" content={pageTitle} />
          <meta key="og-title" property="og:title" content={pageTitle} />
          <meta key="og-url" property="og:url" content={`https://mezcla.xyz/filters/${itemSlug}`} />
        </Head>
        <div className="px-6 pb-6 flex flex-col">
          <h1 className="tracking-tight font-bold text-5xl text-center">
            {`${itemName} Filters`}
          </h1>
          <div className="lg:px-64">
            {
              filtersList.map(({ mediaType, mediaUrl, name, description, id, platforms, poster }) => (
                <Filter
                  key={id}
                  mediaType={mediaType}
                  mediaUrl={mediaUrl}
                  name={name}
                  description={description}
                  platforms={platforms}
                  poster={poster}
                />
              ))
            }
          </div>
        </div >
      </Layout >
    </>
  )
}

export async function getServerSideProps({ params }) {
  const isProd = process.env.ENV_LEVEL === 'production'
  const notFoundResponse = { props: { errorCode: 404 } }
  const { slug } = params
  const filters = await firebase.firestore().collection('filters')
    .where('items', 'array-contains', slug)
    .get()
  if (filters.docs.length === 0) {
    return notFoundResponse
  }
  const itemResult = await firebase.firestore().collection('items')
    .where('slug', '==', slug)
    .get()
  if (itemResult.docs.length === 0) {
    return notFoundResponse
  }
  const resultingItem = itemResult.docs[0]
  const item = resultingItem.data()
  if (!item.hasOwnProperty('visible') || !item.visible || (isProd && !item.live)) {
    return notFoundResponse
  }
  let filtersList = []
  filters.forEach(filter => {
    const thisFilter = { ...filter.data(), item: filter.id }
    if (!thisFilter.visible) {
      return
    }
    thisFilter.additionDate = {
      seconds: thisFilter.additionDate.seconds,
      nanoseconds: thisFilter.additionDate.nanoseconds
    }
    filtersList = [thisFilter, ...filtersList]
  })
  filtersList.sort((firstFilter, secondFilter) =>
    secondFilter.additionDate.seconds - firstFilter.additionDate.seconds)
  return { props: { filtersList, itemName: item.name, itemSlug: slug, errorCode: false } }
}

export default ItemFiltersPage