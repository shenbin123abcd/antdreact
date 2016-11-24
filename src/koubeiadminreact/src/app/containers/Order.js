import {fetchOrderIfNeeded} from '../actions/order'
import PageLoading from '../components/PageLoading'
import PageError from '../components/PageError'
var hashHistory=ReactRouter.hashHistory;

let Link=ReactRouter.Link;
var { Table,Breadcrumb,Button } = antd;
var Products = React.createClass({
    componentDidMount:function(){
        app.util.setIframeHeight();
        const { dispatch,routeParams } = this.props;
        dispatch(fetchOrderIfNeeded(routeParams.id));
    },
    componentDidUpdate:function(){
        app.util.setIframeHeight();
    },
    componentWillUnmount(nextProps){

    },
    render: function() {
        let {order}=this.props;
        let renderOrder=()=>{
            if(!order.data){
                var isNull=true
            }else if(order.data.length===0){
                var isEmpty =true
            }

            if (order.isFetching||isNull) {
                return <PageLoading />
            }else if(isEmpty){
                return <div>no data</div>
            }else{
                if(order.data.iRet==1){
                    let res=order.data.data;

                    //1
                    let columns=[{
                        title:'订单号',
                        dataIndex:'val',
                        key:'val',
                        className:'col-6'
                    },{
                        title:'创建时间',
                        dataIndex:'val2',
                        key:'val2',
                        className:'col-6'
                    },{
                        title:'门店名称',
                        dataIndex:'val3',
                        key:'val3',
                        className:'col-6'
                    },{
                        title:'总金额',
                        dataIndex:'val4',
                        key:'val4',
                        className:'col-6'
                    },{
                        title:'实付金额',
                        dataIndex:'val5',
                        key:'val5',
                        className:'col-6'
                    },{
                        title:'修改时间',
                        dataIndex:'val6',
                        key:'val6',
                        className:'col-6'
                    }];
                    let data=[{
                        key:'1',
                        val:'order_num',
                        val2:'create_time',
                        val3:'shop',
                        val4:'total_price',
                        val5:'sell_price',
                        val6:'change_time',
                    }];


                    //2
                    let columns2=[{
                        title:'流水编号',
                        dataIndex:'val',
                        key:'val',
                        className:'col-6'
                    },{
                        title:'买家联系方式',
                        dataIndex:'val2',
                        key:'val2',
                        className:'col-6'
                    },{
                        title:'支付宝交易号',
                        dataIndex:'val3',
                        key:'val3',
                        className:'col-6'
                    },{
                        title:'买家支付宝账号',
                        dataIndex:'val4',
                        key:'val4',
                        className:'col-6'
                    },{
                        title:'识别码',
                        dataIndex:'val5',
                        key:'val5',
                        className:'col-6'
                    },{
                        title:'订单状态',
                        dataIndex:'val6',
                        key:'val6',
                        className:'col-6'
                    }];
                    let data2=[{
                        key:'1',
                        val:'order_num',
                        val2:'create_time',
                        val3:'shop',
                        val4:'total_price',
                        val5:'sell_price',
                        val6:'change_time',
                    }];


                    //3;
                    let data3=[{
                        key:"1",
                        val1:'id',
                        val2:'product_id',
                        val3:'store_id',
                        val4:'price_id',
                        val6:'status',
                    }];
                    let columns3=[{
                        title:'券ID',
                        dataIndex:'val1',
                        key:'val1',
                        className:'col-6'
                    },{
                        title:'套餐ID',
                        dataIndex:'val2',
                        key:'val2',
                        className:'col-6'
                    },{
                        title:'门店ID',
                        dataIndex:'val3',
                        key:'val3',
                        className:'col-6'
                    },{
                        title:'资金凭证ID',
                        dataIndex:'val4',
                        key:'val4',
                        className:'col-6'
                    },{
                        title:'凭证ID',
                        dataIndex:'val5',
                        key:'val5',
                    }];


                    //4
                    let data4=[{
                        key:'1',
                        val1:'price_id',
                        val2:'time',
                        val3:'store_id',
                        val4:'price',
                        val5:'zhanghu',
                        val6:'status',
                    }];

                    let columns4=[{
                        title:'资金凭证ID',
                        dataIndex:'val1',
                        key:'val1',
                        className:'col-6'
                    },{
                        title:'流转时间',
                        dataIndex:'val2',
                        key:'val2',
                        className:'col-6'
                    },{
                        title:'门店ID',
                        dataIndex:'val3',
                        key:'val3',
                        className:'col-6'
                    },{
                        title:'金额',
                        dataIndex:'val4',
                        key:'val4',
                        className:'col-6'
                    },{
                        title:'流入账户',
                        dataIndex:'val5',
                        key:'val5',
                        className:'col-6'
                    },{
                        title:'流转类型',
                        dataIndex:'val6',
                        key:'val6',
                        className:'col-6'
                    }]

                    return(
                        <div className="detail-wrapper">
                            <h2 className="page-title">订单管理</h2>
                            <div className="breadcrumb-wrapper">
                                <Breadcrumb>
                                    <Breadcrumb.Item><Link to="/cehua">首页</Link></Breadcrumb.Item>
                                    <Breadcrumb.Item><Link to="/cehua/orders">订单列表</Link></Breadcrumb.Item>
                                    <Breadcrumb.Item>订单详情</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <div className="table-block">
                                <div className="title-block">
                                    <span className="title">订单信息<span className="line"></span></span>
                                </div>
                                <Table
                                    bordered={true}
                                    pagination={false}
                                    showHeader={true}
                                    columns={columns}
                                    dataSource={data}
                                />
                                <Table
                                    rowClassName={e=>'ddd'}
                                    bordered={true}
                                    pagination={false}
                                    showHeader={true}
                                    columns={columns2}
                                    dataSource={data2}
                                    className={'table-block-sp'}
                                />
                            </div>

                            <div className="table-block">
                                <div className="title-block">
                                    <span className="title">凭证信息<span className="line"></span></span>
                                </div>
                                <Table
                                    rowClassName={e=>'ddd'}
                                    bordered={true}
                                    pagination={false}
                                    showHeader={true}
                                    columns={columns3}
                                    dataSource={data3}
                                />
                            </div>

                            <div className="table-block">
                                <div className="title-block">
                                    <span className="title">订单资金流水<span className="line"></span></span>
                                </div>
                                <Table
                                    rowClassName={e=>'ddd'}
                                    bordered={true}
                                    pagination={false}
                                    showHeader={true}
                                    columns={columns4}
                                    dataSource={data4}
                                />
                            </div>
                            <div>
                                <Row>
                                    <Col span={4}> <Button type="ghost"  onClick={e=>hashHistory.go(-1)}>返回</Button></Col>
                                </Row>
                            </div>

                        </div>
                    )
                }else{
                    return(
                        <div className="detail-wrapper">
                            <PageError/>
                        </div>
                    )
                }

            }
        }
        return (
            <div className="order-wrapper my-page-wrapper">
                {renderOrder()}
            </div>
        );
    }
});

function mapStateToProps(state) {
    const {order}=state;
    return {
        order
    }
}

export default ReactRedux.connect(mapStateToProps)(Products)



