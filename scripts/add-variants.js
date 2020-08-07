const admin = require('firebase-admin')
const serviceAccount = require('../admin-key')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://mezcla-a6ae9.firebaseio.com'
})
const db = admin.firestore()

const variants = {
  'magenta-on-white-s': {
    sku: 'sku_HmArtrrDOCXyKo',
    image: '/assets/item/uncertain-future/tech/long/tech-long-tee-mag-white.jpg',
    price: 3499,
    size: 'S',
    color: 'Magenta on White',
    visible: true
  },
  'magenta-on-white-m': {
    sku: 'sku_HmAs2oKybDD5Nn',
    image: '/assets/item/uncertain-future/tech/long/tech-long-tee-mag-white.jpg',
    price: 3499,
    size: 'M',
    color: 'Magenta on White',
    visible: true
  },
  'magenta-on-white-l': {
    sku: 'sku_HmAsqa11HKyG68',
    image: '/assets/item/uncertain-future/tech/long/tech-long-tee-mag-white.jpg',
    price: 3499,
    size: 'L',
    color: 'Magenta on White',
    visible: true
  },
  'magenta-on-white-xl': {
    sku: 'sku_HmAsU8c6ToxKFh',
    image: '/assets/item/uncertain-future/tech/long/tech-long-tee-mag-white.jpg',
    price: 3499,
    size: 'XL',
    color: 'Magenta on White',
    visible: true
  },
  'magenta-on-white-2xl': {
    sku: 'sku_HmAsqUkXOKsfxd',
    image: '/assets/item/uncertain-future/tech/long/tech-long-tee-mag-white.jpg',
    price: 3699,
    size: '2XL',
    color: 'Magenta on White',
    visible: true
  }
}

// https://cloud.google.com/firestore/docs/manage-data/add-data#node.js_1
const addVariants = async (
  itemId,
) => {
  try {
    for (let variantId of Object.keys(variants)) {
      const res = await db
        .collection('items')
        .doc(itemId)
        .collection('variants')
        .doc(variantId)
        .set(variants[variantId])
    }
  } catch (e) {
    throw new Error(`ERROR ADDING VARIANTS:\n${e.message}`)
  }
}

/*
addVariants('cyber-tech-long-tee')
  .catch(e => {
    console.error(e.message)
  })
*/