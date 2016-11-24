
export default (state = {
    isFetching: false,
    isUpdating: false,
    isUpdateError: false,
    updateErrorMsg: '',
    isUpdateSuccess: false,
    isCreating: false,
    isCreateError: false,
    createErrorMsg: '',
    isCreateSuccess: false,
    data: null,
    iRet: null,
    form_1_post_data: null,
    form_2_post_data: null,
    form_3_post_data: null,
    form_4_post_data: null,
    form_5_post_data: null,
    stage: '1',
}, action) => {
    switch(action.type) {
        case 'INIT_PRODUCT':
            return Object.assign({}, state, {
                isFetching: false,
                data: {
                    top_images:[],
                    content_images:[],
                    gifts:[],
                },
                iRet: null,
                stage: '1',
            });
        case 'DESTROY_PRODUCT':
            return Object.assign({}, state, {
                isFetching: false,
                isUpdating: false,
                isUpdateError: false,
                updateErrorMsg: '',
                isUpdateSuccess: false,
                isCreating: false,
                isCreateError: false,
                createErrorMsg: '',
                isCreateSuccess: false,
                data: {
                    top_images:[],
                    content_images:[],
                    gifts:[],
                },
                iRet: null,
                form_1_post_data: null,
                form_2_post_data: null,
                form_3_post_data: null,
                form_4_post_data: null,
                form_5_post_data: null,
                stage: '1',
            });
        case 'REQUEST_PRODUCT_DETAIL':
            return Object.assign({}, state, {
                isFetching: true,
            });
        case 'RECEIVE_PRODUCT_DETAIL':
            // console.log(action.data.data)
            if(true){
                // console.log('RECEIVE_PRODUCT_DETAIL',action.data);
                let {subject,shop,price,original_price,deposit,price_mode,validity_period}=action.data.data;

                let form_1_post_data={subject,shop_ids:_.map(shop,'shop_id').join(','),price,original_price,deposit,price_mode,validity_period};

                let {zhuchi_level,zhuchi_desc,huazhuang_level,huazhuang_desc,sheying_level,sheying_desc,
                    shexiang_level,shexiang_desc,yingbin,yishi,yanhui,huayi,dengguang,daoju,buyer_notes}=action.data.data;

                let form_4_post_data={zhuchi_level,zhuchi_desc,huazhuang_level,huazhuang_desc,sheying_level,sheying_desc,
                    shexiang_level,shexiang_desc,yingbin,yishi,yanhui,huayi,dengguang,daoju,buyer_notes};
                let {gifts}=action.data.data;
                gifts=_.map(gifts,n=>{
                    let {shop_ids,start_time,end_time,id=0,tag,remark}=n;

                    return {
                        shop_ids,start_time,end_time,id,tag,remark
                    }
                });
                let form_5_post_data={
                    gifts:JSON.stringify(gifts)
                };

                let {top_images,cover}=action.data.data;
                let form_2_post_data={
                    top_images:_.map(top_images,'id').join(','),
                    cover,
                };

                let {content_images}=action.data.data;

                let form_3_post_data={
                    content_images:_.map(content_images,'id').join(','),
                };



                _.assign(action.data.data,{shop_ids:_.map(shop,'shop_id').join(',')});


                // console.log(state);

                return _.assign({}, state, {
                    isFetching: false,
                    data: action.data.data,
                    iRet: action.data.iRet,
                    form_1_post_data: form_1_post_data,
                    form_2_post_data: form_2_post_data,
                    form_3_post_data: form_3_post_data,
                    form_4_post_data: form_4_post_data,
                    form_5_post_data: form_5_post_data,
                });
            }
        case 'SET_PRODUCT_COVER':
            // console.log(action.data)
            state.data.cover=action.data;
            // console.log(state)
            return _.assign({}, state);
        case 'REMOVE_PRODUCT_TOP_IMAGE':
            // console.log(action.data.data)
            // state.data.cover=action.data;
            _.remove(state.data.top_images,n=>{
                if(n.id==action.data||n.c_id==action.data){
                    return n
                }
            });
            // _.remove(state.data.top_images,{c_id:action.data})
            return _.assign({}, state);
        case 'REMOVE_PRODUCT_CONTENT_IMAGE':
            // console.log(action.data)
            // state.data.cover=action.data;
            _.remove(state.data.content_images,n=>{
                if(n.id==action.data||n.c_id==action.data){
                    return n
                }
            });
            return _.assign({}, state);
        case 'ADD_PRODUCT_TOP_IMAGES':
            // console.log(action.data);
            // console.log('ADD_PRODUCT_TOP_IMAGES',action.data);
            state.data.top_images=state.data.top_images.concat(action.data);
            // _.assign(state.data.top_images,action.data);
            // console.log(state.data.top_images);
            return Object.assign({}, state);

        case 'ADD_PRODUCT_CONTENT_IMAGES':
            // console.log('ADD_PRODUCT_CONTENT_IMAGES',action.data);
            state.data.content_images=state.data.content_images.concat(action.data);
            // _.assign(state.data.top_images,action.data);
            // console.log(state.data.content_images);
            return Object.assign({}, state);

        case 'UPDATE_PRODUCT_TOP_IMAGES':
            // console.log(state.data.top_images[0].id,state.data.top_images[1].id);
            if(true){
                // var moveItem=state.data.top_images[action.oldIndex];
                // state.data.top_images.splice(action.oldIndex,1);
                // state.data.top_images.splice(action.newIndex,0,moveItem);
                // moveItem=null;
                let item=_.find(state.data.top_images,{id:action.data.id})
                _.assign(item,action.data)
            };

            // console.log(state.data.top_images[0].id,state.data.top_images[1].id);
            return Object.assign({}, state);
        case 'UPDATE_PRODUCT_CONTENT_IMAGES':
            // console.log(state.data.top_images[0].id,state.data.top_images[1].id);
            if(true){
                // var moveItem=state.data.top_images[action.oldIndex];
                // state.data.top_images.splice(action.oldIndex,1);
                // state.data.top_images.splice(action.newIndex,0,moveItem);
                // moveItem=null;
                let item=_.find(state.data.top_images,{id:action.data.id})
                _.assign(item,action.data)
            }

            // console.log(state.data.top_images[0].id,state.data.top_images[1].id);
            return Object.assign({}, state);
        case 'UPDATE_PRODUCT_TOP_IMAGES_ORDER':
            // console.log(state.data.top_images[0].id,state.data.top_images[1].id);
            // var t=state.data.top_images[0]
            // state.data.top_images[0]=state.data.top_images[1]
            // state.data.top_images[1]=t

            // state.data.top_images=action.data;
            // console.log(state.data.top_images);
            // console.log(state.data.top_images[0].id,state.data.top_images[1].id);
            // console.log(state.data.top_images[0].id,state.data.top_images[1].id);
            // console.log(action.oldIndex,action.newIndex);
            if(true){
                let moveItem=state.data.top_images[action.oldIndex];
                state.data.top_images.splice(action.oldIndex,1);
                state.data.top_images.splice(action.newIndex,0,moveItem);
                moveItem=null;
                // console.log(state.data.top_images)     ;
                return _.assign(state);
            }

        case 'UPDATE_PRODUCT_TOP_IMAGES_CORRECT_ORDER':

            console.log(action.data);

            return _.assign(state);
        case 'UPDATE_PRODUCT_CONTENT_IMAGES_CORRECT_ORDER':

            // console.log(action.data);

            return _.assign(state);
        case 'SUBMIT_PRODUCT_FORM_1':

            if(true){
                // console.log(action.data);
                _.assign(state.data,action.data);
                let {subject,shop_ids,price,original_price,deposit,price_mode,validity_period}=action.data;

                state.stage='2';

                let form_1_post_data={subject,shop_ids:shop_ids.join(','),price,original_price,deposit,price_mode,validity_period};
                // console.log(form_1_post_data);

                return _.assign({}, state,{
                    form_1_post_data: form_1_post_data,
                });
            }
        case 'GO_BACK_PRODUCT_FORM_1':
            if(true){
                // console.log(action.data);
                state.stage='1';


                let form_2_post_data={
                    top_images:action.data.join(','),
                    cover:state.data.cover,
                };

                // console.log(23434355,form_2_post_data);
                return Object.assign({}, state,{
                    form_2_post_data: form_2_post_data,
                });
            }

        case 'SUBMIT_PRODUCT_FORM_2':
            if(true){
                // console.log(action.data)
                // console.log(state.data);
                // state.data=state.data={};
                state.stage='3';

                let form_2_post_data={
                    top_images:action.data.join(','),
                    cover:state.data.cover,
                };
                // console.log(form_2_post_data);
                return Object.assign({}, state,{
                    form_2_post_data: form_2_post_data,
                });
            }
        case 'GO_BACK_PRODUCT_FORM_2':
            if(true) {
                // console.log(action.data)
                // state.data=state.data={};
                state.stage = '2';

                let form_3_post_data = {
                    content_images: action.data.join(','),
                };

                // _.assign(state.data,action.data);
                // console.log(state.data);
                return _.assign({}, state, {
                    form_3_post_data: form_3_post_data,
                });
            }

        case 'SUBMIT_PRODUCT_FORM_3':
            if(true) {
                state.stage = '4';
                // console.log(action.data)
                let form_3_post_data = {
                    content_images: action.data.join(','),
                };
                // _.assign(state.data,action.data);
                // console.log(state.data);
                // console.log(action.data,form_3_post_data)
                return _.assign({}, state, {
                    form_3_post_data: form_3_post_data,
                });
            }

        case 'GO_BACK_PRODUCT_FORM_3':
            if(true){

                state.stage='3';
                _.assign(state.data,action.data);
                let {zhuchi_level,zhuchi_desc,huazhuang_level,huazhuang_desc,sheying_level,sheying_desc,
                    shexiang_level,shexiang_desc,yingbin,yishi,yanhui,huayi,dengguang,daoju,buyer_notes}=action.data;
                let form_4_post_data={zhuchi_level,zhuchi_desc,huazhuang_level,huazhuang_desc,sheying_level,sheying_desc,
                    shexiang_level,shexiang_desc,yingbin,yishi,yanhui,huayi,dengguang,daoju,buyer_notes};

                // console.log(form_1_post_data,form_4_post_data,gifts);
                return _.assign({}, state, {
                    form_4_post_data: form_4_post_data,
                });
            }

        case 'SUBMIT_PRODUCT_FORM_4':
            if(true){
                state.stage='5';
                _.assign(state.data,action.data);
                let {zhuchi_level,zhuchi_desc,huazhuang_level,huazhuang_desc,sheying_level,sheying_desc,
                    shexiang_level,shexiang_desc,yingbin,yishi,yanhui,huayi,dengguang,daoju,buyer_notes}=action.data;
                let form_4_post_data={zhuchi_level,zhuchi_desc,huazhuang_level,huazhuang_desc,sheying_level,sheying_desc,
                    shexiang_level,shexiang_desc,yingbin,yishi,yanhui,huayi,dengguang,daoju,buyer_notes};

                return _.assign({}, state, {
                    form_4_post_data: form_4_post_data,
                });

            }

        case 'GO_BACK_PRODUCT_FORM_4':
            if(true){
                state.stage='4';

                state.data.gifts=action.data;
                let gifts=action.data;
                gifts=_.map(gifts,n=>{
                    let {shop_ids,start_time,end_time,id=0,tag,remark}=n;
                    return {
                        shop_ids,start_time,end_time,id,tag,remark
                    }
                });


                let form_5_post_data=JSON.stringify(gifts);

                return _.assign({}, state, {
                    form_5_post_data: form_5_post_data,
                });
            }

        case 'SUBMIT_PRODUCT_FORM_5':
            if(true){

                state.data.gifts=action.data;
                let gifts=action.data;

                gifts=_.map(gifts,n=>{
                    let {shop_ids,start_time,end_time,id=0,tag,remark}=n;
                    return {
                        shop_ids,start_time,end_time,id,tag,remark
                    }
                });

                let form_5_post_data={
                    gifts:JSON.stringify(gifts)
                };

                // console.log('form_5_post_data',form_5_post_data);

                return _.assign({}, state, {
                    form_5_post_data: form_5_post_data,
                });
            }

        case 'REQUEST_PRODUCT_UPDATE':
            if(true){
                return _.assign({}, state, {
                    isUpdating: true,
                });
            }

        case 'RECEIVE_PRODUCT_UPDATE':
            if(true){
                // return state;
                return _.assign({}, state, {
                    isUpdating: false,
                    isUpdateSuccess: true,
                });
            }

        case 'RECEIVE_PRODUCT_UPDATE_ERROR':
            if(true){
                // alert(action.data)
                return _.assign({}, state, {
                    isUpdating: false,
                    isUpdateError: true,
                    updateErrorMsg: action.data,
                });
            }


        case 'CANCEL_PRODUCT_UPDATE_ERROR':
            if(true){
                return _.assign({}, state, {
                    isUpdateError: false,
                });
            }



        case 'REQUEST_PRODUCT_CREATE':
            if(true){
                return _.assign({}, state, {
                    isCreating: true,
                });
            }

        case 'RECEIVE_PRODUCT_CREATE':
            if(true){
                return _.assign({}, state, {
                    isCreating: false,
                    isCreateSuccess: true,
                });
            }

        case 'RECEIVE_PRODUCT_CREATE_ERROR':
            if(true){
                return _.assign({}, state, {
                    isCreating: false,
                    isCreateError: true,
                    createErrorMsg: action.data,
                });
            }


        case 'CANCEL_PRODUCT_CREATE_ERROR':
            if(true){
                return _.assign({}, state, {
                    isCreateError: false,
                });
            }
        case 'GO_PRODUCT_FORM_STAGE':
            if(true){
                // console.log(action.data)
                return _.assign({}, state,{
                    stage: String(action.data),
                });
            }

        case 'DESTROY_PRODUCT_GIFTS_SHOP_IDS':
            if(true){
                // console.log(state);
                state.data.gifts.forEach((n,i)=>{
                    n.shop_ids=''
                });
                return _.assign({}, state,{
                });
            }




        default:
            return state
    }
}

