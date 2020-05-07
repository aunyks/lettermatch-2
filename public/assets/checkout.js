window.onload = () => {
  const post = async (url, data, headers = {}) => {
    try {
      const finalHeaders = Object.assign({}, {
        'Content-Type': 'application/json'
      }, headers)
      const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: finalHeaders,
        body: finalHeaders['Content-Type'] === 'application/json' ? JSON.stringify(data) : data
      })
      if (!(res.status > 100 && res.status % 200 <= 99)) {
        throw `Non-200 status ${res.status}`
      }
      return Object.assign({
        statusCode: res.status
      },
        await res.json()
      )
    } catch (e) {
      console.error(e)
      return undefined
    }
  }
  document.getElementById('pay-now-btn')
    .addEventListener('click', async () => {
      const stripe = Stripe('pk_test_PGFssoIgna4ODG3QY5hso0An00byCaHxXy')
      const cartFromStorage = window.localStorage.getItem('cart')
      try {
        if (cartFromStorage !== null) {
          const deserializedCart = JSON.parse(cartFromStorage)
          // create order at api
          const orderId = `${parseInt(Math.random() * (10 ** 15))}`
          const apiResponse = await post('/api/order', {
            id: orderId,
          })
          if (!apiResponse) {
            throw 'A network error occurred!'
          }
          const stripeResult = await stripe.redirectToCheckout({
            items: deserializedCart.map(item => ({ sku: item.sku, quantity: item.qty })),
            clientReferenceId: orderId,
            shippingAddressCollection: {
              allowedCountries: ['US'],
            },
            successUrl: window.location.protocol + '//mezcla.xyz/thanks',
            cancelUrl: window.location.protocol + '//mezcla.xyz/checkout/pay',
          })
          if (stripeResult.error) {
            throw stripeResult.error.message
          }
        }
      } catch (e) {
        console.error(e)
        document.getElementById('payment-error')
          .innerText = `* ${e}`
      }
    })
}