
export default (state = {
    isFetching: false,
    data: null,
    receivedAt: null
}, action) => {
    switch(action.type) {
        case 'REQUEST_PRODUCTS':
            return _.assign({}, state, {
                isFetching: true,
            });
        case 'RECEIVE_PRODUCTS':
            return _.assign({}, state, {
                isFetching: false,
                data: _.map(action.data.data.list,(n,i)=>{
                    n.key=i;
                    // n.putOnShelfModalVisible=false;
                    // n.isPuttingOnShelf=false;
                    // n.putOffShelfModalVisible=false;
                    return n
                }),
                total: Number(action.data.data.total),
                receivedAt: action.receivedAt,
            });
        case 'PRODUCT_PUT_ON_SHELF_MODAL_SHOW':
            _.find(state.data,{id:action.data}).putOnShelfModalVisible=true;
            return _.assign({}, state);
        case 'PRODUCT_PUT_OFF_SHELF_MODAL_SHOW':
            _.find(state.data,{id:action.data}).putOffShelfModalVisible=true;
            return _.assign({}, state);
        case 'PRODUCT_PUT_ON_SHELF_MODAL_SHOW2':
            // var newState=_.cloneDeep(state);
            // _.find(newState.data,{id:action.data}).putOnShelfModalVisible=true;
            // console.log(action.data)
            _.find(state.data,{id:action.data}).isPuttingOnShelf=true;
            return state;
        case 'PRODUCT_PUT_ON_SHELF_MODAL_HIDE':
            _.find(state.data,{id:action.data}).putOnShelfModalVisible=false;
            return _.assign({}, state);
        case 'PRODUCT_PUT_OFF_SHELF_MODAL_HIDE':
            _.find(state.data,{id:action.data}).putOffShelfModalVisible=false;
            return _.assign({}, state);
        case 'REQUEST_PRODUCT_PUT_ON_SHELF':
            // newState=_.cloneDeep(state);
            // console.log('REQUEST_PRODUCT_PUT_ON_SHELF',state.data,action)
            _.find(state.data,{id:action.data.id}).isPuttingOnShelf=true;
            return state;
        case 'REQUEST_PRODUCT_PUT_OFF_SHELF':
            // newState=_.cloneDeep(state);
            // console.log('REQUEST_PRODUCT_PUT_ON_SHELF',state.data,action)
            _.find(state.data,{id:action.data.id}).isPuttingOffShelf=true;
            return state;
        case 'RECEIVE_PRODUCT_PUT_ON_SHELF_ERROR':
            // newState=_.cloneDeep(state);
            // console.log(newState.data,action.data)
            _.find(state.data,{id:action.req.id}).isPuttingOnShelf=false;
            return _.assign({}, state);
        case 'RECEIVE_PRODUCT_PUT_OFF_SHELF_ERROR':
            // newState=_.cloneDeep(state);
            // console.log(newState.data,action.data)
            _.find(state.data,{id:action.req.id}).isPuttingOffShelf=false;
            return _.assign({}, state);
        case 'RECEIVE_PRODUCT_PUT_ON_SHELF':
            // newState=_.cloneDeep(state);
            // console.log(newState.data,action.data)
            var newRecord=_.find(state.data,{id:action.req.id});
            // newRecord.isPuttingOnShelf=false;
            // newRecord.putOnShelfModalVisible=false;
            newRecord.state='1';
            return _.assign({}, state);
        case 'RECEIVE_PRODUCT_PUT_OFF_SHELF':
            // newState=_.cloneDeep(state);
            // console.log(newState.data,action.data)
            var newRecord=_.find(state.data,{id:action.req.id});
            // newRecord.isPuttingOffShelf=false;
            // newRecord.putOffShelfModalVisible=false;
            newRecord.state='0';
            return _.assign({}, state);
        case 'RE_RENDER_PRODUCTS':
            return _.assign({}, state);
        default:
            return state
    }
}

