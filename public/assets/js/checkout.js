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
      const stripe = Stripe('pk_live_0MOuU5KL9DqGCkPpdX9vYl2o00NU6r1U5T')
      const cartFromStorage = window.localStorage.getItem('cart')
      try {
        if (cartFromStorage !== null) {
          const deserializedCart = JSON.parse(cartFromStorage)
          // create order at api
          const orderId = `${parseInt(Math.random() * (10 ** 15))}`
          /*
          const apiResponse = await post('/api/order', {
            id: orderId,
          })
          if (!apiResponse) {
            throw 'A network error occurred!'
          }
          */
          const stripeResult = await stripe.redirectToCheckout({
            items: [...deserializedCart.filter(({ qty }) => qty > 0).map(item => ({ sku: item.sku, quantity: item.qty })), { sku: 'sku_HFChokUB3iPkcc', quantity: 1 }],
            clientReferenceId: orderId,
            shippingAddressCollection: {
              allowedCountries: ['US'],
            },
            successUrl: window.location.protocol + '//mezcla.xyz/thanks',
            cancelUrl: window.location.protocol + '//mezcla.xyz/cart',
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