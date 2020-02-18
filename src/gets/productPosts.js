
export function getProductInfo(id) {
    console.log('id in getProductInfo() в запросе поиска getProductInfo(id) productPosts.js', id)
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationArticle/getInfo', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `productID=${id}`
    })
        .then(res => res.json())
    // .then(dataRes => console.log(dataRes))
    // .then(productInfo => {
    //     console.log(productInfo)
    // })
}

export function getFullProductData(id) {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationArticle/getFullProductData', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `productID=${id}`
    })
    // .then(res =>
    //     console.log('getFullProductData res.json()', res.json()),
    // )
    // .then(dataRes => console.log(dataRes))
    // .then(productInfo => {
    //     console.log(productInfo)
    // })
}

export function getPreviewProductData(id) {
    console.log('ID ID ID ID getPreviewProductData(id) in productPost.js', id);
    // return fetch('https://ptsv2.com/t/j6czr-1559833253/post', {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationArticle/getPreviewProductData', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `productID=${id}`
    })
        .then(res => res.json())
    // .then(dataRes => console.log(dataRes))
    // .then(productInfo => {
    //     console.log(productInfo)
    // })
}

export function getPreviewProductImage(id) {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationArticle/getPreviewImage', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `productID=${id}`
    })
        .then(res => res.json())
    // .then(dataRes => console.log(dataRes))
}

export function getFullSizeProductImages(id) {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationArticle/getFullSizeImages', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `productID=${id}`
    })
        .then(res => res.json())
    // .then(dataRes => console.log(dataRes))
}

export function getSimilarProducts(id) {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationArticle/getSimilarProducts', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `productID=${id}`
    })
        .then(res => res.json())
    // .then(dataRes => console.log(dataRes))
}

export function getProductReviews(id) {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationArticle/getReviews', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `productID=${id}`
    })
        .then(res => res.json())
    // .then(dataRes => console.log(dataRes))
}

export function getProductDescription(id) {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationArticle/getDescription', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `productID=${id}`
    })
        .then(res => res.json())
    // .then(dataRes => console.log(dataRes))
}

export function getProductDetails(id) {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationArticle/getDetails', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `productID=${id}`
    })
        .then(res => res.json())
    // .then(dataRes => console.log(dataRes))
}

export function getProductPackage(id) {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationArticle/getPackage', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `productID=${id}`
    })
        .then(res => res.json())
    // .then(dataRes => console.log(dataRes))
}

export function getProductVideo(id) {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationArticle/getVideo', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `productID=${id}`
    })
        .then(res => res.json())
    // .then(dataRes => console.log(dataRes))
}

export function getPromocodeData(promocode) {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/getPromocodeData', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `promocode=${promocode}`
    })
        .then(res => res.json())
    // .then(dataRes => console.log(dataRes))
}

export function getProductsBySupplier(supplierID) {
    return fetch(`https://teleropa.de/WebiProgCommunicationApplicationCategory/getProductsBy?id=${supplierID}&type=supplier`, {
        method: 'GET',
    })
        .then(res => res.json())
    // .then(dataRes => console.log(dataRes))
}

export function getProductsByCategory(categoryID) {
    console.log('categoryID categoryID categoryID categoryID in productPosts.js', categoryID)
    return fetch(`https://teleropa.de/WebiProgCommunicationApplicationCategory/getProductsBy?id=${categoryID}&type=category`, {
        method: 'GET',
    })
    //     .then(res => console.log('res.json() res.json() res.json() res.json()', res.json()));
    // // .then(dataRes => console.log(dataRes))
}
