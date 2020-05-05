// import { useEffect } from 'react'
// import { useUser } from '../context/userContext'
// import firebase from '../firebase/clientApp'
import Head from 'next/head'
import Container from '../components/container'
import Layout from '../components/layout'

export default () => {
  /*
  const { loadingUser, user } = useUser()
  useEffect(() => {
    if (!loadingUser) {
      // You know that the user is loaded: either logged in or out!
      console.log(user)
    }
    // You also have your firebase app initialized
    console.log(firebase)
  }, [loadingUser, user])
  */

  return (
    <>
      <Layout>
        <Head>
          <title>MEZCLA - Beyond reality</title>
        </Head>
        {/* 
        <video
          style={{ zIndex: '-1', top: '20px', width: '100vmax' }}
          className="opacity-50 absolute left-0 right-0 bottom-0"
          loop muted autoPlay poster="URL/TO/poster.jpg">
          <source src="/assets/rm.mp4" type="video/mp4" />
          <source src="URL/TO/video.webm" type="video/webm" />
          <source src="URL/TO/video.ogv" type="video/ogv" />
        </video>
        */}
        <section className="px-6 py-24 h-full">
          <h1 className="text-3xl lg:text-6xl font-bold">
            Extend your reality
          </h1>
          <h2 className="text-xl lg:text-3xl lg:w-1/2">
            Find clothing, posters and accessories with mixed reality experiences
          </h2>
          <div className="mt-3">
            <a href="/shop" className="inline-block text-2xl lg:text-3xl px-4 py-2 leading-none border rounded mt-4 lg:mt-0">
              Shop now
              </a>
          </div>
        </section>
        <section className="p-6 h-1/2 text-center">
          <h3 className="text-2xl font-bold mb-5">FEATURED ITEMS</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <span>sumn</span>
            <span>sumn</span>
            <span>sumn</span>
          </div>
          <a href="/shop" className="inline-block text-xl px-4 py-2 leading-none border rounded mt-5">
            See more
          </a>
        </section>
      </Layout>
    </>
  )
}
