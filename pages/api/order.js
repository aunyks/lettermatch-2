const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const endpointSecret = process.env.STRIPE_ENDPOINT_TOKEN
const client = require('twilio')(accountSid, authToken)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const getLineItems = async (checkoutSessionId, optionsObject) => {
  return new Promise((resolve, reject) => {
    stripe.checkout.sessions.listLineItems(checkoutSessionId, optionsObject, function (err, lineItems) {
      if (err) {
        reject(err)
      } else {
        resolve(lineItems)
      }
    })
  })
}

const handleCheckoutSession = async ({ id, customer_email, shipping }) => {
  const lineItems = await getLineItems(id, {})
  const email = session.customer_email
  const { name, address } = shipping
  const addrLine1 = address.line1
  const addrLine2 = address.line2
  const addrCity = address.city
  const addrState = address.state
  const postalCode = address.postal_code
  const country = address.country

  console.log('line items', lineItems)
  console.log('shipping', shipping)
  return true
}

export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      const sig = req.headers['stripe-signature']
      let event
      console.log('BODY', req.body)
      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
      } catch (err) {
        //console.error(err)
        throw 'Error constructing webhook event'
      }

      if (event.type !== 'checkout.session.completed') {
        throw 'Unknown Stripe event type referenced'
      }
      const session = event.data.object
      const orderCreateSuccess = await handleCheckoutSession(session)
      if (!orderCreateSuccess) {
        throw 'Unable to create Printify order'
      }
      const id = session.client_reference_id
      await client.messages
        .create({
          body: `New order! ID: ${id}`,
          from: '+14048464726',
          to: '+16786316274'
        })
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.json({ received: true })
    } else {
      throw 'Invalid method provided to Order API route'
    }
  } catch (e) {
    console.error(e)
    res.statusCode = 400
    res.end()
  }
}