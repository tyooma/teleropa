const unit = '<PrePaymentOrder>';

function getOrder(info) {
  const customerID = `customerID=${info.customerID}`;
  const paymentID = `paymentID=${info.paymentID}`;
  const dispatchID = `dispatchID=${info.dispatchID}`;

  let products = '';
  const pOpen = encodeURI('[');
  const pClose = encodeURI(']');
  let pref = '';
  info.products.forEach((product,index) => {
    pref = `products${pOpen}${index}${pClose}`;
    products += `${pref}${pOpen}productID${pClose}=${product.id}&`;
    if ( product.methodMoney !== '' && product.methodMoney.toUpperCase() === 'BUYOFPOINTS' ) {
      products += `${pref}${pOpen}bonus${pClose}=1&`;
    }
    products += `${pref}${pOpen}quantity${pClose}=${product.count}&`;
  });

  const order = `${customerID}&${paymentID}&${dispatchID}&${products}`;
  return order;
}

export async function ExecuteOrder(info) {
  const method = '<ExecuteOrder>';
  // console.log(`${unit}.<${method}>`);
  let payment = null;

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
      console.log(unit+'.'+method+' JSON:', json);

      payment = { code: json.code, text: json.text, data: json.data };
      console.log(unit+'.'+method+' Fetch Success:', payment);
    } catch (err) {
      payment = {code: 'requestError', text: err.message};
      console.log(unit+'.'+method+' Fetch Catch-Error:', err);
    };
  } catch(err) {
    payment = {code: 'unknown_error', text: err.message};
    console.log(unit+'.'+method+' Try-Catch Error:', err);
  }
  return payment;
}
