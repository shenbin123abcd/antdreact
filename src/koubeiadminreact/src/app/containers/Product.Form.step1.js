import {fetchProductsIfNeeded} from '../actions/products'
import {destroyProductGiftsShop_ids} from '../actions/product'
import {fetchShopsIfNeeded} from '../actions/shops'
import {submitProductForm1,goProductForm1} from '../actions/product.from'
import renderShops from '../util/renderShops'
import timeHandler1 from '../util/timeHandler1'
import stateHandler from '../util/stateHandler'
import Operations from '../containers/Products.Operations'

var hashHistory=ReactRouter.hashHistory;
let Link=ReactRouter.Link;
var { Table, Icon, Tabs,Form, Input, Row, Col, Button, DatePicker,Select,Modal,InputNumber,Popover} = antd;

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;
function noop() {
    return false;
}
const content = (
    <div>
        <p className="my-p">活动套餐：可报名参加口碑活动，使用口碑统一套餐详情页展示。</p>
        <p className="my-p">普通套餐：使用个性化定制的套餐详情页展示，不可参与口碑活动。</p>
    </div>
);

const checkSubjectPrice=(rule, value, callback) =>{
    // console.log(value)
    var newValue=Number(value);
    if (value <= 0 || value > 5000) {
        callback(new Error('价格必须在0-5000之间'));
    } else {
        callback();
    }
};

const checkSubjectRange=(rule, value, callback) =>{
    // console.log(value)
    var newStr=String(value);
    if (hb.util.len(newStr) >40) {
        callback(new Error('不能超过20汉字，40个字符'));
    } else {
        callback();
    }
};

var FormBox = React.createClass({
    handlerUrlChange(ev){
        // console.log('url',ev);

    },
    componentDidMount:function(){

    },
    componentWillUnmount(nextProps){

    },


    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    },



    distroyGiftShop_ids() {
        const { dispatch } = this.props;
        // console.log(1);
        dispatch(destroyProductGiftsShop_ids());
    },




    handlePrev(e) {
        const { dispatch } = this.props;

        e.preventDefault();
        dispatch(goProductForm1());
    },

    handleSubmit(e) {
        e.preventDefault();
        const { dispatch,shops,product } = this.props;
        this.props.form.validateFields((errors, values) => {
            // console.log(values);
            if (errors) {
                console.log('Errors in form!!!');
                return;
            }
            // console.log('Submit!!!');
            dispatch(submitProductForm1(values));
        });
    },



    render: function() {
        const { dispatch,shops,product } = this.props;
        // console.log(this.props)
        var data;

        const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        const formLayoutCol1 = {
            span: 8 ,

        };
        const formLayoutCol2 = {
            span: 8 ,
            offset: 1 ,
        };
        var shop_idsValue ;

        if(this.props.type=='add'){
            shop_idsValue=undefined;
            data={}
        }else if(this.props.type=='update'){
            if(product){
                data=product.data;
            }
            if(shops.data&&data.shop){
                shop_idsValue=_.map(data.shop,'shop_id');
            }else{
                shop_idsValue=undefined;
            }

        }
        const renderBts= () =>{
            if(this.props.type=='add'){
                return(
                    <FormItem wrapperCol={{ span: 17, offset: 2 }}>
                        <Button type="primary" onClick={this.handleSubmit}>下一步</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="ghost" onClick={e=>hashHistory.go(-1)}>取消</Button>
                    </FormItem>
                )
            }else if(this.props.type=='update'){
                return(

                    <FormItem wrapperCol={{ span: 17, offset: 2 }}>
                        <Button type="primary" onClick={this.handleSubmit}>下一步</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="ghost" onClick={e=>hashHistory.go(-1)}>取消</Button>
                    </FormItem>
                )
            }
        };
        const showOriginalPrice= () =>{
            var price_mode=this.props.form.getFieldValue('price_mode');
            if(price_mode=='FIX'){
                return (
                    <Col {...formLayoutCol2} >
                        <FormItem
                            {...formItemLayout}
                            label="原价"
                        >
                            {getFieldDecorator('original_price', {
                                initialValue: Number(data.original_price)||'',
                                rules: [
                                    { required: true, message: '必填' ,type:'number' },{
                                        validator: checkSubjectPrice,
                                    }
                                ],
                            })(
                                <InputNumber style={{ width: '100%' }} step={0.01}  placeholder="请输入套餐原价" />
                            )}
                        </FormItem>
                    </Col>
                )
            }else if(price_mode=='FLOAT'){
                return null
            }
        };

        return (
            <Form horizontal >
                <Row >
                    <Col {...formLayoutCol1} >
                        <FormItem
                            {...formItemLayout}
                            label="套餐名称"
                        >
                            {getFieldDecorator('subject', {
                                initialValue: data.subject||'',
                                rules: [
                                    { required: true, message: '必填'  },{
                                        validator: checkSubjectRange,
                                    }
                                ],


                            })(
                                <Input placeholder="请输入套餐名称" />
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayoutCol2} >
                        <div className="group-control-box">
                            <FormItem
                                {...formItemLayout}
                                label="套餐类型" >

                                {getFieldDecorator('price_mode', {
                                    initialValue: data.price_mode||'FIX',
                                    rules: [
                                        { required: true, message: '必填' },
                                    ],
                                })(
                                    <Select disabled={this.props.type=='add'?false:true}
                                            placeholder="套餐类型"
                                    >
                                        <option key="FIX">活动套餐</option>
                                        <option key="FLOAT">普通套餐</option>
                                    </Select>
                                )}
                            </FormItem>
                            <Popover content={content} arrowPointAtCenter={true} title="套餐类型区别" trigger="click" placement="bottomLeft">
                                <Icon type="question-circle-o" className="my-icon"/>
                            </Popover>

                        </div>
                    </Col>

                </Row>
                <Row >
                    <Col {...formLayoutCol1} >
                        <FormItem
                            {...formItemLayout}
                            label="折扣价"
                        >
                            {getFieldDecorator('price', {
                                initialValue: Number(data.price)||'',
                                rules: [
                                    { required: true, message: '必填',type:'number' },{
                                        validator: checkSubjectPrice,
                                    }
                                ],
                            })(
                                <InputNumber style={{ width: '100%' }} step={0.01} placeholder="请输入套餐折扣价" />
                            )}
                        </FormItem>
                    </Col>

                    {
                        showOriginalPrice()
                    }

                </Row>

                <Row >
                    <Col {...formLayoutCol1} >
                        <div className="group-control-box">
                            <FormItem
                                {...formItemLayout}
                                label="有效期"
                            >
                                {getFieldDecorator('validity_period', {
                                    initialValue: data.validity_period||'360',
                                    rules: [
                                        { required: true, message: '必填'  },
                                    ],
                                })(
                                    <Select
                                        placeholder="有效期"
                                    >
                                        <option key="30">30天</option>
                                        <option key="90">90天</option>
                                        <option key="180">180天</option>
                                        <option key="360">360天</option>
                                    </Select>
                                )}

                            </FormItem>
                            <Popover content={<div>用户购买后，没有在有效期内核销，则自动退款给用户</div>} arrowPointAtCenter={true} title="有效期说明" trigger="click" placement="bottomLeft">
                                <Icon type="question-circle-o" className="my-icon"/>
                            </Popover>
                        </div>
                    </Col>

                    <Col {...formLayoutCol2} >
                        <FormItem
                            {...formItemLayout}
                            label="所属门店"
                        >
                            {getFieldDecorator('shop_ids', {
                                initialValue: shop_idsValue,
                                rules: [
                                    { required: true,  message: '必填' ,type: 'array'},
                                ],
                            })(
                                <Select
                                    multiple
                                    placeholder="请选择门店"
                                    onChange={this.distroyGiftShop_ids}
                                >
                                    {
                                        shops.data&&shops.data.map((n,i)=>{
                                            var branch_shop_name=n.branch_shop_name;
                                            if(n.branch_shop_name){
                                                branch_shop_name=` - ${n.branch_shop_name}`;
                                            }
                                            return (
                                                <Option key={n.shop_id}  >{n.main_shop_name}{branch_shop_name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>

                    { /**/}
                </Row>


                { /*
                 <Row >
                 <Col {...formLayoutCol1} >

                 <FormItem
                 {...formItemLayout}
                 label="定金"
                 >
                 {getFieldDecorator('deposit', {
                 initialValue: Number(data.deposit)||0,
                 })(
                 <InputNumber style={{ width: '100%' }} step={0.01}  placeholder="请输入套餐定金" />
                 )}
                 </FormItem>
                 </Col>

                 </Row>
                */}

                <Row >
                    <Col span={24} >
                        {renderBts()}
                    </Col>
                </Row>
            </Form>
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


