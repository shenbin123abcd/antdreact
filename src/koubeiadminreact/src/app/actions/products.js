
function requestData(data) {
    return {
        type: 'REQUEST_PRODUCTS',
        data
    }
}

function receiveData(req, res) {
    // console.log(res)
    return {
        type: 'RECEIVE_PRODUCTS',
        req:req,
        data: res,
        receivedAt: new Date().getTime()
    }
}

function fetchData(req) {
    return dispatch => {
        dispatch(requestData(req));

        // console.log(req)
        return app.ajax('/cehuaGoods',{
            data:req
        }).then(res=> {
            return dispatch(receiveData(req, res))
        });
    }
}
function shouldFetch(state, req) {

    const { products } = state;
    const {
        isFetching,
    } = products;

    if (isFetching){
        return false
    }
    return true
}

export function fetchProductsIfNeeded(req) {
    // console.log(23)
    return (dispatch, getState)=> {
        // console.log(111)
        // console.log(shouldFetchCourse(getState(), req))
        if (shouldFetch(getState(), req)) {
            return dispatch(fetchData(req))
        }
    }
}


export function reRenderProducts(req) {
    return {
        type: 'RE_RENDER_PRODUCTS',
        req:req,
    }
}
