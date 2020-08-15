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
          imageUrl="/assets/img/uf-banner.png"
          description="An elite team from a dystopian future has arrived. Fit with their own unique skillset, each of these three has a unique role in completing every mission. But, their latest mission has proven to be a difficult task and they need your help. Choose your role and assist."
        />
        <style jsx>{`
          @font-face {
            font-family: "Ethnocentric";
            src: url("/assets/fonts/ethnocentric-reg-it.woff") format('woff'),
            url("/assets/fonts/ethnocentric-reg-it.woff") format("truetype");
          }
          #heading-text {
            font-family: "Ethnocentric";
          }

          .role {
            transition: all 0.15s;
          }

          .role:hover {
            border-width: 2px;
          }
        `}</style>
        <div className="px-6 pt-8 pb-6 flex flex-col">
          <h3 id="heading-text" className="text-3xl lg:text-5xl text-left lg:text-center tracking-tighter font-bold mt-0 lg:mt-4 inline  mx-auto">
            Uncertain Future
          </h3>
          <p className="my-3 lg:my-5 lg:px-64 text-justify">
            An elite team from a dystopian future has arrived. Fit with their own unique skillset, each of these three has a unique role in completing every mission. But, their latest mission has proven to be a difficult task and they need your help. Choose your role and assist.
          </p>
          <div className="my-5 mx-auto grid grid-cols-1 lg:grid-cols-3">
            <div className="role my-2 lg:my-0 lg:mx-2 border-8 border-black rounded-lg">
              <a href="/collection/uncertain-future/role/brawn">
                <img src="/assets/img/uncertain-future/brawn.jpg" alt="A woman illustrated with bright magenta and lime colors." />
                <h3 className="py-6 pl-3 text-2xl font-bold text-left">Brawn</h3>
              </a>
            </div>
            <div className="role my-2 lg:my-0 lg:mx-2 border-8 border-black rounded-lg">
              <a href="/collection/uncertain-future/role/brains">
                <img src="/assets/img/uncertain-future/brains.jpg" alt="A woman illustrated with bright magenta and lime colors." />
                <h3 className="py-6 pl-3 text-2xl font-bold text-left">Brains</h3>
              </a>
            </div>
            <div className="role my-2 lg:my-0 lg:mx-2 border-8 border-black rounded-lg">
              <a href="/collection/uncertain-future/role/tech">
                <img src="/assets/img/uncertain-future/tech.jpg" alt="A woman illustrated with bright magenta and lime colors." />
                <h3 className="py-6 pl-3 text-2xl font-bold text-left">Tech</h3>
              </a>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default UFCollectionPage