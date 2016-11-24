import {fetchProductIfNeeded} from '../actions/product'
import PageLoading from '../components/PageLoading'
import PageError from '../components/PageError'
var hashHistory=ReactRouter.hashHistory;

let Link=ReactRouter.Link;
var { Table,Row,Col ,Breadcrumb,Button} = antd;
var Products = React.createClass({
    componentDidMount:function(){
        app.util.setIframeHeight();
        const { dispatch,routeParams } = this.props;
        dispatch(fetchProductIfNeeded(routeParams.id));
    },
    componentWillUnmount(nextProps){

    },
    componentDidUpdate:function(){

        app.util.setIframeHeight();
    },
    render: function() {
        let {data,isFetching,iRet}=this.props;
        let renderProduct=()=>{
            if(!data){
                var isNull=true
            }else if(data.length===0){
                var isEmpty =true
            }
            if (isFetching||isNull) {
                return <PageLoading />
            }else if(isEmpty){
                return <div>no data</div>
            }else{
                if(iRet==1) {
                    let res = data;
                    let imgRender = (n)=> {
                        if (Modernizr.chrome) {
                            return n + '@1e_1c_0o_0l_150h_150w.webp'
                        } else {
                            return n
                        }
                    }

                    let render = (n, i)=> {
                        return (
                            <span key={i}>{n.main_shop_name} - {n.branch_shop_name} </span>
                        )
                    };
                    let renderImg = (n, i)=> {
                        return (
                            <span key={i} className="img-block"><img src={imgRender(n.url)} alt=""/></span>
                        )
                    };
                    let renderFuwu = (n, i)=> {
                        return (
                            <div key={i}>
                                <span className="title-style">{n.title}</span>
                                <span className="content-style">{n.level}</span>
                                <span>{n.desc}</span>
                            </div>
                        )
                    };
                    let renderDesc = (n, i)=> {
                        return (
                            <div key={i}>
                                <span className="title-style">{n.title}</span>
                                <span className="content-style">{n.desc}</span>
                            </div>
                        )
                    };

                    let dingdanDesc = (n, i)=> {
                        let main_shop_name = '';
                        let branch_shop_name = '';
                        res.shop.forEach((n2, i)=> {
                            if (n.shop_ids == n2.shop_id) {
                                main_shop_name = n2.main_shop_name;
                                branch_shop_name = n2.branch_shop_name;
                            }
                        })
                        return (
                            <div className='dingdan-style' key={i}>
                                <div>{n.start_time} 至 {n.end_time}</div>
                                <div>{main_shop_name} - {branch_shop_name} </div>
                                <div>{n.remark}</div>
                            </div>
                        )
                    }

                    //1
                    const columns = [{
                        dataIndex: 'title',
                        key: 'title',
                        className: 'col',
                    }, {
                        dataIndex: 'val',
                        key: 'val',
                        className: 'col2',
                        render: (text, row, index)=> {
                            if (index == 2) {
                                return {
                                    children: row.val.map((n, i)=>render(n, i)),
                                    props: {
                                        colSpan: 3,
                                    }
                                }
                            } else if (index == 3) {
                                return {
                                    children: <img src={imgRender(row.val)}></img>,
                                    props: {
                                        colSpan: 3,
                                    }
                                }
                            } else if (index == 4 || index == 5) {
                                return {
                                    children: row.val.map((n, i)=>renderImg(n, i)),
                                    props: {
                                        colSpan: 3,
                                    }
                                }
                            }
                            else {
                                return {
                                    children: <span>{text}</span>,
                                }
                            }

                        }
                    }, {
                        dataIndex: 'title2',
                        key: 'title2',
                        className: 'col',
                        render: (text, row, index)=> {
                            if (index == 0 || index == 1) {
                                return {
                                    children: <span>{text}</span>
                                }
                            } else if (index == 2 || index == 3 || index == 4 || index == 5) {
                                return {
                                    props: {
                                        colSpan: 0,
                                    }
                                }
                            }
                        }
                    }, {
                        dataIndex: 'val2',
                        key: 'val2',
                        className: 'col3',
                        render: (text, row, index)=> {
                            if (index == 2 || index == 3 || index == 4 || index == 5) {
                                return {
                                    props: {
                                        colSpan: 0,
                                    }
                                }
                            } else {
                                return (
                                    <span>{text}</span>
                                )
                            }
                        }
                    }];

                    let arr=[{
                        key: '1',
                        title: '套餐名称',
                        val: res.subject,
                        title2: '原价',
                        val2: res.original_price,
                    }, {
                        key: '2',
                        title: '折扣价',
                        val: res.price,
                        title2: '订金',
                        val2: res.deposit,
                    }, {
                        key: '3',
                        title: '所属门店',
                        val: res.shop,
                    }, {
                        key: '4',
                        title: '套餐封面图',
                        val: res.cover_url,
                    }, {
                        key: '5',
                        title: '套餐头图',
                        val: res.top_images,
                    }, ];
                    let arr2=[];
                    if(res.price_mode=="FIX"){
                        arr2=[];
                    }else{
                        arr2=[{
                            key: '6',
                            title: '图文详情',
                            val: res.content_images,
                        }]
                    }

                    arr=arr.concat(arr2);
                    const datal = [].concat(arr);



                    //2
                    const columns2 = [
                        {
                            dataIndex: 'title',
                            key: 'title',
                            className: 'col',
                        }, {
                            dataIndex: 'val',
                            key: 'val',
                            className: 'col4',
                            render: (text, row, index)=> {
                                if (index == 0) {
                                    return {
                                        children: row.val.map((n, i)=>renderFuwu(n, i)),
                                    }
                                } else if (index == 1 || index == 2) {
                                    return {
                                        children: row.val.map((n, i)=>renderDesc(n, i)),
                                    }
                                } else {
                                    return {
                                        children: <span>{row.val}</span>
                                    }
                                }

                            }
                        }
                    ]
                    const data2 = [
                        {
                            key: "1",
                            title: '服务团队',
                            val: [{
                                title: '主持人',
                                level: res.zhuchi_level,
                                desc: res.zhuchi_desc,
                            }, {
                                title: '化妆师',
                                level: res.huazhuang_level,
                                desc: res.huazhuang_desc,
                            }, {
                                title: '摄影师',
                                level: res.sheying_level,
                                desc: res.sheying_desc,
                            }, {
                                title: '摄像师',
                                level: res.shexiang_level,
                                desc: res.shexiang_desc,
                            }]
                        }, {
                            key: '2',
                            title: '婚礼布置',
                            val: [{
                                title: '迎宾区',
                                desc: res.yingbin,
                            }, {
                                title: '仪式区',
                                desc: res.yishi
                            }, {
                                title: '宴会区',
                                desc: res.yanhui,
                            }, {
                                title: '花艺',
                                desc: res.huayi
                            }]
                        }, {
                            key: '3',
                            title: '灯光舞美',
                            val: [{
                                title: '婚礼灯光',
                                desc: res.dengguang,
                            }, {
                                title: '舞美道具',
                                desc: res.daoju,
                            }]
                        }, {
                            key: '4',
                            title: '购买须知',
                            val: res.buyer_notes,
                        }
                    ]

                    //3
                    const columns3 = [{
                        dataIndex: 'title',
                        key: 'title',
                        className: 'col',
                    }, {
                        dataIndex: 'val',
                        key: 'val',
                        className: 'col4',
                        render: (text, row, index)=> {
                            return {
                                children: row.val.map((n, i)=>dingdanDesc(n, i)),
                            }
                        }
                    }];
                    const data3 = [{
                        key: '1',
                        title: '订单礼',
                        val: res.gifts,
                    }];

                    return (
                        <div className="detail-wrapper">
                            <h2 className="page-title">套餐管理 > 套餐详情</h2>
                            <div className="breadcrumb-wrapper">
                                <Breadcrumb>
                                    <Breadcrumb.Item><Link to="/cehua">首页</Link></Breadcrumb.Item>
                                    <Breadcrumb.Item><Link to="/cehua/products">套餐列表</Link></Breadcrumb.Item>
                                    <Breadcrumb.Item>套餐详情</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <div className="table-block">
                                <div className="title-block">
                                    <span className="title">基本信息<span className="line"></span></span>
                                </div>
                                <Table
                                    bordered={true}
                                    pagination={false}
                                    showHeader={false}
                                    rowClassName={e=>'ddd'}
                                    columns={columns}
                                    dataSource={datal}
                                />
                            </div>
                            <div className="table-block">
                                <div className="title-block">
                                    <span className="title">服务内容<span className="line"></span></span>
                                </div>
                                <Table
                                    bordered={true}
                                    pagination={false}
                                    showHeader={false}
                                    rowClassName={e=>'ddd'}
                                    columns={columns2}
                                    dataSource={data2}
                                />
                            </div>
                            <div className="table-block">
                                <div className="title-block">
                                    <span className="title">礼品配置<span className="line"></span></span>
                                </div>
                                <Table
                                    bordered={true}
                                    pagination={false}
                                    showHeader={false}
                                    rowClassName={e=>'ddd'}
                                    columns={columns3}
                                    dataSource={data3}
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
            <div className="product-wrapper my-page-wrapper">
                {renderProduct()}
            </div>
        );
    }
});

function mapStateToProps(state) {
    const {product}=state;
    let {data,isFetching,iRet}=product
    return {
        data,
        isFetching,
        iRet,
    }
}

export default ReactRedux.connect(mapStateToProps)(Products)


