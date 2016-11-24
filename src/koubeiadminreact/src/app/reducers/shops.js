export default (state = {
    isFetching: false,
    data: null,
    receivedAt: null
}, action) => {
    switch(action.type) {
        case 'REQUEST_SHOPS':
            return _.assign({}, state, {
                isFetching: true,
            });
        case 'RECEIVE_SHOPS':
            // console.log(action.data)
            return _.assign({}, state, {
                isFetching: false,
                data: action.data.data.list,
                total: Number(action.data.data.total),
                receivedAt: action.receivedAt,
            });
        default:
            return state
    }
}

