const unit = '<libPrepayments>';

export function testOrder() {
  const method = 'testOrder';

  const orders = [
    'customerID=23345&paymentID=5&dispatchID=11&products=[{productID:3090,quantity:1}]',
    'customerID="23345"&paymentID="5"&dispatchID="11"&products="[{productID:3090,quantity:1}]"',
    'customerID="23345"&paymentID="5"&dispatchID="11"&products="[{productID:"3090",quantity:"1"}]"',
    '"customerID"="23345"&"paymentID"="5"&"dispatchID"="11"&"products"="[{productID:3090,quantity:1}]"',
    '"customerID"="23345"&"paymentID"="5"&"dispatchID"="11"&"products"="[{"productID":"3090","quantity":"1"}]"',
    'customerID=23345,paymentID=5,dispatchID=11,products=[{productID:3090,quantity:1}]',
    'customerID="23345",paymentID="5",dispatchID="11",products="[{productID:3090,quantity:1}]"',
    'customerID="23345",paymentID="5",dispatchID="11",products="[{productID:"3090",quantity:"1"}]"',
    '"customerID"="23345","paymentID"="5","dispatchID"="11","products"="[{productID:3090,quantity:1}]"',
    '"customerID"="23345","paymentID"="5","dispatchID"="11","products"="[{"productID":"3090","quantity":"1"}]"',
    'customerID=23345 paymentID=5 dispatchID=11 products=[{productID:3090,quantity:1}]',
    'customerID="23345" paymentID="5" dispatchID="11" products="[{productID:3090,quantity:1}]"',
    'customerID="23345" paymentID="5" dispatchID="11" products="[{productID:"3090",quantity:"1"}]"',
    '"customerID"="23345" "paymentID"="5" "dispatchID"="11" "products"="[{productID:3090,quantity:1}]"',
    '"customerID"="23345" "paymentID"="5" "dispatchID"="11" "products"="[{"productID":"3090","quantity":"1"}]"',
    'customerID:23345&paymentID:5&dispatchID:11&products:[{productID:3090,quantity:1}]',
    'customerID:"23345"&paymentID:"5"&dispatchID:"11"&products:"[{productID:3090,quantity:1}]"',
    'customerID:"23345"&paymentID:"5"&dispatchID:"11"&products:"[{productID:"3090",quantity:"1"}]"',
    '"customerID":"23345"&"paymentID":"5"&"dispatchID":"11"&"products":"[{productID:3090,quantity:1}]"',
    '"customerID":"23345"&"paymentID":"5"&"dispatchID":"11"&"products":"[{"productID":"3090","quantity":"1"}]"',
    'customerID:23345,paymentID:5,dispatchID:11,products:[{productID:3090,quantity:1}]',
    'customerID:"23345",paymentID:"5",dispatchID:"11",products:"[{productID:3090,quantity:1}]"',
    'customerID:"23345",paymentID:"5",dispatchID:"11",products:"[{productID:"3090",quantity:"1"}]"',
    '"customerID":"23345","paymentID":"5","dispatchID":"11","products":"[{productID:3090,quantity:1}]"',
    '"customerID":"23345","paymentID":"5","dispatchID":"11","products":"[{"productID":"3090","quantity":"1"}]"',
    'customerID:23345 paymentID:5 dispatchID:11 products:[{productID:3090,quantity:1}]',
    'customerID:"23345" paymentID:"5" dispatchID:"11" products:"[{productID:3090,quantity:1}]"',
    'customerID:"23345" paymentID:"5" dispatchID:"11" products:"[{productID:"3090",quantity:"1"}]"',
    '"customerID":"23345" "paymentID":"5" "dispatchID":"11" "products":"[{productID:3090,quantity:1}]"',
    '"customerID":"23345" "paymentID":"5" "dispatchID":"11" "products"="[{"productID":"3090","quantity":"1"}]"',
  ];
  console.log(`<${method}> Orders count:`, orders.length);
  console.log('...............................................................................');
  let encodeOrder = '';
  // let result = '';
  orders.forEach(order => {
    encodeOrder = encodeURI(order);
    fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/createOrder', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeOrder
    })
    .then(res => res.json())
    .then(json => {
      console.log('Req_Order:', order);
      console.log('Req_EncodeOrder:', encodeOrder);
      console.log('Response:', json);
      console.log('...............................................................................');
    })
    .catch(err => {
      console.log(`<${method}>.<fetchError>:`, err);
    });
  });
}

/*
  customerID=23345
  paymentID = 5
  dispatchID = 11
  products = [
    { productID: 3090, quantity: 1 },
  ]
*/


/*
accept-language: en-US,en;q=0.9,ru;q=0.8,uk;q=0.7
cache-control: max-age=0
content-length: 138
content-type: application/x-www-form-urlencoded
cookie: session-1=9a60dcebfe5ee2c4ba02a2fbea8c06c8462b8c01342ed54760df07e3b48370fb; wbp_net_actual=0; wbp_net=0; nb_hideinstantcheckout=1
origin: https://teleropa.de
referer: https://teleropa.de/custom/plugins/WebiProgCommunicationApplication/testactions.html
sec-fetch-dest: document
sec-fetch-mode: navigate
sec-fetch-site: same-origin
sec-fetch-user: ?1
upgrade-insecure-requests: 1
user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36
customerID=23345&paymentID=5&dispatchID=11&products%5B0%5D%5BproductID%5D=3090&products%5B0%5D%5Bquantity%5D=1&products%5B0%5D%5Bbonus%5D=

*/