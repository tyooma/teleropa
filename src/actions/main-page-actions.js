export const setBrands = (brands) => {
    //ACTION CREATOR
    return {
        type: 'SET_BRANDS',
        payload: brands
    }
}

export const setCategories = (categories) => {
    //ACTION CREATOR
    return {
        type: 'SET_CATEGORIES',
        payload: categories
    }
}

export const setNewest = (newest) => {
    return {
        type: 'SET_NEWEST',
        payload: newest
    }
}

export const setServices = (services) => {
    return {
        type: 'SET_SERVICES',
        payload: Object.values(services)
    }
}

// export const setBonusProducts = (cardPoints) => {
//     return {
//         type: 'SET_BONUSPRODUCTS',
//         payload: cardPoints
//     }
// }

export const setOffers = (offers) => {
    return {
        type: 'SET_OFFERS',
        payload: offers
    }
}

export const setTopBanner = (topbanner) => {
    //ACTION CREATOR
    return {
        type: 'SET_TOPBANNER',
        payload: topbanner
    }
}