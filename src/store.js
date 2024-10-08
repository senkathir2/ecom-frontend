import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productCreateReducers, productDeatilsReducers, productDeleteReducers, productListReducers, productReviewCreateReducers, productTopRatedReducers, productUpdateReducers } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userDeleteReducer, userDetailsReducers, userEmailActivateReducer, userListReducer, userLoginReducers, userRegisterReducers, userUpdateProfileReducers, userUpdateReducer } from './reducers/userReducers'
import { orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderListMyReducer, orderListReducer, orderPayReducer } from './reducers/orderReducers'



const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDeatilsReducers,
    cart: cartReducer,
    userLogin: userLoginReducers,
    userRegister: userRegisterReducers,
    userDetails: userDetailsReducers,
    userUpdateProfile : userUpdateProfileReducers,
    userList:userListReducer,
    orderCreate : orderCreateReducer,
    orderDetails : orderDetailsReducer,
    orderPay : orderPayReducer,
    orderListMy : orderListMyReducer,
    userDelete : userDeleteReducer,
    userUpdate : userUpdateReducer,
    productDelete : productDeleteReducers,
    productCreate : productCreateReducers,
    productUpdate : productUpdateReducers,
    orderList : orderListReducer,
    orderDeliver: orderDeliverReducer,
    productReviewCreate : productReviewCreateReducers,
    productTopRated: productTopRatedReducers,
    userEmailActivate : userEmailActivateReducer
    
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = { 
    cart: {cartItems : cartItemsFromStorage, shippingAddress: shippingAddressFromStorage}, 
    userLogin: { userInfo: userInfoFromStorage},

}



const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store