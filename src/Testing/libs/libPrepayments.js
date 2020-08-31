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

customerID=23345&paymentID=5&dispatchID=11&products%5B0%5D%5BproductID%5D=3090&products%5B0%5D%5Bquantity%5D=1&products%5B0%5D%5Bbonus%5D=

---------------------------------------------------------------------------------------

uri = customerID=23345&paymentID=5&dispatchID=11&products[0][productID]=3091&products[0][quantity]=1&products[0][bonus]=
uriEncoded = customerID=23345&paymentID=5&dispatchID=11&products%5B0%5D%5BproductID%5D=3091&products%5B0%5D%5Bquantity%5D=1&products%5B0%5D%5Bbonus%5D=
response = {"code":"success","text":"Information erfolgreich aktualisiert","data":{"orderNumber":34273}}

uri = customerID=23345&paymentID=5&dispatchID=11&products[0][productID]=3090&products[0][quantity]=1&products[0][bonus]=0
uriEncoded = customerID=23345&paymentID=5&dispatchID=11&products%5B0%5D%5BproductID%5D=3090&products%5B0%5D%5Bquantity%5D=1&products%5B0%5D%5Bbonus%5D=0
response = {"code":"success","text":"Information erfolgreich aktualisiert","data":{"orderNumber":34272}}

uri = customerID=23345&paymentID=5&dispatchID=11&products[0][productID]=3091&products[0][quantity]=1&products[0][bonus]=1
uriEncoded = customerID=23345&paymentID=5&dispatchID=11&products%5B0%5D%5BproductID%5D=3091&products%5B0%5D%5Bquantity%5D=1&products%5B0%5D%5Bbonus%5D=1
response = No Response Body

uriEncoded = customerID=23345&paymentID=5&dispatchID=11&products%5B0%5D%5BproductID%5D=3090&products%5B0%5D%5Bquantity%5D=1&products%5B0%5D%5Bbonus%5D=0&products%5B1%5D%5BproductID%5D=3091&products%5B1%5D%5Bquantity%5D=2&products%5B1%5D%5Bbonus%5D=0
response = {"code":"success","text":"Information erfolgreich aktualisiert","data":{"orderNumber":34274}}

---------------------------------------------------------------------------------------

products%5B0%5D%5BproductID%5D=3090&products%5B0%5D%5Bquantity%5D=1&products%5B0%5D%5Bbonus%5D=0

*/