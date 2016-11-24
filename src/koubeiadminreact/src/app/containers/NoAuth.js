
var { Row,Col } = antd;
var PageNoAuth=React.createClass({
    componentDidMount:function(){
        app.util.setIframeHeight();
    },
    render(){
        let koubei_token_error_info=hb.Cookies.get('koubei_token_error_info');
        return(
            <div className="detail-wrapper">
                <Row type="flex" justify="center" align="middle" className="error-message">
                    <Col span={12} className="error-icon">
                        <div className="circle-wrapper">
                            <span className="haloIcon haloIcon-404"></span>
                        </div>
                    </Col>
                    <Col span={12} className="error-desc">
                        <div style={{fontSize:48,color:'#FF6600',marginBottom:10,}}>抱歉！您未能成功获得授权</div>
                        <div style={{fontSize:18,color:'#666666',marginBottom:10,}}>请重新授权</div>
                        <div className="error-text">{koubei_token_error_info}</div>
                    </Col>
                </Row>
            </div>
        )
    }
});

export default PageNoAuth;

