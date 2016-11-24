
var { message, Button} = antd;

function requestData(data) {
    return {
        type: 'REQUEST_PRODUCT_PUT_OFF_SHELF',
        data
    }
}

function receiveData(req, res) {
    // console.log(res)
    return {
        type: 'RECEIVE_PRODUCT_PUT_OFF_SHELF',
        req:req,
        data: res,
        receivedAt: new Date().getTime()
    }
}
function receiveDataError(req, res) {
    // console.log(res)
    return {
        type: 'RECEIVE_PRODUCT_PUT_OFF_SHELF_ERROR',
        req:req,
        data: res,
        receivedAt: new Date().getTime()
    }
}

function fetchData(req,req2) {
    return dispatch => {
        let postData=_.assign({id:req},req2);
        dispatch(requestData(postData));

        // console.log(req)
        return app.ajax('/cehuaGoods/forbid',{
            method :'POST',
            data:postData,
        }).then(res=> {
            if(res.iRet==0){
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
        isPuttingOnShelf,
    } = products;
    if (isPuttingOnShelf){
        return false
    }
    return true
}

export function fetchProductPutOffShelfIfNeeded(req,req2) {
    // console.log(23)
    return (dispatch, getState)=> {
        // console.log(111)
        // console.log(shouldFetchCourse(getState(), req))
        if (shouldFetch(getState(), req,req2)) {
            return dispatch(fetchData(req,req2))
        }
    }
}


export function productPutOffShelfModalShow(data) {
    // console.log(23)
    return {
        type: 'PRODUCT_PUT_OFF_SHELF_MODAL_SHOW',
        data,
    }
}

export function productPutOffShelfModalHide(data) {
    // console.log(23)
    return {
        type: 'PRODUCT_PUT_OFF_SHELF_MODAL_HIDE',
        data,
    }
}



export function receiveProductPutOffShelf(req) {
    // console.log(res)
    return {
        type: 'RECEIVE_PRODUCT_PUT_OFF_SHELF',
        req:{id:req},
    }
}
