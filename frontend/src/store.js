import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  ProductListReducer,
  productDeleteReducer,
  chatCreateReducer,
  productReviewCreateRedcuer,
  ProductTopReducer
} from "./reducers/chatReducers.js";
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
  userLogin: userLoginReducer,
  userRegister: userRegisterRedcuer,
  userDetails: userDetailsReducer,
  userUpdateProfile: updateUserProfileRedcuer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: updateUserRedcuer,
  productDelete: productDeleteReducer,
  chatCreate: chatCreateReducer,
  productReviewCreate: productReviewCreateRedcuer,
});

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
