const unit = '<PrePaymentOrder>';

function getOrder(info) {
  console.log(`info ===========================> :`, info);
  const customerID = `customerID=${info.customerID}`;
  const paymentID = `paymentID=${info.paymentID}`;
  const dispatchID = `dispatchID=${info.dispatchID}`;

  let products = '';
  const pOpen = encodeURI('[');
  const pClose = encodeURI(']');
  let pref = '';
  if (info.SofortKaufen) {
    info.products.forEach((product, index) => {
      pref = `products${pOpen}${index}${pClose}`;
      products += `${pref}${pOpen}productID${pClose}=${product.id}&`;
      if (product.methodMoney !== '' && product.methodMoney.toUpperCase() === 'BUYOFPOINTS') {
        products += `${pref}${pOpen}bonus${pClose}=1&`;
      }
      products += `${pref}${pOpen}quantity${pClose}=${product.count}&`;
    });
  } else {
    pref = `products${pOpen}${0}${pClose}`;
    products += `${pref}${pOpen}productID${pClose}=${info.products.id}&`;
    products += `${pref}${pOpen}quantity${pClose}=${1}&`;
    info.product
  }

  const order = `${customerID}&${paymentID}&${dispatchID}&${products}`;
  return order;
}

export async function ExecuteOrder(info) {
  const method = '<ExecuteOrder>';
  let payment = null;
  console.log(`${unit}.<${method}>  info ==> :`, info);
  try {
    const ORDER = getOrder(info);
    console.log(`${unit}.<${method}> ORDER:`, ORDER);

    try {
      const response = await fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/createOrder', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
        body: ORDER
      });

      const json = await response.json();
      console.log(unit + '.' + method + ' JSON:', json);

      payment = { code: json.code, text: json.text, data: json.data };
      console.log(unit + '.' + method + ' Fetch Success:', payment);
    } catch (err) {
      payment = { code: 'requestError', text: err.message };
      console.log(unit + '.' + method + ' Fetch Catch-Error:', err);
    };
  } catch (err) {
    payment = { code: 'unknown_error', text: err.message };
    console.log(unit + '.' + method + ' Try-Catch Error:', err);
  }
  return payment;
}
