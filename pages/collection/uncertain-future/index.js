import {
  useState,
  useEffect
} from 'react'
import Error from 'next/error'
import DynamicMeta from 'components/dynamic-meta'
import Container from 'components/container'
import Layout from 'components/layout'
import ItemBox from 'components/item-box'
import firebase from 'firebase/clientApp'

const UFCollectionPage = () => {
  return (
    <>
      <Layout>
        <DynamicMeta
          title="Uncertain Future Collection - MEZCLA"
          url="https://mezcla.xyz/collection/uncertain-future"
          imageUrl="/assets/img/uf-banner.jpg"
          description="A vision of fashion that pushes the boundaries of reality, our ELEMENTAL Collection lends itself to be a canvas of the future and a celebration of the Earth we inhabit. This set of minimally designed, nature-inspired apparel is brought to life using the collection's filters."
        />
        <style jsx>{`
          @font-face {
            font-family: "Ethnocentric";
            src: url("/assets/fonts/ethnocentric-reg-it.woff.woff") format('woff');
          }
          #heading-text {
            font-family: "Ethnocentric";
          }
        `}</style>
        <div className="px-6 pt-8 pb-6 flex flex-col">
          <h3 id="heading-text" className="text-2xl lg:text-5xl text-center tracking-tighter font-bold mt-6 inline px-3  mx-auto">
            Uncertain Future
          </h3>
          <p className="my-3 lg:my-5 lg:px-64 text-justify">
            An elite team from a dystopian future has arrived. Fit with their own unique skillset, each of these three has a unique role in completing every mission. But, their latest mission has proven to be a difficult task and they need your help. Choose your role and assist.
          </p>
          <div className="my-5 mx-auto grid grid-cols-1 lg:grid-cols-3">
            <div>
              a
            </div>
            <div>b</div>
            <div>c</div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default UFCollectionPage