import {submitProductForm4,goBackProductForm3,goBackProductForm1,goProductFormStage} from '../actions/product.from'

var hashHistory=ReactRouter.hashHistory;
let Link=ReactRouter.Link;
var { Table, Icon, Tabs,Form, Input, Row, Col, Button, DatePicker,Select,Modal,InputNumber} = antd;

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;


const checkDesRange=(rule, value, callback) =>{
    // console.log(value)
    var newStr=String(value);
    if (hb.util.len(newStr) >200) {
        callback(new Error('不能超过100汉字，200个字符'));
    } else {
        callback();
    }
};

var FormBox = React.createClass({

    componentDidMount:function(){
        // console.log('componentDidMount')
    },
    componentDidUpdate:function(){
        // console.log('componentDidUpdate')
        // console.log(this.props.form.getFieldsValue())
    },
    componentWillMount (nextProps){
        // console.log('componentWillMount')
    },
    componentWillUnmount(nextProps){
        // console.log(2324)
    },

    handlePrev(e) {
        e.preventDefault();
        const { dispatch,shops,product } = this.props;
        this.props.form.validateFields((errors, values) => {
            // console.log(values);
            if (errors) {
                console.log('Errors in form!!!');
                return;
            }
            // console.log('Submit!!!');

            if(product.data.price_mode=='FIX'){
                dispatch(goBackProductForm3(values));
                dispatch(goProductFormStage('2'));
            }else{
                dispatch(goBackProductForm3(values));

            }
        });
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
            dispatch(submitProductForm4(values));
        });
    },

    handleFormChange(){
        const { dispatch,shops,product } = this.props;

    },


    render: function() {
        const { dispatch,shops,product } = this.props;
        // console.log('render',this.props)
        var data;

        const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };
        const formLayoutCol1 = {
            span: 2 ,
            offset: 2 ,
        };
        const formLayoutCol2 = {
            span: 20 ,
        };
        var shop_idsValue ;

        if(this.props.type=='add'){
            data={}
        }else if(this.props.type=='update'){
            if(product){
                data=product.data;
            }
        }
        const renderBts= () =>{
            if(this.props.type=='add'){
                return(
                    <FormItem wrapperCol={{ span: 10, offset: 4 }}>
                        <Button type="primary" onClick={this.handleSubmit}>下一步</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="ghost" onClick={this.handlePrev}>上一步</Button>
                    </FormItem>
                )
            }else if(this.props.type=='update'){
                return(
                    <FormItem wrapperCol={{ span: 10, offset: 4 }}>
                        <Button type="primary" onClick={this.handleSubmit}>下一步</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="ghost" onClick={this.handlePrev}>上一步</Button>
                    </FormItem>
                )
            }
        };

        if($.isEmptyObject(this.props.form.getFieldsValue())){
            var formData=product.data;
        }else{
            var formData=this.props.form.getFieldsValue();
        }

        // console.log(formData)
        return (
            <Form horizontal>
                <Row>
                    <Col span={8}>
                        <div className="mobile-sample-wrapper">
                            <img src={require('../images/mobileSample-header.png')} alt="" className="mobile-sample-image"/>
                            <section className="describe-section">
                                <h3 className="describe-section-title">服务内容</h3>
                                <ul>
                                    <li className="li">主持人<span className="span">{formData.zhuchi_level?`${formData.zhuchi_level}司仪，`:''}{formData.zhuchi_desc}</span></li>
                                    <li className="li">化妆师<span className="span">{formData.huazhuang_level?`${formData.huazhuang_level}化妆师，`:''}{formData.huazhuang_desc}</span></li>
                                    <li className="li">摄影师<span className="span">{formData.sheying_level?`${formData.sheying_level}摄影师，`:''}{formData.sheying_desc}</span></li>
                                    <li className="li">摄像师<span className="span">{formData.shexiang_level?`${formData.shexiang_level}摄像师，`:''}{formData.shexiang_desc}</span></li>
                                </ul>
                            </section>
                            <p className="describe-section-space"></p>
                            <section className="describe-section">
                                <h3 className="describe-section-title">婚礼布置</h3>
                                <ul>
                                    <li className="li">迎宾区<span className="span">{formData.yingbin}</span></li>
                                    <li className="li">仪式区<span className="span">{formData.yishi}</span></li>
                                    <li className="li">宴会区<span className="span">{formData.yanhui}</span></li>
                                    <li className="li">花艺　<span className="span">{formData.huayi}</span></li>
                                </ul>
                            </section>
                            <p className="describe-section-space"></p>
                            <section className="describe-section">
                                <h3 className="describe-section-title">灯光舞美</h3>
                                <ul>
                                    <li className="li">婚礼灯光<span className="span">{formData.dengguang}</span></li>
                                    <li className="li">婚礼舞美<span className="span">{formData.daoju}</span></li>
                                </ul>
                            </section>
                            <p className="describe-section-space"></p>
                            <section className="describe-section">
                                <h3 className="describe-section-title">补充说明</h3>
                                <ul>
                                    <li className="li">购买须知<span className="span">{formData.buyer_notes}</span></li>
                                </ul>
                            </section>
                            <img src={require('../images/mobileSample-footer.png')} alt="" className="mobile-sample-image"/>
                        </div>
                    </Col>
                    <Col span={16}>
                        <Row >
                        <Col className="group-label" {...formLayoutCol1}>服务团队:</Col>
                        <Col {...formLayoutCol2} >
                            <FormItem
                                {...formItemLayout}
                                label="主持人"
                            >
                                {getFieldDecorator('zhuchi_level', {
                                    initialValue: data.zhuchi_level||'首席',

                                })(
                                    <Select>
                                        <option key="首席">首席</option>
                                        <option key="资深">资深</option>
                                        <option key="指定">指定</option>
                                        <option key="不包含">不包含</option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                        <Row >
                            <Col {...formLayoutCol1}></Col>
                            <Col {...formLayoutCol2} >
                                <FormItem className="group-label-hidden"
                                    {...formItemLayout}
                                    label="描述" extra="主持人有四个类别，分别是首席，资深，指定和不包含，请详细填写主要说明内容。例如：一次免费沟通与彩排"
                                >
                                    {getFieldDecorator('zhuchi_desc', {
                                        initialValue: data.zhuchi_desc||'',
                                        rules: [
                                            {
                                                validator: checkDesRange,
                                            }
                                        ],
                                    })(
                                        <Input type="textarea" rows={4}   />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row >
                            <Col className="group-label" {...formLayoutCol1}></Col>
                            <Col {...formLayoutCol2} >
                                <FormItem
                                    {...formItemLayout}
                                    label="化妆师"
                                >
                                    {getFieldDecorator('huazhuang_level', {
                                        initialValue: data.huazhuang_level||'首席',

                                    })(
                                        <Select>
                                            <option key="首席">首席</option>
                                            <option key="资深">资深</option>
                                            <option key="指定">指定</option>
                                            <option key="不包含">不包含</option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row >
                            <Col {...formLayoutCol1}></Col>
                            <Col {...formLayoutCol2} >
                                <FormItem className="group-label-hidden"
                                    {...formItemLayout}
                                    label="描述" extra="化妆师有四个类别，分别是首席，资深，指定和不包含，请详细填写主要说明内容。例如：一次免费试妆，全程跟妆，送伴娘妆和亲友妆"
                                >
                                    {getFieldDecorator('huazhuang_desc', {
                                        initialValue: data.huazhuang_desc||'',
                                        rules: [
                                            {
                                                validator: checkDesRange,
                                            }
                                        ],
                                    })(
                                        <Input type="textarea" rows={4}   />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="group-label" {...formLayoutCol1}></Col>
                            <Col {...formLayoutCol2} >
                                <FormItem
                                    {...formItemLayout}
                                    label="摄影师"
                                >
                                    {getFieldDecorator("sheying_level",{
                                        initialValue:data.sheying_level||'首席'
                                    })(
                                        <Select>
                                            <option key="首席">首席</option>
                                            <option key="资深">资深</option>
                                            <option key="指定">指定</option>
                                            <option key="不包含">不包含</option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row >
                            <Col {...formLayoutCol1}></Col>
                            <Col {...formLayoutCol2} >
                                <FormItem className="group-label-hidden"
                                    {...formItemLayout}
                                    label="描述" extra="摄影师有四个类别，分别是首席，资深，指定和不包含，请详细填写主要说明内容。例如：全程跟拍，300-500 张精修 20 张，免费制作光盘，超时另加 80 元每小时"
                                >
                                    {getFieldDecorator('sheying_desc', {
                                        initialValue: data.sheying_desc||'',
                                        rules: [
                                            {
                                                validator: checkDesRange,
                                            }
                                        ],
                                    })(
                                        <Input type="textarea" rows={4}   />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="group-label" {...formLayoutCol1}></Col>
                            <Col {...formLayoutCol2} >
                                <FormItem
                                    {...formItemLayout}
                                    label="摄像师"
                                >
                                    {getFieldDecorator("shexiang_level",{
                                        initialValue:data.shexiang_level||'首席'
                                    })(
                                        <Select>
                                            <option key="首席">首席</option>
                                            <option key="资深">资深</option>
                                            <option key="指定">指定</option>
                                            <option key="不包含">不包含</option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row >
                            <Col {...formLayoutCol1}></Col>
                            <Col {...formLayoutCol2} >
                                <FormItem className="group-label-hidden"
                                          {...formItemLayout}
                                          label="描述" extra="摄像师有四个类别，分别是首席，资深，指定和不包含，请详细填写主要说明内容。例如：全程跟拍，MV 3-5 小时和流程片含后期制作，超时另加 80元每小时"
                                >
                                    {getFieldDecorator('shexiang_desc', {
                                        initialValue: data.shexiang_desc||'',
                                        rules: [
                                            {
                                                validator: checkDesRange,
                                            }
                                        ],
                                    })(
                                        <Input type="textarea" rows={4}   />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row >
                            <Col className="group-label" {...formLayoutCol1}>婚礼布置:</Col>
                            <Col {...formLayoutCol2} >
                                <FormItem
                                    {...formItemLayout}
                                    label="迎宾区" extra="迎宾区包含拍照区，签到区，甜品区等婚礼场外区域，请详细填写主要布置内容。例如：迎宾背景墙3mx4m，签到背景墙3mx4m，签到桌装饰，迎宾牌席位图展示，甜品区背景墙3mx4m，甜品桌装饰(不含甜品)"
                                >
                                    {getFieldDecorator('yingbin', {
                                        initialValue: data.yingbin||'',
                                        rules: [
                                            {
                                                validator: checkDesRange,
                                            }
                                        ],
                                    })(
                                        <Input type="textarea" rows={4}   />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row >
                            <Col className="group-label" {...formLayoutCol1}></Col>
                            <Col {...formLayoutCol2} >
                                <FormItem
                                    {...formItemLayout}
                                    label="仪式区" extra="仪式区包含主舞台区，T台区，仪式亭区等婚礼仪式区域，请详细填写主要布置内容。例如：主舞台背景8mx4m，蛋糕台1个，香槟台1个，鲜花拱门1个，鲜花路引8个"
                                >
                                    {getFieldDecorator('yishi', {
                                        initialValue: data.yishi||'',
                                        rules: [
                                            {
                                                validator: checkDesRange,
                                            }
                                        ],
                                    })(
                                        <Input type="textarea" rows={4}   />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row >
                            <Col className="group-label" {...formLayoutCol1}></Col>
                            <Col {...formLayoutCol2} >
                                <FormItem
                                    {...formItemLayout}
                                    label="宴会区" extra="宴会区包含客人用餐区，请详细填写主要布置内容。例如：主桌桌花，客桌桌花，新娘新郎椅背装饰，客人椅背装饰，桌卡，菜单卡，喜糖纸品（不包含喜糖）"
                                >
                                    {getFieldDecorator('yanhui', {
                                        initialValue: data.yanhui||'',
                                        rules: [
                                            {
                                                validator: checkDesRange,
                                            }
                                        ],
                                    })(
                                        <Input type="textarea" rows={4}   />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row >
                            <Col className="group-label" {...formLayoutCol1}></Col>
                            <Col {...formLayoutCol2} >
                                <FormItem
                                    {...formItemLayout}
                                    label="花艺" extra="花艺包含婚礼当天所用婚礼花艺布置，请详细填写主要布置内容。例如：新娘手捧花 1 个，手腕花 1 个，新人及双方父母胸花共 6 个，车花 4 个"
                                >
                                    {getFieldDecorator('huayi', {
                                        initialValue: data.huayi||'',
                                        rules: [
                                            {
                                                validator: checkDesRange,
                                            }
                                        ],
                                    })(
                                        <Input type="textarea" rows={4}   />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row >
                            <Col className="group-label" {...formLayoutCol1}>灯光舞美:</Col>
                            <Col {...formLayoutCol2} >
                                <FormItem
                                    {...formItemLayout}
                                    label="婚礼灯光" extra="婚礼灯光包含婚礼当天现场所用灯光，请详细填写主要道具内容。例如：三基色新闻面光灯 2 个，专业舞台电脑追光灯 1 个，专业染色LEDpar灯 6 个"
                                >
                                    {getFieldDecorator('dengguang', {
                                        initialValue: data.dengguang||'',
                                        rules: [
                                            {
                                                validator: checkDesRange,
                                            }
                                        ],
                                    })(
                                        <Input type="textarea" rows={4}   />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row >
                            <Col className="group-label" {...formLayoutCol1}></Col>
                            <Col {...formLayoutCol2} >
                                <FormItem
                                    {...formItemLayout}
                                    label="舞美道具" extra="舞美道具包含婚礼当天现场所用道具，请详细填写主要道具内容。例如：大功率泡泡机 1 个，花样心形烛台 1 个"
                                >
                                    {getFieldDecorator('daoju', {
                                        initialValue: data.daoju||'',
                                        rules: [
                                            {
                                                validator: checkDesRange,
                                            }
                                        ],
                                    })(
                                        <Input type="textarea" rows={4}   />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row >
                            <Col className="group-label" {...formLayoutCol1}>补充说明:</Col>
                            <Col {...formLayoutCol2} >
                                <FormItem
                                    {...formItemLayout}
                                    label="购买须知" extra="购买须知包含套餐的使用注意事项，请详细填写主要内容。例如：只适用于一对新人使用，外地客户需另行支付商家工作人员的交通差旅费，具体费用面议。图片仅供参考，具体细节需和策划师沟通敲定"
                                >
                                    {getFieldDecorator('buyer_notes', {
                                        initialValue: data.buyer_notes||'',
                                        rules: [
                                            {
                                                validator: checkDesRange,
                                            }
                                        ],
                                    })(
                                        <Input type="textarea" rows={4}   />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row >
                            <Col {...formLayoutCol1}></Col>
                            <Col {...formLayoutCol2} >
                                {renderBts()}
                            </Col>
                        </Row>
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


