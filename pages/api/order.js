const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)

export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { id } = req.body
      await client.messages
        .create({
          body: `New order! ID: ${id}`,
          from: '+14048464726',
          to: '+16786316274'
        })
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.json({})
    } else {
      throw 'Invalid method provided to Order API route'
    }
  } catch (e) {
    console.error(e)
    res.statusCode = 400
    res.end()
  }
}