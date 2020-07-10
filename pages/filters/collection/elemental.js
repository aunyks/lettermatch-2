import Head from 'next/head'
import Error from 'next/error'
import Layout from 'components/layout'
import firebase from 'firebase/clientApp'
import Instagram from 'components/ig'

const ElementalFiltersPage = ({ errorCode, filtersList }) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }
  return (
    <>
      <Layout>
        <Head>
          <title>ELEMENTAL Collection Filters - MEZCLA</title>
          <meta key="tw-title" name="twitter:title" content="ELEMENTAL Collection Filters - MEZCLA" />
          <meta key="og-title" property="og:title" content="ELEMENTAL Collection Filters - MEZCLA" />
          <meta key="og-url" property="og:url" content="https://mezcla.xyz/filters/collection/elemental" />
        </Head>
        <div className="px-6 py-8 flex flex-col">
          <h1 className="tracking-tight font-bold text-5xl text-center">
            ELEMENTAL Collection Filters
          </h1>
          <div className={`${filtersList.length > 0 ? 'lg:px-64 my-5 mx-auto grid grid-cols-1 lg:grid-cols-3' : ''}`}>
            {
              filtersList.length > 0 && filtersList.map(({ mediaType, mediaUrl, name, description, id, platforms }) => {
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
            {
              filtersList.length <= 0 && (
                <p className="my-3 lg:px-64 text-justify lg:text-center">Come back later to see filters for this collection!</p>
              )
            }
          </div>
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps() {
  const filters = await firebase.firestore().collection('filters')
    .get()
  if (filters.docs.length === 0) {
    return { props: { errorCode: 500 } }
  }
  let filtersList = []
  filters.forEach(filter => {
    const thisFilter = { ...filter.data(), item: filter.id }
    if (!thisFilter.hasOwnProperty('visible') || !thisFilter.visible || thisFilter.collection !== 'elemental') {
      return
    }
    thisFilter.additionDate = {
      seconds: thisFilter.additionDate.seconds,
      nanoseconds: thisFilter.additionDate.nanoseconds
    }
    filtersList.push(thisFilter)
  })
  return { props: { filtersList, errorCode: false } }
}

export default ElementalFiltersPage