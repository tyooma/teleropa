import Toast from 'react-native-root-toast'
import { store } from '../app/app';
import * as actions from '../actions/login-actions';
import NavigationService from '../navigation-service';

export function logIn(email, pass, route) {
    fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${email}&password=${pass}`
    })
        .then(res => res.json())
        .then(logdata => {
            if (logdata.system.sErrorMessages) {
                store.dispatch(actions.setLoggedUserId('notloggedin'))
                alert(logdata.system.sErrorMessages)
                throw Error
            } else {
                store.dispatch(actions.setLoggedUserId(logdata.userID))
                route === 'Cart' ? NavigationService.navigate('Cart') : NavigationService.navigate('Main')
                // NavigationService.navigate('DeliveryService')
                return logdata.userID
            }
        })
        .then(id => {
            fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/getInfo', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `userID=${id}`
            })
                .then(res => res.json())
                .then(userData => {
                    store.dispatch(actions.setLoggedUserInfo(userData))
                })
        })
        .catch(e => e)
        .done
}

// -----------------------------------------------------------------------------------------------

export const register = (regData) => {
  const { 
    customerType, billingCompany, billingDepartment, billingVatId,
    salutation, firstname, lastname, phone, birthday,
    email, password, billingStreet, billingZipcode, billingCity, billingCountry, newsletterSubscribe
  } = regData;

  const requestBody = `customerType=${customerType}&billingCompany=${billingCompany}&billingDepartment=${billingDepartment}&billingVatId=${billingVatId}&salutation=${salutation}&firstname=${firstname}&lastname=${lastname}&phone=${phone}&birthday=${birthday}&email=${email}&password=${password}&billingStreet=${billingStreet}&billingZipcode=${billingZipcode}&billingCity=${billingCity}&billingCountry=${billingCountry}&newsletterSubscribe=${newsletterSubscribe}`;

  fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/register', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
    body: requestBody
  })
  .then(res => res.json())
  .then(({success, data, status}) => {
    if (success) {
      // {"success": true, "data": {"id": 26378, "location": "https://teleropa.de/api/customers/26378"}}
      console.log('Register => Success => id:', data.id, ' location:', data.location);
      logIn(regData.email, regData.password);
    } else {
      // {"status":{"code":"error_exists_user","text":"Der Benutzer mit der angegebenen E-Mail-Adresse existiert schon."}}
      console.log('Register Error =>', status.code, ':', status.text);
      alert(status.text);
    }
  });
}

/* registerRequest
export const registerRequest = (formData) => {
  fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/register', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData
  })
  .then(res => res.json())
  .then(({success, data, status}) => {
    if (success) {
      // {"success": true, "data": {"id": 26378, "location": "https://teleropa.de/api/customers/26378"}}
      console.log('Register => success => id:', data.id, ' location:', data.location);
    //   logIn(formData.email, formData.password);
    } else {
      // {"status":{"code":"error_exists_user","text":"Der Benutzer mit der angegebenen E-Mail-Adresse existiert schon."}}
      console.log('Register =>', status.code, ':', status.text);
      alert(status.text);
    }
  });
}
*/

// -----------------------------------------------------------------------------------------------

export function resetPassword(email) {
    fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/resetPassword', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${email}`
    })
        .then(res => res.json())
        .then(({ status }) => {
            Toast.show(status.text, {
                shadow: false,
                backgroundColor: "#505050",
                duration: 1500,
            })
        })
}

export function sendToken(token) {
    fetch('https://teleropa.de//WebiProgCommunicationApplicationUser/changeUserPushNotificationToken', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `pushToken=${token}`
    })
        .then(res => res.json())
        .then((res) => {
            Toast.show('Token gesendet', {
                shadow: false,
                backgroundColor: "#505050",
                duration: 1500,
            })
        })
}
