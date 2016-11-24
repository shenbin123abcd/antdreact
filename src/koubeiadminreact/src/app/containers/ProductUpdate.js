import {fetchProductsIfNeeded} from '../actions/products'
import {fetchShopsIfNeeded} from '../actions/shops'
import {fetchProductIfNeeded,updateProductTopImages,addProductTopImages,destroyProduct} from '../actions/product'
import {cancelProductUpdateError} from '../actions/product.update'
import PageLoading from '../components/PageLoading'
import imagesOptions from '../config/plupload.config'
import Operations from '../containers/Product.Operations.upload'


import FormStep1 from '../containers/Product.Form.step1'
import FormStep2 from '../containers/Product.Form.step2'
import FormStep3 from '../containers/Product.Form.step3'
import FormStep4 from '../containers/Product.Form.step4'
import FormStep5 from '../containers/Product.Form.step5'


var hashHistory=ReactRouter.hashHistory;
let Link=ReactRouter.Link;
var { Table, Icon, Tabs,Form, Input, Row, Col, Button, DatePicker,Select,Modal, Upload, message ,Spin,Breadcrumb} = antd;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;



// var Operations = React.createClass({
//     componentDidMount:function(){
//
//     },
//     upload:null,
//     componentDidUpdate(prevProps,prevState){
//         if(this.upload){
//             this.upload.destroy();
//             this.upload=null;
//         }else{
//             const { dispatch,routeParams } = this.props;
//             console.log(this.props);
//             var el=this.refs.upload;
//             var opt={
//                 browse_button: el,       //上传选择的点选按钮，**必需**
//                 drop_element: el,        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
//                 filters: {
//                     mime_types : [
//                         { title : "图片文件", extensions : "jpg,gif,png,jpeg" },
//                     ]
//                 },
//                 multipart_params:{
//                     type:'cehua',
//                     module:'top',
//                 },
//                 auto_start:true,
//                 init: {
//                     'FilesAdded': (up, files)=> {
//                         console.log(files);
//                         var newImages=_.map(files,n=>{
//                             return {
//                                 c_id:n.id
//                             }
//                         });
//                         dispatch(addProductTopImages(newImages));
//
//                         plupload.each(files, function(file) {
//                             // 文件添加进队列后,处理相关的事情
//                             // updateProductTopImages
//
//                             // dispatch(addProductTopImages());
//                             // $scope.$apply(function(){
//                             //     $scope.productData.top_images.push({
//                             //         c_id:file.id,
//                             //     });
//                             //     // vm.applyData.certification=res.url;
//                             // });
//                         });
//                     },
//                     'FileUploaded': (up, file, info)=> {
//                         // console.log(info);
//                         var res = JSON.parse(info.response).data;
//                         // console.log(res)
//                         dispatch(updateProductTopImages(res));
//                         // var img=_.find($scope.productData.top_images,{'c_id':file.id});
//
//                     },
//                     'UploadProgress': function(up, file) {
//                         // console.log(up.total.percent)
//                         // var img=_.find($scope.productData.top_images,{'c_id':file.id});
//
//                     },
//                 }
//             };
//
//             var newOpt=_.assign({},imagesOptions,opt)
//             var uploader = new plupload.Uploader(newOpt);
//             //console.log(uploader);
//             //uploader.setOption();
//             //uploader.refresh();
//             uploader.init();
//             uploader.bind('FilesAdded', function(up, files) {
//                 // console.log(newOpt)
//                 if (newOpt.auto_start) {
//                     setTimeout(function(){
//                         up.start();
//                     }, 0);
//                 }
//                 up.refresh(); // Reposition Flash/Silverlight
//             });
//
//         }
//
//     },
//     render(){
//         const { dispatch,shops,product,iRet} = this.props;
//         // console.log(product)
//         if(product.stage=='2'||product.stage=='3'){
//             return(
//                 <div>
//                     <button ref="upload" type="button" className="ant-btn ant-btn-ghost">
//                         <i  className="anticon anticon-upload"></i><span> 上传图片</span>
//                     </button>
//                 </div>
//             )
//         }else{
//             return (
//                 <span></span>
//             )
//         }
//
//     }
// });


var ProductUpdate = React.createClass({
    handlerUrlChange(ev){
        // console.log('url',ev);

    },
    componentDidMount:function(){
        app.util.setIframeHeight();
        const { dispatch,routeParams } = this.props;
        dispatch(fetchProductIfNeeded(routeParams.id));
        dispatch(fetchShopsIfNeeded());
    },
    componentDidUpdate:function(){
        // console.log(document.documentElement.scrollHeight)
        app.util.setIframeHeight();
        const { dispatch,product } = this.props;
        if(product.isUpdateSuccess){
            message.success('更新成功');
            hashHistory.go(-1);
            // dispatch(destroyProduct());
        }else if(product.isUpdateError){
            // alert(product.updateErrorMsg);
            message.error(product.updateErrorMsg);
            dispatch(cancelProductUpdateError());
            
        }
    },
    componentWillUnmount(nextProps){
        const { dispatch,shops,product } = this.props;
        dispatch(destroyProduct());
        // this.unHandlerUrlChange()
    },
    handleSubmit(e){
        e.preventDefault();

    },
    render: function() {
        const { dispatch,shops,product ,iRet} = this.props;
        // alert(iRet)

        if (product.isFetching) {
            return <PageLoading />
        }else if(product.iRet==1){
            // console.log(product)
            let {data} =product;
            

            // console.log(data)
            return (
                <Spin spinning={product.isUpdating}>
                    <div className="my-page-wrapper">
                        <h2 className="page-title">编辑套餐 - {data.subject} </h2>
                        <div className="breadcrumb-wrapper">
                            <Breadcrumb>
                                <Breadcrumb.Item><Link to="/cehua">首页</Link></Breadcrumb.Item>
                                <Breadcrumb.Item><Link to="/cehua/products">套餐列表</Link></Breadcrumb.Item>
                                <Breadcrumb.Item>编辑套餐</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <Tabs activeKey={product.stage} onTabClick={e=>console.log(e)}
                              tabBarExtraContent={<Operations  />} >
                            <TabPane tab="基本信息" key="1">
                                <FormStep1 type='update' />
                            </TabPane>
                            <TabPane tab="套餐头图" key="2">
                                <FormStep2 type='update' />
                            </TabPane>
                            <TabPane tab="图文详情" key="3"  disabled={product.data.price_mode=='FIX'}>
                                <FormStep3 type='update' />
                            </TabPane>
                            <TabPane tab="服务内容" key="4">
                                <FormStep4 type='update' />
                            </TabPane>
                            <TabPane tab="赠品配置" key="5">
                                <FormStep5 type='update' />
                            </TabPane>
                        </Tabs>
                    </div>
                </Spin>

            )
        }else{
            return (
                <div>数据不存在或已删除</div>
            )
        }
        

      
    }
});

function mapStateToProps(state) {
    const {shops,product}=state;

    
    return {
        shops,
        product,
    }
}

ProductUpdate = Form.create()(ProductUpdate);
export default ReactRedux.connect(mapStateToProps)(ProductUpdate)


