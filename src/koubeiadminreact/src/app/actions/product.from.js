
function requestData(data) {
    return {
        type: 'REQUEST_PRODUCT_PUT_ON_SHELF',
        data
    }
}

function receiveData(req, res) {
    // console.log(res)
    return {
        type: 'RECEIVE_PRODUCT_PUT_ON_SHELF',
        req:req,
        data: res,
        receivedAt: new Date().getTime()
    }
}
function receiveDataError(req, res) {
    // console.log(res)
    return {
        type: 'RECEIVE_PRODUCT_PUT_ON_SHELF_ERROR',
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
        return app.ajax('/cehuaGoods/resume',{
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

export function fetchProductPutOnShelfIfNeeded(req,req2) {
    // console.log(23)
    return (dispatch, getState)=> {
        // console.log(111)
        // console.log(shouldFetchCourse(getState(), req))
        if (shouldFetch(getState(), req,req2)) {
            return dispatch(fetchData(req,req2))
        }
    }
}


export function submitProductForm1(data) {
    // console.log(23)
    return {
        type: 'SUBMIT_PRODUCT_FORM_1',
        data,
    }
}
export function goBackProductForm1(data) {
    // console.log(23)
    return {
        type: 'GO_BACK_PRODUCT_FORM_1',
        data,
    }
}


export function submitProductForm2(data) {
    // console.log(23)
    return {
        type: 'SUBMIT_PRODUCT_FORM_2',
        data,
    }
}

export function goBackProductForm2(data) {
    // console.log(23)
    return {
        type: 'GO_BACK_PRODUCT_FORM_2',
        data,
    }
}


export function submitProductForm3(data) {
    // console.log(23)
    return {
        type: 'SUBMIT_PRODUCT_FORM_3',
        data,
    }
}

export function goBackProductForm3(data) {
    // console.log(23)
    return {
        type: 'GO_BACK_PRODUCT_FORM_3',
        data,
    }
}



export function submitProductForm4(data) {
    // console.log(23)
    return {
        type: 'SUBMIT_PRODUCT_FORM_4',
        data,
    }
}

export function goBackProductForm4(data) {
    // console.log(23)
    return {
        type: 'GO_BACK_PRODUCT_FORM_4',
        data,
    }
}



export function submitProductForm5(data) {
    // console.log(23)
    return {
        type: 'SUBMIT_PRODUCT_FORM_5',
        data,
    }
}







export function receiveProductPutOnShelf(req) {
    // console.log(res)
    return {
        type: 'RECEIVE_PRODUCT_PUT_ON_SHELF',
        req:{id:req},
    }
}

export function goProductFormStage(data) {
    // console.log(23)
    return {
        type: 'GO_PRODUCT_FORM_STAGE',
        data,
    }
}
