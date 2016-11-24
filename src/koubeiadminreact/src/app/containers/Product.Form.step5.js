import {submitProductForm5,goBackProductForm4} from '../actions/product.from'
import {fetchProductUpdateIfNeeded} from '../actions/product.update'
import {fetchProductCreateIfNeeded} from '../actions/product.create'
import giftsHandler from '../util/giftsFormHandler'

var hashHistory=ReactRouter.hashHistory;
let Link=ReactRouter.Link;
var { Table, Icon, Tabs,Form, Input, Row, Col, Button, DatePicker,Select,Modal,InputNumber} = antd;
const RangePicker = DatePicker.RangePicker;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;


function onChange(dates, dateStrings) {
    // console.log('From: ', dates[0], ', to: ', dates[1]);
    // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
}

const checkDesRange=(rule, value, callback) =>{
    // console.log(value)
    var newStr=String(value);
    if (hb.util.len(newStr) >200) {
        callback(new Error('不能超过100汉字，200个字符'));
    } else {
        callback();
    }
};
const checkTagRange=(rule, value, callback) =>{
    // console.log(value)
    var newStr=String(value);
    if (hb.util.len(newStr) >30) {
        callback(new Error('不能超过15汉字，30个字符'));
    } else {
        callback();
    }
};

var FormBox = React.createClass({

    componentDidMount:function(){
        if($(window).scrollTop()>300){
            $(window).scrollTop(0);
        }
    },
    componentDidUpdate:function(){
        if($(window).scrollTop()>300){
            $(window).scrollTop(0);
        }
    },
    componentWillUnmount(nextProps){

    },

    handlePrev(e) {
        
        e.preventDefault();
        const { dispatch,product } = this.props;
        this.props.form.validateFields((errors, values) => {
            // console.log(values);
            if (errors) {
                console.log('Errors in form!!!');
                return;
            }
            let gifts=giftsHandler(this.props.form.getFieldsValue());
            // dispatch(submitProductForm5(gifts));
            dispatch(goBackProductForm4(gifts));
        });

    },

    handleSubmit(e) {
        e.preventDefault();
        const { dispatch,shops,product ,form} = this.props;

        // console.log(54654654665,form_2_post_data,form_3_post_data)
        // console.log(form.getFieldValue('keys'));
        // console.log(this.props.form.getFieldsValue());
        // console.log(giftsHandler(this.props.form.getFieldsValue()));
        // console.log({form_1_post_data,top_images_correct_order,form_4_post_data,form_5_post_data})

        this.props.form.validateFields((errors, values) => {
            // console.log(values);
            if (errors) {
                console.log('Errors in form!!!');
                return;
            }
            // console.log('Submit!!!');
            // console.log(giftsHandler(this.props.form.getFieldsValue()));
            // console.log(giftsHandler(this.props.form.getFieldsValue()))
            // return
            let gifts=giftsHandler(this.props.form.getFieldsValue());
            let {form_1_post_data,form_2_post_data,form_3_post_data,form_4_post_data,form_5_post_data} = product;
            dispatch(submitProductForm5(gifts));

            let submitData=_.assign({},form_1_post_data,form_2_post_data,form_3_post_data,form_4_post_data,{gifts:JSON.stringify(gifts)});

            // console.log('submitData',submitData)
            if(this.props.type=='add'){
                dispatch(fetchProductCreateIfNeeded(submitData));
            }

            if(this.props.type=='update'){
                submitData=_.assign(submitData,{
                    id:product.data.id
                });
                dispatch(fetchProductUpdateIfNeeded(submitData));
            }

        });
    },



    componentWillMount() {
        const { dispatch,shops,product } = this.props;
        var data;

        const { getFieldDecorator, getFieldError, isFieldValidating,getFieldValue,getFieldsValue } = this.props.form;

        if(this.props.type=='add'){
            data=[{}];
        }else if(this.props.type=='update'){
            if(product){
                data=product.data.gifts;
            }
        }

        this.props.form.setFieldsValue({
            // keys: [0],
            keys: data,
        });
    },
    remove(index) {
        const { form } = this.props;
        // can use data-binding to get
        let keys = form.getFieldValue('keys');
        keys = keys.filter((key,i) => {
            return i !== index;
        });
        // can use data-binding to set
        form.setFieldsValue({
            keys,
        });
    },
    add() {
        const { form } = this.props;
        // can use data-binding to get
        let keys = form.getFieldValue('keys');
        // let keys = form.getFieldValue();
        // console.log(keys)

        keys = keys.concat({});
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys,
        });
    },

    submit(e) {
        e.preventDefault();
        const { form } = this.props;
        // console.log(form.getFieldValue('keys'));
        // console.log(this.props.form.getFieldsValue());
        console.log(giftsHandler(this.props.form.getFieldsValue()));

        this.props.form.validateFields((errors, values) => {
            if (errors) {
                console.log(errors);
            }
            console.log(values);
        });
    },

    render: function() {
        const { dispatch,shops,product } = this.props;
        // console.log(this.props)
        var data;

        const { getFieldDecorator, getFieldError, isFieldValidating,getFieldValue,getFieldsValue } = this.props.form;

        const formLayoutCol1 = {
            span: 2 ,
            offset: 2 ,
        };
        const formLayoutCol2 = {
            span: 20 ,
        };



        if(this.props.type=='add'){
            data={}
        }else if(this.props.type=='update'){
            if(product){
                data=product.data.gifts;
            }
        }
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 14 },
        };
        const formBtLayout = {
            wrapperCol: { span: 14 ,offset:3},
        };

        const formItems = getFieldValue('keys').map((n,i) => {

            // console.log(n.shop_ids)
            var shop_idsValue ;
            if(shops.data&&n.shop_ids){
                shop_idsValue=n.shop_ids.split(',');
                // shop_idsValue=undefined;
                // shop_idsValue=['2016051200000000000000000000','2016051200000000000000000000'];
            }else{
                shop_idsValue=undefined;
            }

            // var availableShops=shops.data;

            var availableShops=_.filter(shops.data,(n,i)=>{
                if(_.includes(product.data.shop_ids,n.shop_id)){
                    return n;
                }
            });



            
            
            

            
            // console.log(shop_idsValue)
            return (
                <div className="gift-item" key={i}>
                    <Row>
                        {getFieldDecorator(`${i}--id`, {
                            initialValue: n.id||0,
                            rules: [{
                                required: true,
                            }],
                        })(
                            <Input  type="hidden" />
                        )}
                        <FormItem {...formItemLayout} label={`赠品标签：`}>
                            {getFieldDecorator(`${i}--tag`, {
                                initialValue: n.tag||'',
                                rules: [{
                                    required: true,
                                    message: "请填写赠品标签",
                                },{
                                    validator: checkTagRange,
                                }],
                            })(
                                <Input style={{ width: '60%', marginRight: 8 }} />
                            )}
                            <Button onClick={() => this.remove(i)}>删除</Button>
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem {...formItemLayout} label={`赠送时间：`} help='赠送时间到期后，赠送信息将不显示' >
                            {getFieldDecorator(`${i}--c_time_range`, {
                                initialValue: n.start_time?[moment(n.start_time),moment(n.end_time)]:'',
                                rules: [{
                                    required: true,
                                    message: "请选择时间",
                                    type: 'array',
                                }],
                            })(
                                <RangePicker  style={{ width: '60%', marginRight: 8}} onChange={onChange} />
                            )}
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem
                            {...formItemLayout}
                            label="展示门店"
                        >
                            {getFieldDecorator(`${i}--shop_ids`, {
                                initialValue: shop_idsValue,
                                rules: [
                                    { required: true,  message: '必填' , type: 'array'},
                                ],
                            })(
                                <Select
                                    style={{ width: '60%', marginRight: 8}}
                                    multiple
                                    placeholder="请选择门店"
                                >
                                    {
                                        availableShops&&availableShops.map((n,i)=>{
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
                    </Row>
                    <Row>
                        <FormItem {...formItemLayout} label={`描述：`}>
                            {getFieldDecorator(`${i}--remark`, {
                                initialValue: n.remark||'',
                                rules: [{
                                    required: true,
                                    message: "请填写描述",
                                },{
                                    validator: checkDesRange,
                                }],
                            })(
                                <Input type="textarea" rows={3} style={{ width: '60%', marginRight: 8 }} />
                            )}
                        </FormItem>
                    </Row>
                </div>
            );
        });


        const renderBts= () =>{
            if(this.props.type=='add'){
                return(
                    <FormItem {...formBtLayout}>
                        <Button type="primary" onClick={this.handleSubmit}>保存</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="ghost" onClick={this.handlePrev}>上一步</Button>
                    </FormItem>
                )
            }else if(this.props.type=='update'){
                return(
                    <FormItem {...formBtLayout}>
                        <Button type="primary" onClick={this.handleSubmit}>保存</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="ghost" onClick={this.handlePrev}>上一步</Button>
                    </FormItem>
                )
            }
        };
        return (
            <Form horizontal className="product-form-gifts-wrapper" >
                <Row>
                    <Col {...formLayoutCol2} >
                        <Form.Item  {...formBtLayout}>
                            <Button onClick={this.add} type="primary" >增加</Button>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col {...formLayoutCol2} >
                        {formItems}
                    </Col>
                </Row>
                <Row>
                    <Col {...formLayoutCol2} >
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


