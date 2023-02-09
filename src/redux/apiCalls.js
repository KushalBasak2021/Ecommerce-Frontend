import { loginStart, loginSuccess, loginFailure, logout } from "./userRedux";
import axios from "axios";

export const login = async (dispatch, user) => {
  dispatch(loginStart());

  try {
    const res = await axios.post(
      "https://ecommerce-backend-tf4t.onrender.com/api/auth/login",
      user
    );
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const Logout = async (dispatch) => {
  dispatch(logout());
  window.location.href = "/";
};
