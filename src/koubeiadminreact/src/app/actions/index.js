export const REQUEST_INDEX_DATA='REQUEST_INDEX_DATA';
export const RECEIVE_INDEX_DATA='RECEIVE_INDEX_DATA';

function requestData(data) {
    return {
        type: 'REQUEST_INDEX_DATA',
        data
    }
}

function receiveData(data) {
    return {
        type: 'RECEIVE_INDEX_DATA',
        data
    }
}

function receiveDataError(data) {
    return {
        type: 'RECEIVE_INDEX_DATA_ERROR',
        data
    }
}

function fetchData(req) {
    return dispatch => {
        dispatch(requestData('receive'));

        // console.log(req)
        return app.service.auth({
            app_auth_code:req.app_auth_code,
            auth_code:req.auth_code,
        }).then((res)=>{
            if(res.iRet==1){
                hb.Cookies.set('koubei_token',res.data.token,{ expires: 1/24*10 });
                dispatch(receiveData(res));
            }else if(res.iRet==-2){
                window.location.href=res.data;
            }
        },(res)=>{
            hb.Cookies.set('koubei_token_error_info',res,{ expires: 1/24*10 });
            dispatch(receiveDataError(res));
        });
    }
}
function shouldFetch(state) {

    const { index } = state;
    const {
        isFetching,
        } = index;

    if (isFetching){
        return false
    }
    return true
}

export function fetchIndexIfNeeded(req) {
    return (dispatch, getState)=> {
        if (shouldFetch(getState())) {
            return dispatch(fetchData(req))
        }
    }
}

