import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  ProductListReducer,
  ProductDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  updateProductRedcuer,
  productReviewCreateRedcuer,
  ProductTopReducer
} from "./reducers/productReducers.js";
import { cartReducer } from "./reducers/cartReducers";
import {
  orderCreateReducer,
  orderDetaildReducer,
  orderPayReducer,
  myOrdersReducer,
  allOrdersReducer,
  orderDeliverReducer
} from "./reducers/orderReducers";
import {
  userLoginReducer,
  userRegisterRedcuer,
  userDetailsReducer,
  updateUserProfileRedcuer,
  userListReducer,
  userDeleteReducer,
  updateUserRedcuer
} from "./reducers/userReducers";

const reducer = combineReducers({
  productList: ProductListReducer,
  productTop: ProductTopReducer,
  productDetails: ProductDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterRedcuer,
  userDetails: userDetailsReducer,
  userUpdateProfile: updateUserProfileRedcuer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetaildReducer,
  orderPay: orderPayReducer,
  myOrders: myOrdersReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: updateUserRedcuer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: updateProductRedcuer,
  orderList: allOrdersReducer,
  orderDeliver: orderDeliverReducer,
  productReviewCreate: productReviewCreateRedcuer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};

  
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
 
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
