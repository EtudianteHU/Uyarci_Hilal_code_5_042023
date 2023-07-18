

const url = new URL(window.location);

const params = new URLSearchParams(url.search);
const orderId = params.get('orderId')

document.querySelector('#orderId').innerHTML = orderId