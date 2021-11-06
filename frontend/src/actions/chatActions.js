import {
  USER_CHATS_FAIL,
  USER_CHATS_SUCCESS,
  USER_CHATS_REQUEST,
  GET_CHAT_REQUEST,
  GET_CHAT_SUCCESS,
  GET_CHAT_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  CREATE_CHAT_FAIL,
  READ_CHAT_REQUEST,
  READ_CHAT_SUCCESS,
  READ_CHAT_FAIL,
} from "../constants/chatConstants.js";
import axios from "axios";

export const getUserChats = () => async (
  dispatch, getState
) => {
  try {
    dispatch({ type: USER_CHATS_REQUEST });
    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      },
    };

    const { data } = await axios.get(
      `/api/chats`,
      config,
    );

    dispatch({
      type: USER_CHATS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_CHATS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getChatById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_CHAT_REQUEST });

    const { data } = await axios.get(`/api/chats/${id}`);

    dispatch({
      type: GET_CHAT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CHAT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createChat = (chat) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_CHAT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post("/api/chats", chat, config);

    dispatch({
      type: CREATE_CHAT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_CHAT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
