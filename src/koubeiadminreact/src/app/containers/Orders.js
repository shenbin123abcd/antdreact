import {fetchOrdersIfNeeded} from '../actions/orders'
import {fetchShopsIfNeeded} from '../actions/shops'
import PageLoading from '../components/PageLoading'
import timeHandler1 from '../util/timeHandler1'
import renderShops from '../util/renderShops'
import stateHandler from '../util/stateHandler'
import PageError from '../components/PageError'


let Link=ReactRouter.Link;
var hashHistory=ReactRouter.hashHistory;
var { Table, Icon, Tabs,Form, Input, Row, Col, Button, DatePicker,Select,Modal,message,Breadcrumb} = antd;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;






var searchParams={
    p:1,
    per_page:10,
};

var Orders = React.createClass({
    unHandlerUrlChange:null,
    handlerUrlChange(ev){
        const { dispatch } = this.props;
        _.assign(searchParams,ev.query);
        searchParams.p=ev.query.p||1;
        searchParams.per_page=ev.query.per_page||10;
        // console.log(searchParams);
        dispatch(fetchOrdersIfNeeded(searchParams));
    },
    componentDidMount(){
        app.util.setIframeHeight();
        let{dispatch,location}=this.props;
        searchParams={
            p:1,
            per_page:10,
        };
        let query=location.query;
        _.assign(searchParams,query);
        dispatch(fetchOrdersIfNeeded(searchParams));
        dispatch(fetchShopsIfNeeded());
        this.unHandlerUrlChange=hashHistory.listen(this.handlerUrlChange);
    },
    componentDidUpdate:function(){
        app.util.setIframeHeight();
    },
    componentWillUnmount(nextProps){
        this.unHandlerUrlChange()
    },
    onChange(pagination, filters, sorter){
        var order;
        if(sorter.order=='descend'){
            order='desc'
        }else{
            order='asc'
        }
        columns[0].sortOrder='descend'

        _.assign(searchParams,{
            p:pagination.current,
            per_page:pagination.pageSize,
            // _field:sorter.field,
            // _order:order,
        });
        if(sorter.field){
            _.assign(searchParams,{
                _field:sorter.field,
            });
        }
        if(sorter.order){
            _.assign(searchParams,{
                _order:order,
            });
        }

        hashHistory.push(`/cehua/orders?${$.param(searchParams)}`);
    },
    pagination(){
        let {orders}=this.props;
        let total=orders.data.data.total;
        return {
            total: total,
            defaultCurrent: Number(searchParams.p),
            defaultPageSize: Number(searchParams.per_page),
            showSizeChanger: true,
        }
    },
    datePickerChange(dates, dateStrings){
        _.assign(searchParams,{
            start_date:dateStrings[0],
            end_date:dateStrings[1]
        });
    },
    handleSubmit(e){
        e.preventDefault();
        let concat=this.props.form.getFieldsValue().contact

        if(concat && !hb.validation.checkPhone(this.props.form.getFieldsValue().contact)){
            message.error('请输入正确的手机号');
        }else{
            _.assign(searchParams,this.props.form.getFieldsValue());
            // console.log(this.props.form.getFieldsValue())
            if(searchParams.status=='all'){
                searchParams=_.omit(searchParams,'status');
            }
            hashHistory.push(`/cehua/orders?${$.param(searchParams)}`);
        }

    },
    clearSearchParam(){
        searchParams={};
        this.props.form.setFieldsValue({
            order_no: '',
            contact: '',
            shop_id: undefined,
            status: undefined,
            buyer_id: '',
        });
        hashHistory.push(`/cehua/orders?${$.param(searchParams)}`);
    },
    render(){
        let {shops,orders}=this.props;
        let {getFieldDecorator}=this.props.form;

        let renderOrder=()=>{
            if(!orders.data || !shops.data){
                var isNull=true
            }else if(orders.data.length===0 || shops.data.length===0){
                var isEmpty =true
            }

            if (isNull||shops.isFetching) {
                return <PageLoading />
            }else if(isEmpty){
                return <div>no data</div>
            }else if(orders.data.iRet==1){

                columns.forEach(n=>n.sortOrder=false);
                var sortCol=_.find(columns,{dataIndex:searchParams._field});
                if(sortCol){
                    // console.log(sortCol.sortOrder);
                    if(searchParams._order=='desc'){
                        sortCol.sortOrder='descend'
                    }else{
                        sortCol.sortOrder='ascend'
                    }
                }


                let order_noVal=searchParams.order_no?String(searchParams.order_no):undefined;
                let concatVal=searchParams.concat?String(searchParams.concat):'';
                let shop_idVal=searchParams.shop_id?String(searchParams.shop_id):undefined;
                let stateVal=searchParams.stateVal?String(searchParams.stateVal):'all';
                let start_dateVal=searchParams.start_date?String(searchParams.start_date):'';
                let end_dateVal=searchParams.end_date?String(searchParams.end_date):'';
                let buyer_idVal=searchParams.buyer_id?String(searchParams.buyer_id):'';
                let render=()=>{
                    if(start_dateVal && end_dateVal){
                        return(
                            <RangePicker
                                style={{ width: '100%' }}
                                onChange={this.datePickerChange}
                                defaultValue={[moment(start_dateVal, 'YYYY-MM-DD'),moment(end_dateVal, 'YYYY-MM-DD')]}
                            />
                        )
                    }else{
                        return(
                            <RangePicker
                                style={{ width: '100%' }}
                                onChange={this.datePickerChange}
                            />
                        )
                    }
                }
                return(
                    <div>
                        <h2 className="page-title">我的订单</h2>
                        <div className="breadcrumb-wrapper">
                            <Breadcrumb>
                                <Breadcrumb.Item><Link to="/cehua">首页</Link></Breadcrumb.Item>
                                <Breadcrumb.Item>我的订单</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <Form horizontal className="ant-advanced-search-form" onSubmit={this.handleSubmit}>
                            <Row gutter={16}>
                                <Col sm={8}>
                                    <FormItem
                                        label="订单号"
                                        labelCol={{ span: 10 }}
                                        wrapperCol={{ span: 14 }}

                                    >
                                        {getFieldDecorator('order_no', { initialValue: order_noVal })(
                                            <Input  placeholder="请输入订单号" />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col sm={8}>
                                    <FormItem
                                        label="创建时间"
                                        labelCol={{ span: 10 }}
                                        wrapperCol={{ span: 14 }}

                                    >
                                        {render()}
                                    </FormItem>
                                </Col>
                                <Col sm={8}>
                                    <FormItem
                                        label="联系方式"
                                        labelCol={{ span: 10 }}
                                        wrapperCol={{ span: 14 }}

                                    >
                                        {getFieldDecorator('contact', { initialValue: concatVal})(
                                            <Input  placeholder="请输入联系方式" />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col sm={8}>
                                    <FormItem
                                        label="门店名称"
                                        labelCol={{ span: 10 }}
                                        wrapperCol={{ span: 14 }}
                                    >
                                        {
                                            getFieldDecorator('shop_id', { initialValue: shop_idVal })(
                                                <Select id="select2" size="large" placeholder="请选择门店" >
                                                    {
                                                        shops.data&&shops.data.map((n,i)=>{
                                                            var branch_shop_name=n.branch_shop_name;
                                                            if(n.branch_shop_name){
                                                                branch_shop_name=` - ${n.branch_shop_name}`;
                                                            }
                                                            return (
                                                                <Option key={i} value={n.shop_id} >{n.main_shop_name}{branch_shop_name}</Option>
                                                            )
                                                        })
                                                    }
                                                </Select>
                                            )
                                        }
                                    </FormItem>
                                </Col>
                                <Col sm={8}>
                                    <FormItem
                                        id="select"
                                        label="订单状态"
                                        labelCol={{ span: 10 }}
                                        wrapperCol={{ span: 14 }}
                                    >
                                        {getFieldDecorator('status', { initialValue: stateVal })(
                                            <Select id="select" size="large"  >
                                                <Option value="all" >全部</Option>
                                                <Option value="0" >未上架</Option>
                                                <Option value="1" >已上架</Option>
                                                <Option value="2">冻结</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col sm={8}>
                                    <FormItem
                                        label="付款账号"
                                        labelCol={{ span: 10 }}
                                        wrapperCol={{ span: 14 }}

                                    >
                                        {getFieldDecorator('buyer_id', { initialValue: buyer_idVal })(
                                            <Input  placeholder="请输入付款账号" />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24} style={{ textAlign: 'right' }}>
                                    <Button type="primary" htmlType="submit">搜索</Button>
                                    <Button onClick={this.clearSearchParam} >清除</Button>
                                </Col>
                            </Row>
                        </Form>
                        <TableInTab
                            //data={res}
                            data={orders}
                            onChange={this.onChange}
                            pagination={this.pagination}
                            isFetching={orders.isFetching}
                        />
                    </div>
                )
            }else if(orders.data.iRet==0){
                return(
                    <div className="detail-wrapper">
                        <PageError/>
                    </div>
                )
            }
        }
        return(
            <div className="order-wrapper my-page-wrapper">
                {renderOrder()}
            </div>
        )
    }
});

var renderDate=(n)=>{
    let date=new Date(parseInt(n*1000));
    let year=date.getFullYear();
    let month=date.getMonth()+1;
    let day=date.getDate();
    return year+'-'+month+'-'+day
}

var columns = [{
    title: '订单号',
    dataIndex: 'order_no',
    key: 'order_no',
},{
    title: '套餐名称',
    dataIndex: 'subject',
    key: 'subject',
},{
    title: '联系方式',
    dataIndex: 'concat',
    key: 'concat',
},{
    title: '付款账号',
    dataIndex: 'buyer_id',
    key: 'buyer_id',
},{
    title: '门店名称',
    dataIndex: 'shop',
    key: 'shop',

},{
    title: '实付金额',
    dataIndex: 'current_price',
    key: 'current_price',
    sorter: true,
},{
    title: '创建时间',
    dataIndex: 'update_time',
    key: 'update_time',
    sorter: true,
    render: (text, record,index) =>  {
        return(
            <span>
                {renderDate(record.create_time)}
            </span>
        )
    }
},{
    title: '订单状态',
    dataIndex: 'status',
    key: 'status',
    render: (text, record,index) =>  {
        return(
            <span>
                {stateHandler(record.status)}
            </span>
        )
    }
},{
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
    render: (text, record,index) =>  {
        return(
            <Link to={`/cehua/orders/order/${record.id}`}>
                查看
            </Link>
        )
    }


}]

var TableInTab=React.createClass({
    render(){
        let data=this.props.data.data;
        let onChange=this.props.onChange;
        let pagination=this.props.pagination;
        let isFetching=this.props.isFetching;
        return(
            <Table columns={columns}
                   dataSource={data.data.list}
                   onChange={onChange}
                   pagination={pagination}
                   loading={isFetching}
                   />
        )
    }
})


function mapStateToProps(state) {
    const {orders,shops}=state;
    return {
        orders,
        shops
    }
}

Orders = Form.create()(Orders);
export default ReactRedux.connect(mapStateToProps)(Orders)