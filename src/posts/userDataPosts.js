import Toast from 'react-native-root-toast';
import NavigationService from '../navigation-service';

export function ChangeUserInfo(userID, name, surname, birthday, gender) {
  const request = `userID=${userID}&name=${name}&surname=${surname}&birthday=${birthday}&gender=${gender}`;
  // console.log('ChangeUserInfo => request:', request);

  fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/changeUserInfo', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
    body: request
  })
  .then(res => res.json())
  .then(({success, data, status}) => {
    console.log('changeUserInfo => status:', status, ' # data:', data, ' # success:', success);
    Toast.show(status.text, { shadow: false, backgroundColor: "#505050", duration: 1500 });
    NavigationService.navigate('PersonalData', {reload: true});
  });
}

export function ChangeUserAddress(address, userID, customerType, company, department, vatId, salutation, firstname, lastname, street, zipcode, city, country, phone) {
  const request = `userID=${userID}&customer_type=${customerType}&company=${company}&department=${department}&vatId=${vatId}&salutation=${salutation}&firstname=${firstname}&lastname=${lastname}&street=${street}&zipcode=${zipcode}&city=${city}&country=${country}&phone=${phone}`;
  // console.log('ChangeUserAddress => request:', request);

  let apiUrl = '';
  if (address === 'ChangeUserBillingAddress') {
    apiUrl = 'https://teleropa.de/WebiProgCommunicationApplicationUser/changeUserBillingAddress';
  }

  if (address === 'ChangeUserShippingAddress') {
    apiUrl = 'https://teleropa.de/WebiProgCommunicationApplicationUser/changeUserShippingAddress';
  }

  // console.log('ChangeUserAddress => apiUrl:', apiUrl);
  fetch(apiUrl, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
    body: request
  })
  .then(res => res.json())
  .then(({success, data, status}) => {
    console.log('ChangeUserAddress => status:', status, ' # data:', data, ' # success:', success);
    Toast.show(status.text, {shadow: false, backgroundColor: "#505050", duration: 1500});
    NavigationService.navigate('PersonalData', {reload: true});
  });
}

export function changePassword(userID, password) {
  fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/changeUserPassword', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `userID=${userID}&password=${password}`
  })
  .then(res => res.json())
  .then(({success, data, status}) => {
    console.log('changePassword => status:', status, ' # data:', data, ' # success:', success);
    Toast.show(status.text, { shadow: false, backgroundColor: "#505050", duration: 1500 });
  });
}
