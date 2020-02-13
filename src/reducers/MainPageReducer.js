
const initialState = {
    brands: null,
    categories: null
}

export default (state = initialState, action) => { 
    // console.log(action, state)
    switch(action.type) {
        case 'SET_BRANDS': 
            return {...state, ...{brands: action.payload}}
        case 'SET_CATEGORIES':
            return {...state, ...{categories: action.payload}}
        default: 
            return state;
    }
}