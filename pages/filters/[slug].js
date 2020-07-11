import Head from 'next/head'
import Error from 'next/error'
import Layout from 'components/layout'
import firebase from 'firebase/clientApp'
import Instagram from 'components/ig'
import Snapchat from 'components/snapchat'

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
        <div className="px-6 pt-12 pb-6 flex flex-col">
          <h1 className="tracking-tight font-bold text-5xl text-center">
            {`${itemName} Filters`}
          </h1>
          <div className="lg:px-64">
            {
              filtersList.map(({ mediaType, mediaUrl, name, description, id, platforms }) => {
                let media = null
                if (mediaType === 'image') {
                  media = <img src={mediaUrl} className="w-full" />
                } else {
                  // video
                  media = (
                    <video loop muted autoPlay className="w-full">
                      <source src={mediaUrl} type="video/mp4" />
                    </video>
                  )
                }
                const platformIds = Object.keys(platforms)
                return (
                  <div key={id} className="my-4">
                    {media}
                    <h2 className="font-bold text-2xl text-left">{name}</h2>
                    <div className="flex flex-col lg:flex-row mb-2 lg:mb-0">
                      <span className="font-bold mr-2">Platforms:&nbsp;</span>
                      <div className="flex flex-row space-between">
                        {platformIds.map(platformId => {
                          const platformUrl = platforms[platformId]
                          if (platformId === 'instagram') {
                            return (
                              <a href={platformUrl} target="_blank" rel="noopener noreferrer">
                                <Instagram width={25} />
                              </a>
                            )
                          } else if (platformId === 'snapchat') {
                            return (
                              <a href={platformUrl} target="_blank" rel="noopener noreferrer">
                                <Snapchat width={25} />
                              </a>
                            )
                          } else {
                            return <></>
                          }
                        })}
                      </div>
                    </div>
                    <p className="text-justify">
                      {description}
                    </p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </Layout>
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
    firstFilter.additionDate.seconds - secondFilter.additionDate.seconds)
  return { props: { filtersList, itemName: item.name, itemSlug: slug, errorCode: false } }
}

export default ItemFiltersPage