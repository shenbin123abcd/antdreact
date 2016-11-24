import {fetchIndexIfNeeded} from '../actions/index'
import koubeiIndex from '../images/koubei-index.png'
import orderPic from '../images/order-pic.png'
import productPic from '../images/product-pic.png'
import info1 from '../images/info1.png'
import info2 from '../images/info2.png'
import info3 from '../images/info3.png'
import info4 from '../images/info4.png'

var hashHistory=ReactRouter.hashHistory;
let Link=ReactRouter.Link;

var Alert=antd.Alert;
var { Row,Col,Button,Alert } = antd;


var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var Index = React.createClass({

    componentDidMount:function(){
        // console.log(document.documentElement.scrollHeight)
        app.util.setIframeHeight();
        const { dispatch,location } = this.props;

        if(location.query.app_auth_code||location.query.auth_code){
            hb.Cookies.remove('koubei_token')
        }


        let koubei_token=hb.Cookies.get('koubei_token');

        if(!koubei_token){
            $.ajax({
                type:'post',
                // url:'/callback/authTest',
                url:'/public/loginLog',
                data:{
                    url:window.location.href
                },
                dataType:'json',
            });
            dispatch(fetchIndexIfNeeded(location.query));
            hashHistory.push('/cehua')
        }
    },
    componentDidUpdate:function(){
        // console.log(document.documentElement.scrollHeight)
        app.util.setIframeHeight();
    },

    render: function() {
        const { dispatch} = this.props;
        const { isFetching,isAuthError,authErrorInfo } = this.props.index;
        let koubei_token=hb.Cookies.get('koubei_token');
        let koubei_token_error_info=hb.Cookies.get('koubei_token_error_info');
        // console.log(index)
        let renderPage=()=>{
            if(isFetching){
                return(
                    <div key={1}>
                        <Alert description="正在授权中，请耐心等待..." type="info"/>
                    </div>
                )
            }else if(isAuthError){
                return(
                    <div key={2}>
                        <Alert description={authErrorInfo} type="info"/>
                    </div>
                )
            }else if(koubei_token){
                return(
                    <div className="index-content">
                        <h2 className="page-title" >我的服务</h2>
                        <div className="page-text">欢迎您来到婚礼策划套餐管理</div>
                        <div className="index-pic-block">
                            <img src={koubeiIndex} alt=""/>
                        </div>
                        <div className="index-content-block">
                            <Row type="flex" justify="center" align="middle" style={{textAlign:'center'}}>
                                <Col span={12}>
                                    <div className="pic">
                                        <img src={productPic} alt=""/>
                                    </div>
                                    <div className="text">添加图文信息，描述产品详情<br/>秀出你的吸引力</div>
                                    <Button type="primary" className="btn" onClick={e=>hashHistory.push(`/cehua/products`)}>进入管理</Button>
                                </Col>
                                <Col span={12}>
                                    <div className="pic">
                                        <img src={orderPic} alt=""/>
                                    </div>
                                    <div className="text">你的订单，都在这里<br/>请查看明细</div>
                                    <Button type="primary" className="btn" onClick={e=>hashHistory.push(`/cehua/orders`)}>进入管理</Button>
                                </Col>
                            </Row>
                        </div>
                        <Alert message="温馨提示：套餐将于11月中旬后自动在新版支付宝口碑店铺中展示" type="info" showIcon />
                        <div className="index-bottom-block" style={{marginTop:'-10px'}}>
                            <div className="title">产品特征</div>
                            <div className="block-info">
                                <Row type="flex" justify="center" align="middle" style={{textAlign:'center'}}>
                                    <Col span={6}>
                                        <div className="pic"><img src={info1} alt=""/></div>
                                        <div className="info">
                                            专属平台，为婚礼人量身定制
                                            <br/>
                                            贴心设计功能选项，全面满足婚礼人的
                                            <br/>
                                            业务需求
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div className="pic"><img src={info2} alt=""/></div>
                                        <div className="info">
                                            模块简洁清新，交易自在随心
                                            <br/>
                                            简明的操作界面，让交流和支付更加
                                            <br/>
                                            高效、快捷
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div className="pic"><img src={info3} alt=""/></div>
                                        <div className="info">
                                            图文并茂，套餐详情精彩呈现
                                            <br/>
                                            可添加实景图片、文字描述，真实
                                            <br/>
                                            展现套餐卖点
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div className="pic"><img src={info4} alt=""/></div>
                                        <div className="info">
                                            统一布局，规范运营更见长效
                                            <br/>
                                            长期执行标准规范，致力于业务
                                            <br/>
                                            长期稳定发展
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                )
            }else{
                return (
                    <div key={3}>
                        <Alert description="加载中..." type="info"/>
                    </div>
                )
            }
        }
        return (
            <div>
                <CSSTransitionGroup  transitionName="mytransition" component="div" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {renderPage()}
                </CSSTransitionGroup>
            </div>
        )
    }
});

function mapStateToProps(state) {
    const {index}=state;
    return {
        index
    }
}

export default ReactRedux.connect(mapStateToProps)(Index)


