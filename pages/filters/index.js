import Head from 'next/head'
import Error from 'next/error'
import Layout from 'components/layout'
import firebase from 'firebase/clientApp'
import Instagram from 'components/ig'
import Snapchat from 'components/snapchat'

const FiltersPage = ({ errorCode, filtersList }) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }
  return (
    <>
      <Layout>
        <Head>
          <title>Filters - MEZCLA</title>
          <meta key="tw-title" name="twitter:title" content="Filters - MEZCLA" />
          <meta key="og-title" property="og:title" content="Filters - MEZCLA" />
          <meta key="og-url" property="og:url" content="https://mezcla.xyz/filters" />
        </Head>
        <div className="px-6 pt-12 pb-6 flex flex-col">
          <h1 className="tracking-tight font-bold text-5xl text-center">
            Filters
          </h1>
          <div className="lg:px-64">
            {
              filtersList.map(({ mediaType, mediaUrl, name, description, id, platforms, poster }) => {
                let media = null
                if (mediaType === 'image') {
                  media = <img src={mediaUrl} className="w-full" />
                } else {
                  // video
                  media = (
                    <video loop muted autoPlay className="w-full" poster={poster}>
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

export async function getServerSideProps() {
  const filters = await firebase.firestore().collection('filters')
    .orderBy('additionDate')
    .get()
  if (filters.docs.length === 0) {
    return { props: { errorCode: 500 } }
  }
  let filtersList = []
  filters.forEach(filter => {
    const thisFilter = { ...filter.data(), item: filter.id }
    if (!thisFilter.hasOwnProperty('visible') || !thisFilter.visible) {
      return
    }
    thisFilter.additionDate = {
      seconds: thisFilter.additionDate.seconds,
      nanoseconds: thisFilter.additionDate.nanoseconds
    }
    filtersList = [thisFilter, ...filtersList]
  })
  return { props: { filtersList, errorCode: false } }
}

export default FiltersPage