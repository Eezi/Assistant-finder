import {
  USER_CHATS_FAIL,
  USER_CHATS_SUCCESS,
  USER_CHATS_REQUEST,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  CREATE_CHAT_FAIL,
  CREATE_CHAT_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  GET_CHAT_REQUEST,
  GET_CHAT_SUCCESS,
  GET_CHAT_FAIL,
  GET_CHAT_RESET,
} from "../constants/chatConstants.js";

export const userChatsReducer = (state = { allUserChats: null }, action) => {
  switch (action.type) {
    case USER_CHATS_REQUEST:
      return { loading: true, allUserChats: null };
    case USER_CHATS_SUCCESS:
      return {
        loading: false,
        allUserChats: action.payload,
      };
    case USER_CHATS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const chatCreateReducer = (state = { chat: null }, action) => {
  switch (action.type) {
    case CREATE_CHAT_REQUEST:
      return { ...state, loading: true, ...state }
    case CREATE_CHAT_SUCCESS:
      return { loading: false, success: true, chat: action.payload };
    case CREATE_CHAT_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_CHAT_RESET:
      return {};
    default:
      return state;
  }
};

export const productReviewCreateRedcuer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const getChatByIdReducer = (state = { chat: null }, action) => {
  switch (action.type) {
      case GET_CHAT_REQUEST:
          return { ...state, loading: true, ...state }
      case GET_CHAT_SUCCESS:
          return { loading: false, chat: action.payload }
      case GET_CHAT_FAIL:
          return { loading: false, error: action.payload };
      case GET_CHAT_RESET:
          return { chat: null }
      default:
          return state
  }
}
