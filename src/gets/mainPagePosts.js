import { store } from '../app/app';
import * as actions from '../actions/main-page-actions';


export function getBannerImage() {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationFrontend/getBannerImage', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
        .then(res => res.json())
        .then(dataRes => {
            return dataRes.indexTopBanner
        })
        // .catch(as => console.log(as))
}

export function getBrandsList() {
    fetch('https://teleropa.de/WebiProgCommunicationApplicationCategory/getBrandsList', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
        .then(res => res.json())
        .then(dataRes => store.dispatch(actions.setBrands(dataRes)))
        .catch(as => console.log(as))
}

export function getCategoriesIDs() {
    fetch('https://teleropa.de/WebiProgCommunicationApplicationCategory/getCategoriesIDs', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
        .then(res => res.json())
        .then(dataRes => console.log(dataRes))
        .catch(as => console.log(as))
}

export function getPopularCategories() {
    fetch('https://teleropa.de/WebiProgCommunicationApplicationFrontend/getPopularCategories', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
        .then(res => res.json())
        .then(dataRes => store.dispatch(actions.setCategories(dataRes.categories)))
        .catch(as => console.log(as))
}


export function getCountries() {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/getCountries', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
        .then(res => res.json())
        // .then(dataRes => dataRes)
}