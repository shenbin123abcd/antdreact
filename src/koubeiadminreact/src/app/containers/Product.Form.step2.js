import {fetchProductsIfNeeded} from '../actions/products'
import {updateProductTopImages,updateProductTopImagesOrder,setProductCover,removeProductTopImage,addProductTopImages} from '../actions/product'
import {fetchShopsIfNeeded} from '../actions/shops'
import {submitProductForm2,goBackProductForm1,submitProductForm3,goProductFormStage} from '../actions/product.from'
import renderShops from '../util/renderShops'
import timeHandler1 from '../util/timeHandler1'
import stateHandler from '../util/stateHandler'
import Operations from '../containers/Products.Operations'
import imagesOptions from '../config/plupload.config'



var hashHistory=ReactRouter.hashHistory;
let Link=ReactRouter.Link;
var { Table, Icon, Tabs,Form, Input, Row, Col, Button, DatePicker,Select,Modal,InputNumber,Spin,message} = antd;



const SortableItem = React.createClass({
    setCover(){
        var {value,dispatch}=this.props;
        switch (true){
            case !value.url:
                message.warning('请等待图片上传完毕才能设置封面');
                return;
        }
        dispatch(setProductCover(value.id));
    },
    removeImg(){
        var {value,dispatch}=this.props;
        // switch (true){
        //     case !value.url:
        //         message.warning('请等待图拍上传完毕才能删除');
        //         return;
        // }
        dispatch(removeProductTopImage(value.id||value.c_id));
    },
    render(){
        // console.log(this.props)
        var {value,product}=this.props;
        var imgSrc;
        if(Modernizr.chrome){
            imgSrc=`${value.url}@1e_1c_0o_0l_345h_460w.webp`;
        }else{
            imgSrc=`${value.url}@1e_1c_0o_0l_345h_460w`;
        }
        
        const renderBt=()=>{
            if(product.data.cover&&product.data.cover==value.id){
                return(
                    <h3 className="cover-box">
                        封面
                    </h3>
                )
            }else{
                return(
                    <div className="bt-box">
                        <Row>
                            <Button onClick={this.setCover} className="bt set-cover" type="primary">设为封面</Button>
                        </Row>
                        <Row>
                            <Button onClick={this.removeImg} className="bt delete" type="primary">删除</Button>
                        </Row>
                    </div>
                )
            }

        };

        return (
            <li className="images-wrapper-box" data-id={value.url?value.id:value.c_id}>
                <Spin spinning={value.url?false:true}>
                    <div className="images-wrapper-inner">
                        {
                            value.url?<img className='img' src={`${imgSrc}`}  />:''
                            // value.id
                            //<img className='img' src={`${imgSrc}`}  />
                            //<img className='img' src={`http://dashboard-static.halobear.cn/cehua/20161015/5801a0ed2cf96.jpg@1e_1c_0o_0l_225h_300w.webp`}  />
                        }
                    </div>
                </Spin>
                {
                    renderBt()
                }

            </li>
        )
    }

});




const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;

var FormBox = React.createClass({
    sortable:null,
    upload2:null,
    initUpload2(){
        const { dispatch,shops,product } = this.props;
        var el2=this.refs.upload2;
        // if(this.upload2){
        //     this.upload2.destroy();
        //     this.upload2=null;
        // }
        var opt={
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
                    // console.log('FilesAdded');
                    var newImages=_.map(files,n=>{
                        return {
                            c_id:n.id
                        }
                    });

                    dispatch(addProductTopImages(newImages));
                },
                'FileUploaded': (up, file, info)=> {
                    // console.log('FileUploaded');
                    var res = JSON.parse(info.response).data;
                    var img=_.find(product.data.top_images,{'c_id':file.id});
                    var theImg=_.assign(img,res)
                    // console.log(theImg);
                    dispatch(updateProductTopImages(theImg));
                },
                'UploadProgress': function(up, file) {
                },
            }
        };
        if(!this.upload2){
            if(el2){
                var newOpt=_.assign({},imagesOptions,opt);
                // console.log(' new plupload');
                this.upload2 = new plupload.Uploader(newOpt);

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
    },
    componentDidMount:function(){
        // console.log('componentDidMount');
        // console.log(this.refs.sortable);
        const { dispatch,shops,product } = this.props;
        var top_images=product.data.top_images;
        var el=this.refs.sortable;
        this.sortable = window.Sortable.create(el,{
            animation: 150,
            onEnd:  (/**Event*/evt)=> {
                //evt.oldIndex;  // element's old index within parent
                //evt.newIndex;  // element's new index within parent
                // console.log(evt,evt.oldIndex,evt.newIndex)
                // console.log(top_images[0].id)
                // var t = top_images[evt.oldIndex];
                // top_images[evt.oldIndex] = top_images[evt.newIndex];
                // top_images[evt.newIndex] = t;
                // console.log(top_images[0].id,top_images[1].id)
                // console.log('this.sortable.toArray()',this.sortable.toArray())
                // this.sortable.destroy();
                // this.sortable=null;
                // setTimeout(function () {
                //     dispatch(updateProductTopImagesOrder(evt.oldIndex,evt.newIndex));
                // },2000)
            },
        });
        this.initUpload2();


    },

    componentDidUpdate(prevProps,prevState){
        const { dispatch,shops,product } = this.props;
        // console.log('componentDidUpdate',this.refs.upload2,this.upload2);
        this.initUpload2();

    },
    componentWillUnmount(nextProps){
        // console.log('componentWillUnmount',this);

        if(this.upload2){
            this.upload2.destroy();
        }
        this.upload2=null;
    },
    
    handlePrev(e) {
        const { dispatch,product } = this.props;
        // e.preventDefault();
        // console.log(product.top_images);
        // console.log('this.sortable.toArray()',this.sortable.toArray())

        switch (true){
            case product.data.top_images.length==0:
                message.warning('请上传图片');
                return;
                break;

            case product.data.top_images.length>5:
                message.warning('最多只能上传5张图片，请删除部分图片');
                return;
                break;

            case !product.data.cover:
                message.warning('请设置封面');
                return;
                break;

            case !_.every(product.data.top_images,'url'):
                message.warning('请等待图片上传完毕');
                return;
                break;
        }
        dispatch(goBackProductForm1(this.sortable.toArray()));
    },

    handleSubmit(e) {
        // e.preventDefault();
        const { dispatch,shops,product } = this.props;
        // console.log(product.top_images);

        switch (true){
            case product.data.top_images.length==0:
                message.warning('请上传图片');
                return;
                break;
            case product.data.top_images.length>5:
                message.warning('最多只能上传5张图片，请删除部分图片');
                return;
                break;
            case !product.data.cover:
                message.warning('请设置封面');
                return;
                break;

            case !_.every(product.data.top_images,'url'):
                message.warning('请等待图片上传完毕');
                return;
                break;
        }


        if(product.data.price_mode=='FIX'){
            dispatch(submitProductForm2(this.sortable.toArray()));
            dispatch(goProductFormStage('4'));
        }else{
            dispatch(submitProductForm2(this.sortable.toArray()));
        }





        // this.props.form.validateFields((errors, values) => {
        //     console.log(values);
        //     if (errors) {
        //         console.log('Errors in form!!!');
        //         return;
        //     }
        //     console.log('Submit!!!');
        //     dispatch(submitProductForm1(values));
        // });
    },


    render: function() {
        const { dispatch,shops,product } = this.props;
        // console.log('render',product);
        var data;

        const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 17 },
        };
        const formLayoutCol1 = {
            span: 8 ,
            offset: 3 ,
        };
        const formLayoutCol2 = {
            span: 8 ,
            offset: 1 ,
        };
        var shop_idsValue ;

        if(this.props.type=='add'){
            shop_idsValue=undefined;
            data=product.data
        }else if(this.props.type=='update'){
            if(product){
                data=product.data;
            }
            if(shops.data){
                shop_idsValue=_.map(shops.data,'shop_id');
            }else{
                shop_idsValue=undefined;
            }
        }
        // console.log(data)

        const renderBts= () =>{
            if(this.props.type=='add'){
                return(
                    <FormItem wrapperCol={{ span: 17, offset: 0 }}>
                        <Button type="primary" onClick={this.handleSubmit}>下一步</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="ghost" onClick={this.handlePrev}>上一步</Button>
                    </FormItem>
                )
            }else if(this.props.type=='update'){
                return(
                    <FormItem wrapperCol={{ span: 17, offset: 0 }}>
                        <Button type="primary" onClick={this.handleSubmit}>下一步</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="ghost" onClick={this.handlePrev}>上一步</Button>
                    </FormItem>
                )
            }
        };
        const renderNoImg= () =>{
            if(data.top_images&&data.top_images.length==0){
                return(
                    <div ref="upload2" className="product-pic-empty">
                        <p>还未上传图片哟~</p>
                    </div>
                )
            }else{
                return (
                    null
                )
            }
        };
        // console.log(data.top_images[0].id,data.top_images[1].id)


        return (
            <div>
                <ul ref="sortable"  className="images-wrapper cf" >
                    {
                        data.top_images&&data.top_images.map((value, index) =>{
                            return (
                                <SortableItem key={`item-${index}`} dispatch={dispatch}  product={product} index={index} value={value} />
                            )
                        })
                    }
                </ul>
                {renderNoImg()}
                <p className="images-message">图片建议尺寸在1242px*698px，文件大小不超过5M,支持的图片格式为png、jpeg、jpg或gif，最多可上传5张图片</p>
                <Row >
                    <Col span={24} >
                        {renderBts()}
                    </Col>
                </Row>
            </div>
        )



    }
});

function mapStateToProps(state) {
    const {shops,product}=state;
    return {
        shops,
        product,
    }
}
FormBox = Form.create()(FormBox);

export default ReactRedux.connect(mapStateToProps)(FormBox)


