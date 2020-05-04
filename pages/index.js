import { useEffect } from 'react'
import { useUser } from '../context/userContext'
import firebase from '../firebase/clientApp'
import Head from 'next/head'
import Container from '../components/container'
import Layout from '../components/layout'

export default () => {
  const { loadingUser, user } = useUser()
  useEffect(() => {
    if (!loadingUser) {
      // You know that the user is loaded: either logged in or out!
      console.log(user)
    }
    // You also have your firebase app initialized
    console.log(firebase)
  }, [loadingUser, user])

  return (
    <>
      <Layout>
        <Head>
          <title>MEZCLA - Beyond reality</title>
        </Head>
        <Container>
          {/*
          stuff
          */}
        </Container>
      </Layout>
    </>
  )
}
