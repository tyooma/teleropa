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