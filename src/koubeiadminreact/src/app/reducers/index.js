


export default (state = {
    isFetching: false,
    isAuthError: false,
    authErrorInfo: '',
    data: null,
}, action) => {
    switch(action.type) {
        case 'REQUEST_INDEX_DATA':
            return _.assign({}, state, {
                isFetching: true,
            })
        case 'RECEIVE_INDEX_DATA':
            // console.log(action)
            return _.assign({}, state, {
                isFetching: false,
                isAuthError: false,
                authErrorInfo: '',
                data: action.data,
            })
        case 'RECEIVE_INDEX_DATA_ERROR':
            // console.log(111)
            return _.assign({}, state, {
                isFetching: false,
                isAuthError: true,
                authErrorInfo: action.data,
                data: null,
            })
        default:
            return state
    }
}


