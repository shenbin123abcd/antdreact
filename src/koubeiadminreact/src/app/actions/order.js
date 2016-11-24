export const REQUEST_ORDER_DETAIL='REQUEST_ORDER_DETAIL';
export const RECEIVE_ORDER_DETAIL='RECEIVE_ORDER_DETAIL';

function requestData(data) {
    return {
        type: 'REQUEST_ORDER_DETAIL',
        data
    }
}

function receiveData(data) {
    return {
        type: 'RECEIVE_ORDER_DETAIL',
        data
    }
}

function fetchData(req) {
    return dispatch => {
        dispatch(requestData(req));

        // console.log(req)
        return app.ajax('/cehuaGoods/show',{
            id:req
        }).then(res=> {
            return dispatch(receiveData(res))
        });
    }
}
function shouldFetch(state) {

    const { order } = state;
    const {
        isFetching,
        } = order;

    if (isFetching){
        return false
    }
    return true
}

export function fetchOrderIfNeeded(req) {
    return (dispatch, getState)=> {
        if (shouldFetch(getState())) {
            return dispatch(fetchData(req))
        }
    }
}

