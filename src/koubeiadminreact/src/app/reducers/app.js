import products from './products'
import shops from './shops'
import product from './product'
import order from './order'
import orders from './orders'
import index from './index'


// var reduxFormReducer=ReduxForm.reducer

export default Redux.combineReducers({
 	// form: reduxFormReducer,
    products,
    shops,
    product,
    order,
    orders,
    index
})