import Index from './containers/Index'
import Products from './containers/Products'
import ProductAdd from './containers/ProductAdd'
import ProductUpdate from './containers/ProductUpdate'
import Product from './containers/Product'
import Auth from './containers/Auth'
import Order from './containers/Order'
import Orders from './containers/Orders'
import NoAuth from './containers/NoAuth'

import store from './store'

var Router=ReactRouter.Router;
var Route=ReactRouter.Route;
var Redirect=ReactRouter.Redirect;
var IndexRoute=ReactRouter.IndexRoute;
var browserHistory=ReactRouter.browserHistory;
var hashHistory=ReactRouter.hashHistory;
var Provider=ReactRedux.Provider;


// console.log(hashHistory)

let reactElement = document.getElementById('root');


let bodyClass='';
let htmlClass='';


const onUpdateRoute = () => {
    let path=hb.location.url('path');
    switch (true){
        case path=='/':
        case path=='':
            htmlClass=`index-html`;
            bodyClass=`index-body`;
            break;
        case path=='/login':
            htmlClass=`login-index`;
            bodyClass=`login-index`;
            break;
        //case path=='/user/collect':
        //    htmlClass=`collect-html`;
        //    bodyClass=`collect-body header-bar-body`;
        //    break;
        default:
            htmlClass=`user-html`;
            bodyClass=`user-body header-bar-body`;
            break;
    }
    $('html').addClass(htmlClass);
    $('body').addClass(bodyClass);
    
};
const onLeaveRoute = (prevState) => {
    $('html').removeClass(htmlClass);
    $('body').removeClass(bodyClass);
};



ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} onUpdate={onUpdateRoute}>

        <Route path="/cehua" breadcrumbName="首页" component={Index}  onLeave={onLeaveRoute}  />
        <Route path="/cehua/"   >
            <IndexRoute  breadcrumbName="首页" component={Index}  onLeave={onLeaveRoute} />
            <Route path="products"  breadcrumbName="套餐列表" component={Products}   onLeave={onLeaveRoute} />
            <Route path="products/" >
                <IndexRoute  breadcrumbName="套餐列表"  component={Products}  onLeave={onLeaveRoute}  />
                <Route path="product/add"  breadcrumbName="新增套餐" component={ProductAdd}   onLeave={onLeaveRoute}  />
                <Route path="product/update/:id"  breadcrumbName="修改套餐" component={ProductUpdate}   onLeave={onLeaveRoute}  />
                <Route path="product/:id"  breadcrumbName="套餐详情" component={Product}   onLeave={onLeaveRoute}  />
            </Route>
            <Route path="orders" breadcrumbName="订单列表"  component={Orders}   onLeave={onLeaveRoute}  />
            <Route path="orders/" >
                <IndexRoute  breadcrumbName="订单列表"  component={Orders}   onLeave={onLeaveRoute}   />
                <Route path="order/:id"  breadcrumbName="套餐详情"  component={Order}   onLeave={onLeaveRoute}  />
            </Route>
            <Route path="noAuth"  breadcrumbName="未授权" component={NoAuth}   onLeave={onLeaveRoute}  />
        </Route>
        

    </Router>
  </Provider>,
    reactElement
);


