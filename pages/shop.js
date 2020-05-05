import { useEffect } from 'react'
import Head from 'next/head'
import Container from '../components/container'
import Layout from '../components/layout'

export default function AboutPage() {
  return (
    <>
      <Layout>
        <Head>
          <title>Shop - MEZCLA</title>
        </Head>
        <div className="px-6 flex flex-col">
          <h1 className="tracking-tight font-bold text-5xl text-center">
            Items
          </h1>
          <div className="my-5 mx-auto grid grid-cols-1 lg:grid-cols-3">
            <span>sumn</span>
            <span>sumn</span>
            <span>sumn</span>
            <span>sumn</span>
          </div>
        </div>
      </Layout>
    </>
  )
}