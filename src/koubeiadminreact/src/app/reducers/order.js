import {
    REQUEST_ORDER_DETAIL, RECEIVE_ORDER_DETAIL
} from '../actions/order'


export default (state = {
    isFetching: false,
    data: null,
}, action) => {
    switch(action.type) {
        case REQUEST_ORDER_DETAIL:
            return Object.assign({}, state, {
                isFetching: true,
            })
        case RECEIVE_ORDER_DETAIL:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.data,
            })
        default:
            return state
    }
}


