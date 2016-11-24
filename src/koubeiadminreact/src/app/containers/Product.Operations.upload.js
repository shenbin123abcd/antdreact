import imagesOptions from '../config/plupload.config'

import {fetchProductIfNeeded,updateProductTopImages,addProductTopImages,updateProductContentImages,addProductContentImages} from '../actions/product'

var Operations = React.createClass({
    componentDidMount:function(){

    },
    upload2:null,
    upload3:null,
    componentDidUpdate(prevProps,prevState){
        // console.log('componentDidUpdate prevProps',this.props);
        var opt;
        const { dispatch,routeParams ,product} = this.props;

        if(product.stage=='2'){
            var el2=this.refs.upload2;
            if(this.upload3){
                this.upload3.destroy();
                this.upload3=null;
            }
        }else if(product.stage=='3'){
            var el3=this.refs.upload3;
            if(this.upload2){
                this.upload2.destroy();
                this.upload2=null;
            }
        }else{
            if(this.upload2){
                this.upload2.destroy();
                this.upload2=null;
            }
            if(this.upload3){
                this.upload3.destroy();
                this.upload3=null;
            }
            return <span></span>
        }

        if(product.stage=='2'){

            opt={
                browse_button: el2,       //上传选择的点选按钮，**必需**
                drop_element: el2,        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                filters: {
                    mime_types : [
                        { title : "图片文件", extensions : "jpg,gif,png,jpeg" },
                    ]
                },
                headers:{
                    'Authorization': 'Bearer '+ hb.Cookies.get('koubei_token')
                },
                multipart_params:{
                    type:'cehua',
                    module:'top',
                },
                auto_start:true,
                init: {
                    'FilesAdded': (up, files)=> {
                        // console.log(files);
                        var newImages=_.map(files,n=>{
                            return {
                                c_id:n.id
                            }
                        });



                        dispatch(addProductTopImages(newImages));
                    },
                    'FileUploaded': (up, file, info)=> {
                        // console.log(info);
                        var res = JSON.parse(info.response).data;
                        // console.log(res)
                        var img=_.find(product.data.top_images,{'c_id':file.id});
                        // console.log('img',product.top_images)
                        // res.id=res.aid;
                        var theImg=_.assign(img,res)
                        dispatch(updateProductTopImages(theImg));
                        // var img=_.find($scope.productData.top_images,{'c_id':file.id});

                    },
                    'UploadProgress': function(up, file) {
                        // console.log(up.total.percent)
                        // var img=_.find($scope.productData.top_images,{'c_id':file.id});
                    },
                }
            };

        }
        if(product.stage=='3'){
            // console.log(333333333)
            opt={
                browse_button: el3,       //上传选择的点选按钮，**必需**
                drop_element: el3,        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                filters: {
                    mime_types : [
                        { title : "图片文件", extensions : "jpg,gif,png,jpeg" },
                    ]
                },
                headers:{
                    'Authorization': 'Bearer '+ hb.Cookies.get('koubei_token')
                },
                multipart_params:{
                    type:'cehua',
                    module:'content',
                },
                auto_start:true,
                init: {
                    'FilesAdded': (up, files)=> {
                        // console.log(files);
                        var newImages=_.map(files,n=>{
                            return {
                                c_id:n.id
                            }
                        });

                        dispatch(addProductContentImages(newImages));
                    },
                    'FileUploaded': (up, file, info)=> {
                        // console.log(info);

                        var res = JSON.parse(info.response).data;
                        // console.log(res)
                        var img=_.find(product.data.content_images,{'c_id':file.id});
                        // console.log('img',product.top_images)
                        // res.id=res.aid;
                        var theImg=_.assign(img,res);
                        dispatch(updateProductContentImages(theImg));
                        // var img=_.find($scope.productData.top_images,{'c_id':file.id});

                    },
                    'UploadProgress': function(up, file) {
                        // console.log(up.total.percent)
                        // var img=_.find($scope.productData.top_images,{'c_id':file.id});
                    },
                }
            };

        }

        var newOpt=_.assign({},imagesOptions,opt)
        if(product.stage=='2'){
            if(!this.upload2){

                this.upload2 = new plupload.Uploader(newOpt);

                // console.log(435433455);
                //this.upload.setOption();
                //this.upload.refresh();
                this.upload2.init();
                this.upload2.bind('FilesAdded', function(up, files) {
                    if (newOpt.auto_start) {
                        // console.log(12313,newOpt)
                        setTimeout(function(){
                            up.start();
                        }, 0);
                    }
                    up.refresh(); // Reposition Flash/Silverlight
                });
            }
        }

        if(product.stage=='3'){
            if(!this.upload3){

                this.upload3 = new plupload.Uploader(newOpt);
                //console.log(this.upload);
                //this.upload.setOption();
                //this.upload.refresh();
                this.upload3.init();
                this.upload3.bind('FilesAdded', function(up, files) {
                    if (newOpt.auto_start) {
                        // console.log(12313,newOpt)
                        setTimeout(function(){
                            up.start();
                        }, 0);
                    }
                    up.refresh(); // Reposition Flash/Silverlight
                });
            }

        }

    },


    componentWillUnmount(nextProps){
        this.upload2=null;
        this.upload3=null;
    },

    render(){
        const { dispatch,shops,product,iRet} = this.props;
        // console.log(product)
        
        if(product.stage=='2'){
            return(
                <div>
                    <button ref="upload2" type="button" className="ant-btn ant-btn-primary">
                        <i  className="anticon anticon-upload"></i><span> 上传图片</span>
                    </button>
                </div>
            )
        }else if(product.stage=='3'){
            return(
                <div>
                    <button ref="upload3" type="button" className="ant-btn ant-btn-primary">
                        <i  className="anticon anticon-upload"></i><span> 上传图片</span>
                    </button>
                </div>
            )
        }else{
            if(this.upload2){
                this.upload2.destroy();
                this.upload2=null;
            }
            if(this.upload3){
                this.upload3.destroy();
                this.upload3=null;
            }
            return (
                null
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

export default ReactRedux.connect(mapStateToProps)(Operations)