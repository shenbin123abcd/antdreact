export const REQUEST_ORDERS_DETAIL='REQUEST_ORDERS_DETAIL';
export const RECEIVE_ORDERS_DETAIL='RECEIVE_ORDERS_DETAIL';

function requestData(data) {
    return {
        type: 'REQUEST_ORDERS_DETAIL',
        data
    }
}

function receiveData(data) {
    return {
        type: 'RECEIVE_ORDERS_DETAIL',
        data
    }
}

function fetchData(req) {
    return dispatch => {
        dispatch(requestData(req));

        // console.log(req)
        return app.ajax('/cehuaOrder',req).then(res=> {
            return dispatch(receiveData(res))
        });
    }
}
function shouldFetch(state) {

    const { orders } = state;
    const {
        isFetching,
        } = orders;

    if (isFetching){
        return false
    }
    return true
}

export function fetchOrdersIfNeeded(req) {
    return (dispatch, getState)=> {
        if (shouldFetch(getState())) {
            return dispatch(fetchData(req))
        }
    }
}

