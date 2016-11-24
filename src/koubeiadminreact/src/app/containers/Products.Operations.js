var Link=ReactRouter.Link;
import {
    fetchProductPutOnShelfIfNeeded,
    productPutOnShelfModalShow,
    productPutOnShelfModalHide,
    receiveProductPutOnShelf,
} from '../actions/product.putOnShelf';
import {
    fetchProductPutOffShelfIfNeeded,
    productPutOffShelfModalShow,
    productPutOffShelfModalHide,
    receiveProductPutOffShelf,
} from '../actions/product.putOffShelf';
import {
    fetchProductsIfNeeded
} from '../actions/products';

var { Table, Icon, Tabs,Form, Input, Row, Col, Button, DatePicker,Select,Modal,message} = antd;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;



const renderStateDivider=function (state) {
    if(state==0||state==1){
        return(
            <span className="ant-divider" ></span>
        )
    }
};





var Operations = React.createClass({
    getInitialState() {
        const { dispatch,record } = this.props;
        return {
            state:record.state,
            onVisible: false,
            offVisible: false,
        };
    },
    showOnModal() {
        this.setState({
            onVisible: true,
        });
    },
    showOffModal() {
        this.setState({
            offVisible: true,
        });
    },
    putOnShelf(id,data) {
        const { dispatch,products } = this.props;

        // console.log(products);
        // console.log(record,data);
        // dispatch(fetchProductPutOnShelfIfNeeded(id,data))

        this.setState({
            onConfirmLoading: true,
        });
        var postData=_.assign({id:id},data);

        app.ajax('/cehuaGoods/resume',{
            method :'POST',
            data:postData,
        }).then(res=> {
            if(res.iRet==1){
                // _.find(products.data,{id:id}).state='1';
                this.setState({
                    onConfirmLoading: false,
                    onVisible: false,
                });

                setTimeout( ()=> {
                    message.success(res.info);
                    this.setState({
                        state: '1',
                    });
                    dispatch(receiveProductPutOnShelf(id));
                },300);

                // return dispatch(receiveData(postData, res));
            }else{
                this.setState({
                    onConfirmLoading: false,
                });
                message.error(res.info);
                // return dispatch(receiveDataError(postData, res.info));
            }
        },res=>{
            this.setState({
                onConfirmLoading: false,
            });
            message.error(res.info);
            
            // return dispatch(receiveDataError(postData, '网络繁忙请稍候再试'));
        })

    },
    putOffShelf(id,data) {
        const { dispatch ,products} = this.props;
        // console.log(record,data);
        // dispatch(fetchProductPutOffShelfIfNeeded(id,data))

        this.setState({
            offConfirmLoading: true,
        });
        var postData=_.assign({id:id},data);
        app.ajax('/cehuaGoods/forbid',{
            method :'POST',
            data:postData,
        }).then(res=> {
            if(res.iRet==1){
                // _.find(products.data,{id:id}).state='0';
                this.setState({
                    offConfirmLoading: true,
                    offVisible: false,
                });

                setTimeout( ()=> {
                    this.setState({
                        state: '0',
                    });
                    message.success(res.info);
                    dispatch(receiveProductPutOffShelf(id));
                },300);

                // return dispatch(receiveData(postData, res));
            }else{
                this.setState({
                    offConfirmLoading: false,
                });
                message.error(res.info);
                // return dispatch(receiveDataError(postData, res.info));
            }
        },res=>{
            this.setState({
                offConfirmLoading: false,
            });
            message.error(res.info);
            // return dispatch(receiveDataError(postData, '网络繁忙请稍候再试'));
        })

    },
    showDeleteConfirm(id) {
        const { dispatch,record } = this.props;

        confirm({
            title: '提示',
            content: '您确定要删除吗？',
            onOk() {
                // console.log('OK');
                const hide = message.loading('正在删除。。。', 0);
                app.ajax('/cehuaGoods/destroy',{
                    method :'POST',
                    data:{id:id},
                }).then(res=> {
                    hide();
                    if(res.iRet==1){
                        message.success(res.info)
                        // _.find(products.data,{id:id}).state='1';
                        dispatch(fetchProductsIfNeeded(hb.location.url('?')));
                    }else{
                        message.error(res.info);
                    }
                },res=>{
                    hide();
                    message.error('网络繁忙请稍候再试');
                    // return dispatch(receiveDataError(postData, '网络繁忙请稍候再试'));
                })

            },
            onCancel() {

            },
        });
    },
    render: function() {
        const { dispatch,record } = this.props;
        const { getFieldDecorator } = this.props.form;


        // console.log(record.isPuttingOnShelf)


        const renderState=(state) =>{
            if(state==0){
                return(
                    <a  onClick={e=>{
                    // dispatch(productPutOnShelfModalShow(record.id));
                    this.showOnModal()
                    }} >上架</a>
                )
            }else if(state==1){
                return(
                    <a  onClick={e=>{
                    // dispatch(productPutOffShelfModalShow(record.id))
                    this.showOffModal()
                    }} >下架</a>
                )
            }
        };
        return (

            <span>
                <Link to={`/cehua/products/product/${record.id}`}>查看</Link>
                <span className="ant-divider" ></span>
                <Link to={`/cehua/products/product/update/${record.id}`}>修改</Link>
                {renderStateDivider(this.state.state)}
                {renderState(this.state.state)}
                <Modal title="您确定要上架吗"
                       visible={this.state.onVisible}
                       onOk={e=>{
                       this.putOnShelf(record.id,this.props.form.getFieldsValue());
                       }}
                       onCancel={e=>this.setState({onVisible: false})}
                       confirmLoading={this.state.onConfirmLoading}
                        >
                     <Form vertical >
                          <Row >
                            <Col span={24}>
                              <FormItem label="备注" >
                                {getFieldDecorator('remark', {

                                })(
                                    <Input type="textarea" rows={4} />
                                )}
                              </FormItem>
                            </Col>
                          </Row>
                        </Form>
                </Modal>
                <Modal title="您确定要下架吗"
                       visible={this.state.offVisible}
                       onOk={e=>{
                       this.putOffShelf(record.id,this.props.form.getFieldsValue())
                       }}
                       onCancel={e=>this.setState({offVisible: false})}
                       confirmLoading={this.state.offConfirmLoading}
                        >
                     <Form vertical >
                          <Row >
                            <Col span={24}>
                              <FormItem label="备注" >
                                {getFieldDecorator('remark', {

                                })(
                                    <Input type="textarea" rows={4} />
                                )}
                              </FormItem>
                            </Col>
                          </Row>
                        </Form>
                </Modal>
                <span className="ant-divider" ></span>
                <a onClick={e=>this.showDeleteConfirm(record.id)}>删除</a>


            </span>
        )
    }
});

function mapStateToProps(state) {
    const {products}=state;
    return {
        products,
    }
}
Operations = Form.create()(Operations);
export default ReactRedux.connect(mapStateToProps)(Operations)