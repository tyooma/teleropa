import { fixPrice } from '../functions/cart-funcs';

export function getProductInfo(id) {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationArticle/getInfo', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `productID=${id}`
    })
        .then(res => res.json())
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
}

export function getPreviewProductData(id) {    
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationArticle/getPreviewProductData', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `productID=${id}`
    })
        .then(res => res.json())

}

export async function getPreviewProductData1(id) {
    try {
        const response = await fetch('https://teleropa.de/WebiProgCommunicationApplicationArticle/getPreviewProductData', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `productID=${id}`
        })
        if (response.ok && response.status == 200) {
            const json = await response.json();
            return json;
        }
    } catch (err) {
        console.error('getPreviewAsyncProductData1(id): ERROR = ', err);
    }
}

export async function getPreviewAsyncProductData(id) {
    try {
        const response = await fetch('https://teleropa.de/WebiProgCommunicationApplicationArticle/getPreviewProductData', {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `productID=${id}`
        });
        const json = await response.json();
        json.salePrice = fixPrice(json.salePrice, 2);
        json.companyPrice = fixPrice(json.companyPrice, 2);
        json.price = fixPrice(json.price, 2);
        json.tax = fixPrice(json.tax, 2);
        console.log('getPreviewAsyncProductData => JSON:', json);
        //
        return json;
    } catch (err) {
        console.error('getPreviewAsyncProductData(id): ERROR = ', err);
    }
}

export async function getBonusProducts() {
    try {
        const response = await fetch('https://teleropa.de/WebiProgCommunicationApplicationArticle/getBonusProducts ', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        const json = await response.json();
        return json
    }
    catch (error) {
        console.error(error);
    }
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
    console.log("supplierID => ID => ", supplierID)
    return fetch(`https://teleropa.de/WebiProgCommunicationApplicationCategory/getProductsBy?id=${supplierID}&type=supplier`, {
        method: 'GET',
    })
        .then(res => res.json())
    // .then(dataRes => console.log(dataRes))
}

export async function getProductsByCategory(categoryID) {
    let q = [];
    try {
        const response = await fetch(`https://teleropa.de/WebiProgCommunicationApplicationCategory/getProductsBy?id=${categoryID}&type=category`, {
            method: 'GET',
        })
        const json = await response.json();
        console.log("getProductsByCategory  ==> categoryID => json", json);
        console.log("********************************************************************************************************")
        return json
    } catch (error) {
        console.error(error);
    }
}
