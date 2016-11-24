
function requestData(data) {
    return {
        type: 'REQUEST_SHOPS',
        data
    }
}

function receiveData(req, res) {
    // console.log(res)
    return {
        type: 'RECEIVE_SHOPS',
        req:req,
        data: res,
        receivedAt: new Date().getTime()
    }
}

function fetchData(req) {
    return dispatch => {
        dispatch(requestData(req));

        // console.log(req)
        return app.ajax('/koubeiShop',{
            data:req
        }).then(res=> {
            return dispatch(receiveData(req, res))
        });
    }
}
function shouldFetch(state, req) {

    const { shops } = state;
    const {
        isFetching,
    } = shops;

    if (isFetching){
        return false
    }
    return true
}

export function fetchShopsIfNeeded(req) {
    // console.log(23)
    return (dispatch, getState)=> {
        // console.log(111)
        // console.log(shouldFetchCourse(getState(), req))
        if (shouldFetch(getState(), req)) {
            return dispatch(fetchData(req))
        }
    }
}

