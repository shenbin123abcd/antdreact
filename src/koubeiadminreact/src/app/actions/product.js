
function requestData(data) {
    return {
        type: 'REQUEST_PRODUCT_DETAIL',
        data
    }
}

function receiveData(data) {
    return {
        type: 'RECEIVE_PRODUCT_DETAIL',
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

    const { product } = state;
    const {
        isFetching,
        } = product;

    if (isFetching){
        return false
    }
    return true
}

export function fetchProductIfNeeded(req) {
    return (dispatch, getState)=> {
        if (shouldFetch(getState())) {
            return dispatch(fetchData(req))
        }
    }
}


export function initProduct(data) {
    // console.log(23)
    return {
        type: 'INIT_PRODUCT',
        data,
    }
}

export function destroyProduct(data) {
    // console.log(23)
    return {
        type: 'DESTROY_PRODUCT',
        data,
    }
}


export function setProductCover(data) {
    // console.log(23)
    return {
        type: 'SET_PRODUCT_COVER',
        data,
    }
}
export function removeProductTopImage(data) {
    // console.log(23)
    return {
        type: 'REMOVE_PRODUCT_TOP_IMAGE',
        data,
    }
}
export function removeProductContentImage(data) {
    // console.log(23)
    return {
        type: 'REMOVE_PRODUCT_CONTENT_IMAGE',
        data,
    }
}


export function addProductTopImages(data) {
    // console.log(23)
    return {
        type: 'ADD_PRODUCT_TOP_IMAGES',
        data,
    }
}

export function addProductContentImages(data) {
    // console.log(23)
    return {
        type: 'ADD_PRODUCT_CONTENT_IMAGES',
        data,
    }
}



export function updateProductTopImages(data) {
    // console.log(23)
    return {
        type: 'UPDATE_PRODUCT_TOP_IMAGES',
        data,
    }
}

export function updateProductContentImages(data) {
    // console.log(23)
    return {
        type: 'UPDATE_PRODUCT_CONTENT_IMAGES',
        data,
    }
}

export function updateProductTopImagesOrder(oldIndex,newIndex) {
    // console.log(23)
    return {
        type: 'UPDATE_PRODUCT_TOP_IMAGES_ORDER',
        oldIndex:oldIndex,
        newIndex:newIndex,
    }
}


export function updateProductTopImagesCorrectOrder(data) {
    // console.log(23)
    return {
        type: 'UPDATE_PRODUCT_TOP_IMAGES_CORRECT_ORDER',
        data,
    }
}


export function updateProductContentImagesCorrectOrder(data) {
    // console.log(23)
    return {
        type: 'UPDATE_PRODUCT_CONTENT_IMAGES_CORRECT_ORDER',
        data,
    }
}

export function updateProduct(data) {
    // console.log(23)
    return {
        type: 'UPDATE_PRODUCT',
        data,
    }
}


export function destroyProductGiftsShop_ids(data) {
    // console.log(23)
    return {
        type: 'DESTROY_PRODUCT_GIFTS_SHOP_IDS',
        data,
    }
}

