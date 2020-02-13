
export async function getProductsByBrand(id) {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationCategory/getProductsByBrand', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `supplierID=${id}`
    })
        .then(res => res.json())
}


export function getProductsByCategory(id) {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationCategory/getProductsByCategoryID', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `categoryID=${id}`
    })
        .then(res => res.json())
        // .then(dataRes => console.log(dataRes))
}

export function getSearchResult(query) {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationCategory/getSearchResult', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `searchString=${query}`
    })
        .then(res => res.json())
        // .then(dataRes => console.log(dataRes))
}