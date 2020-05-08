import Head from 'next/head'
import Layout from '../components/layout'

export default function AboutPage() {
  return (
    <>
      <Layout>
        <Head>
          <title>About - MEZCLA</title>
        </Head>
        <div className="p-6 flex flex-col">
          <h1 className="tracking-tight font-bold text-5xl text-center">
            BEYOND REALITY.
          </h1>
          <div className="my-3 lg:my-5 lg:px-64 text-justify">
            <p className="my-4">
              MEZCLA is a brand that exists beyond reality. Born out of frustration with the limitations of the physical world, it expands the boundaries of creative expression by fusing the physical and virtual worlds. Mixing realities is at the core of what we do, and each of our products helps you transcend these two worlds.
            </p>
            <p>
              Join the movement. Expand your reality.
            </p>
          </div>
        </div>
      </Layout>
    </>
  )
}
