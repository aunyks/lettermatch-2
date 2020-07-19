import DynamicMeta from 'components/dynamic-meta'
import Error from 'next/error'
import Layout from 'components/layout'
import firebase from 'firebase/clientApp'
import Filter from 'components/filter'

const ElementalFiltersPage = ({ errorCode, filtersList }) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }
  return (
    <>
      <Layout>
        <DynamicMeta
          title="ELEMENTAL Collection Filters - MEZCLA"
          url="https://mezcla.xyz/filters/collection/elemental"
          imageUrl="/assets/img/elemental-banner.jpg"
        />
        <div className="px-6 py-8 flex flex-col">
          <h1 className="tracking-tight font-bold text-5xl text-center">
            ELEMENTAL Collection Filters
          </h1>
          <div className="lg:px-64">
            {
              filtersList.length > 0 && filtersList.map(({ mediaType, mediaUrl, name, description, id, platforms, poster }) => (
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
    filtersList = [thisFilter, ...filtersList]
  })
  filtersList.sort((firstFilter, secondFilter) =>
    secondFilter.additionDate.seconds - firstFilter.additionDate.seconds)
  return { props: { filtersList, errorCode: false } }
}

export default ElementalFiltersPage