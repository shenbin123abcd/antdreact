import {
    REQUEST_ORDERS_DETAIL, RECEIVE_ORDERS_DETAIL
} from '../actions/orders'


export default (state = {
    isFetching: false,
    data: null,
}, action) => {
    switch(action.type) {
        case REQUEST_ORDERS_DETAIL:
            return Object.assign({}, state, {
                isFetching: true,
            })
        case RECEIVE_ORDERS_DETAIL:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.data,
            })
        default:
            return state
    }
}



