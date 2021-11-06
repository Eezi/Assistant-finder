import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userChatsReducer,
  productReviewCreateRedcuer,
  chatCreateReducer,
  getChatByIdReducer,
  readChatReducer,
} from "./reducers/chatReducers.js";
import {
  userLoginReducer,
  userRegisterRedcuer,
  userDetailsReducer,
  updateUserProfileRedcuer,
  userListReducer,
  userDeleteReducer,
  updateUserRedcuer,
  participatedUsersReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  userChats: userChatsReducer,
  getChat: getChatByIdReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterRedcuer,
  userDetails: userDetailsReducer,
  userUpdateProfile: updateUserProfileRedcuer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: updateUserRedcuer,
  chatCreate: chatCreateReducer,
  productReviewCreate: productReviewCreateRedcuer,
  participatedUsers: participatedUsersReducer,
  //readMessages: readChatReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;


const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
