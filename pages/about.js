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
          <h1 className="tracking-tight font-bold text-5xl lg:text-center">
            BEYOND REALITY.
          </h1>
          <div className="my-3 lg:my-5 lg:px-64 lg:text-justify">
            <p className="my-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consequat eleifend risus, vel mollis mi condimentum quis. Nam tristique tortor nec dolor tincidunt, vel pellentesque tellus dignissim. Proin magna magna, volutpat ac ornare elementum, convallis ac metus. Integer tristique aliquam massa vel euismod. Integer congue porta iaculis. Donec cursus felis nulla, eget ornare massa condimentum a. Nam maximus sapien a elementum vehicula. Cras rutrum nisi metus. Mauris id ligula in arcu maximus vehicula placerat in est.
            </p>
          </div>
        </div>
      </Layout>
    </>
  )
}
