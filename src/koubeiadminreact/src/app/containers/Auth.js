
var hashHistory=ReactRouter.hashHistory;
let Link=ReactRouter.Link;

var Spin=antd.Spin;
var Alert=antd.Alert;

var Auth = React.createClass({

    componentDidMount:function(){
        const { dispatch } = this.props;

        function init(){
            getAuth()
        }
        function getAuth() {
            app.service.auth({
                app_auth_code:hb.location.url('?app_auth_code')
            }).then((res)=>{
                hb.Cookies.set('koubei_token',res.data.token,{ expires: 1/24*10 });
                // $state.go('product');
                //hashHistory.push('/')
            });
        }
        init()
    },

    render: function() {
        return (
            <div>
                <Alert description="正在授权中，请耐心等待..." type="info"/>
            </div>
        )
    }
});

function mapStateToProps(state) {
    return {

    }
}


export default ReactRedux.connect(mapStateToProps)(Auth)


