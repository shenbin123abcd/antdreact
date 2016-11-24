


function requestData(data) {
    return {
        type: 'REQUEST_PRODUCT_UPDATE',
        data
    }
}

function receiveData(req, res) {
    // console.log(res)
    return {
        type: 'RECEIVE_PRODUCT_UPDATE',
        req:req,
        data: res,
        receivedAt: new Date().getTime()
    }
}
function receiveDataError(req, res) {
    // console.log(res)
    return {
        type: 'RECEIVE_PRODUCT_UPDATE_ERROR',
        req:req,
        data: res,
        receivedAt: new Date().getTime()
    }
}

function fetchData(req) {
    return dispatch => {
        let postData=req;
        dispatch(requestData(postData));
        // console.log(req)
        return app.ajax('/cehuaGoods/update',{
            method :'POST',
            data:postData,
        }).then(res=> {
            if(res.iRet==1){
                return dispatch(receiveData(postData, res));
            }else{
                return dispatch(receiveDataError(postData, res.info));
            }
        },res=>{
            return dispatch(receiveDataError(postData, '网络繁忙请稍候再试'));
        });
    }
}
function shouldFetch(state, req,req2) {

    const { products } = state;
    const {
        isUpdating,
    } = products;
    if (isUpdating){
        return false
    }
    return true
}

export function fetchProductUpdateIfNeeded(req) {
    // console.log(23)
    return (dispatch, getState)=> {
        // console.log(111)
        // console.log(shouldFetchCourse(getState(), req))
        if (shouldFetch(getState(), req)) {
            return dispatch(fetchData(req))
        }
    }
}

export function cancelProductUpdateError(data) {
    // console.log(23)
    return {
        type: 'CANCEL_PRODUCT_UPDATE_ERROR',
        data
    }
}

