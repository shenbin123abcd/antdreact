import {fetchProductsIfNeeded} from '../actions/products'
import {fetchShopsIfNeeded} from '../actions/shops'
import renderShops from '../util/renderShops'
import timeHandler1 from '../util/timeHandler1'
import stateHandler from '../util/stateHandler'
import Operations from '../containers/Products.Operations'


var hashHistory=ReactRouter.hashHistory;
let Link=ReactRouter.Link;
var { Table, Icon, Tabs,Form, Input, Row, Col, Button, DatePicker,Select,Modal,message,Breadcrumb } = antd;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;


var searchParams={
    p:1,
    per_page:10,
};
var columns = [{
    title: '套餐名称',
    dataIndex: 'subject',
    key: 'subject',
    sorter: true,
}, {
    title: '提交时间',
    dataIndex: 'updated_at',
    key: 'updated_at',
    sorter: true,
    render: (text, record,index) =>  (
        <span>
            {timeHandler1(record.updated_at)}
        </span>
    )
}, {
    title: '折扣价',
    dataIndex: 'price',
    key: 'price',
    sorter: true,
}, {
    title: '所属门店',
    dataIndex: 'shop_ids',
    key: 'shop_ids',
    render: (text, record,index) =>  (
        <div>
            {record.shop.map((n,i)=>renderShops(n,i))}
        </div>
    )
}, {
    title: '原价',
    dataIndex: 'original_price',
    key: 'original_price',
    sorter: true,
}, {
    title: '生效时间',
    dataIndex: 'gmt_start',
    key: 'gmt_start',
    sorter: true,
    render: (text, record,index) =>  (
        <span>
            {timeHandler1(record.gmt_start)}
        </span>
    )
}, {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    sorter: true,
    render: (text, record,index) =>  (
        <span>
            {stateHandler(record.state)}
        </span>
    )
}, {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render: (text, record,index) => {
        
    
        return (
            <Operations record={record} />
        )
    }
}
];



function callback(key) {
    // console.log(key);
    _.assign(searchParams,{state:key});
    if(searchParams.state=='all'){
        searchParams=_.omit(searchParams,'state');
    }
    // console.log(searchParams);

    hashHistory.push(`/cehua/products?${$.param(searchParams)}`);
}
function handleSelectStateChange(value) {
    // console.log(`selected ${value}`);
    _.assign(searchParams,{state:value});
    if(searchParams.state=='all'){
        searchParams=_.omit(searchParams,'state');
    }
    hashHistory.push(`/cehua/products?${$.param(searchParams)}`);
}

function onChange(pagination, filters, sorter) {
    // console.log('params', pagination, filters, sorter);
    var order;
    // console.log(sorter.order)
    if(sorter.order=='descend'){
        order='desc'
    }else{
        order='asc'
    }
    columns[0].sortOrder='descend'



    // console.log(order)
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

    hashHistory.push(`/cehua/products?${$.param(searchParams)}`);

}

var Products = React.createClass({
    unHandlerUrlChange:null,
    handlerUrlChange(ev){
        // console.log('url',ev);
        const { dispatch } = this.props;
        _.assign(searchParams,ev.query);

        searchParams.p=ev.query.p||1;
        searchParams.per_page=ev.query.per_page||10;
        // console.log(searchParams);
        dispatch(fetchProductsIfNeeded(searchParams));
    },
    componentDidMount:function(){
        app.util.setIframeHeight();
        const { dispatch,location } = this.props;
        // console.log('componentDidMount');
        searchParams={
            p:1,
            per_page:10,
        };
        let query=location.query;
        _.assign(searchParams,query);
        dispatch(fetchProductsIfNeeded(searchParams));
        dispatch(fetchShopsIfNeeded());
        this.unHandlerUrlChange=hashHistory.listen(this.handlerUrlChange);
    },
    componentDidUpdate:function(){
        app.util.setIframeHeight();
    },
    componentWillUnmount(nextProps){
        this.unHandlerUrlChange()
    },
    handleSubmit(e){
        e.preventDefault();
        // console.log(this.props.form)
        // console.log(this.props.form.getFieldsValue())
        _.assign(searchParams,this.props.form.getFieldsValue());

        if(searchParams.state=='all'){
            searchParams=_.omit(searchParams,'state');
        }
        hashHistory.push(`/cehua/products?${$.param(searchParams)}`);
        // this.props.form.validateFields((errors, values) => {
        //     if (errors) {
        //         console.log('Errors in form!!!');
        //         return;
        //     }
        //     console.log('Submit!!!');
        //     console.log(values);
        // });
    },

    clearSearchParam(key) {
        // console.log(key);
        searchParams={};
        this.props.form.setFieldsValue({
            subject: '',
            state: 'all',
            shop_ids: undefined,
        });
        hashHistory.push(`/cehua/products?${$.param(searchParams)}`);
    },
    render: function() {
        const { dispatch,products,shops } = this.props;
        // const { getFieldDecorator } = this.props.form;
        const { getFieldDecorator,setFieldsValue } = this.props.form;

        const { isFetching,data,total } = products;

        // const data = [{
        //     key: '1',
        //     subject: 'John Brown',
        //     updated_at: 32,
        //     price: 'New York No. 1 Lake Park',
        // }, {
        //     key: '2',
        //     subject: 'Jim Green',
        //     updated_at: 42,
        //     price: 'London No. 1 Lake Park',
        // }];
        // console.log(searchParams)

        const pagination = {
            total: total,
            defaultCurrent: Number(searchParams.p),
            defaultPageSize: Number(searchParams.per_page),
            showSizeChanger: true,
            // onShowSizeChange(current, pageSize) {
                // console.log('Current: ', current, '; PageSize: ', pageSize);
                // _.assign(searchParams,{p:current,per_page:pageSize});
                // hashHistory.push(`/cehua/products?${$.param(searchParams)}`);
            // },
            // onChange(current) {
                // console.log('Current: ', current);
                // _.assign(searchParams,{p:current});
                // hashHistory.push(`/cehua/products?${$.param(searchParams)}`);
            // },
        };

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


        //
        // if(shops.data){
        //     let shopsCol=_.find(columns,{dataIndex:'shop_ids'});
        //     shopsCol.filterMultiple = false;
        //     shopsCol.filters = _.map(shops.data,(n,i)=>{
        //
        //         var branch_shop_name=n.branch_shop_name;
        //         if(n.branch_shop_name){
        //             branch_shop_name=` - ${n.branch_shop_name}`;
        //         }
        //         return {
        //             text: `${n.main_shop_name}${branch_shop_name}`,
        //             value: `${n.shop_id}`,
        //         }
        //     });
        //
        //     // console.log(shops.data);
        //     // shopsCol.filters = [
        //     //     { text: 'London', value: 'London' },
        //     //     { text: 'New York', value: 'New York' },
        //     // ];
        //
        // }
        var shop_idsValue=String(searchParams.shop_ids);
        if(!searchParams.shop_ids){
            shop_idsValue=undefined;
        }
        var stateValue=String(searchParams.state);
        if(!searchParams.state){
            stateValue='all';
        }
        var subjectValue=String(searchParams.subject);
        if(!searchParams.subject){
            subjectValue='';
        }
        // console.log(stateValue)


        const TableInTab=()=>{
            return(
                <Table columns={columns}
                       dataSource={data}
                       pagination={pagination}
                       onChange={onChange}
                       loading={isFetching} />
                )
            };


        return (
            <div className="my-page-wrapper">
                <Row>
                    <Col span={12}><h2 className="page-title">套餐管理</h2></Col>
                    <Col span={12}  style={{ textAlign: 'right' }}><Button size="large" type="primary" onClick={e=>hashHistory.push(`/cehua/products/product/add`)}>新增</Button></Col>
                </Row>
                <div className="breadcrumb-wrapper">
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to="/cehua">首页</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>套餐列表</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Form horizontal className="ant-advanced-search-form" onSubmit={this.handleSubmit}>
                    <Row gutter={16}>
                        <Col sm={8}>
                            <FormItem
                                label="套餐名"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}

                            >
                                {getFieldDecorator('subject', { initialValue: subjectValue })(
                                    <Input  placeholder="请输入套餐名" />
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem
                                id="select"
                                label="状态"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('state', { initialValue: stateValue })(
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
                                label="分店"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >

                                {
                                    getFieldDecorator('shop_ids', { initialValue: shop_idsValue })(
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
                    </Row>
                    <Row>
                        <Col span={12} offset={12} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit">搜索</Button>
                            <Button onClick={this.clearSearchParam} >清除</Button>
                        </Col>
                    </Row>
                </Form>
                <TableInTab />
                {
                    // <Tabs defaultActiveKey="all" onChange={callback}>
                    //     <TabPane tab="全部" key="all">
                    //         <TableInTab />
                    //     </TabPane>
                    //     <TabPane tab="未上架" key="0">
                    //         <TableInTab />
                    //     </TabPane>
                    //     <TabPane tab="已上架" key="1">
                    //         <TableInTab />
                    //     </TabPane>
                    //     <TabPane tab="冻结" key="2">
                    //         <TableInTab />
                    //     </TabPane>
                    // </Tabs>
                }

            </div>
        )
    }
});

function mapStateToProps(state) {
    const {products,shops}=state;
    return {
        products,
        shops,
    }
}
Products = Form.create()(Products);
export default ReactRedux.connect(mapStateToProps)(Products)


