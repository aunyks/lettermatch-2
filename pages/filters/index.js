import Head from 'next/head'
import Error from 'next/error'
import Layout from 'components/layout'
import firebase from 'firebase/clientApp'
import Filter from 'components/filter'

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
        <div className="px-6 pb-6 flex flex-col">
          <h1 className="tracking-tight font-bold text-5xl text-center">
            Filters
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