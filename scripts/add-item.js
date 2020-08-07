const admin = require('firebase-admin')
const serviceAccount = require('../admin-key')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://mezcla-a6ae9.firebaseio.com'
})
const db = admin.firestore()

// https://cloud.google.com/firestore/docs/manage-data/add-data#node.js_1
const addItem = async (
  itemId,
  slug,
  name,
  description,
  defaultPrice,
  defaultImg,
  defaultImgAlt,
  variesBy
) => {
  if (!itemId) {
    throw new Error('No id provided')
  }
  if (!slug) {
    throw new Error('No slug provided')
  }
  if (!name) {
    throw new Error('No name provided')
  }
  if (!description) {
    throw new Error('No description provided')
  }
  if (!defaultPrice) {
    throw new Error('No default price provided')
  }
  if (!defaultImg) {
    throw new Error('No default image provided')
  }
  if (!defaultImgAlt) {
    throw new Error('No default image alt text provided')
  }
  if (!variesBy) {
    throw new Error('Need a variesBy object')
  }
  try {
    const additionDate = admin.firestore.Timestamp.fromDate(new Date(Date.now()))
    const visible = true
    const live = false
    const featured = false
    const demoVideo = ''
    const res = await db
      .collection('items')
      .doc(itemId)
      .set({
        slug,
        name,
        description,
        defaultPrice,
        defaultImg,
        defaultImgAlt,
        additionDate,
        visible,
        live,
        featured,
        demoVideo,
        variesBy
      })
  } catch (e) {
    throw new Error(`ERROR ADDING ITEM:\n${e.message}`)
  }
}

/*
addItem(
  'cyber-tech-long-tee',
  'tech-long-tee',
  'Tech Long Tee',
  '80% Cotton, 20% Polyester Tee',
  3499,
  '/assets/item/uncertain-future/tech/long/tech-long-tee-cyan.jpg',
  'A cyberpunk-themed design with bright cyan colored accents.',
  {
    Color: 'color',
    Size: 'size'
  }
)
  .catch(e => {
    console.error(e.message)
  })
  */