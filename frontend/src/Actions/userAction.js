import axios from "axios";

// LOGIN

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "loginRequest",
    });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );
    dispatch({
      type: "loginSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "loginFail",
      payload: error.response.data.message,
    });
  }
};

// REGISTER

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: "registerRequest",
    });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`/api/v1/register`, userData, config);
    console.log();
    dispatch({
      type: "registerSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "registerFail",
      payload: error.response.data.message,
    });
  }
};

// LOGOUT
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`api/v1/logout`);
    dispatch({
      type: "logoutSuccess",
    });
  } catch (error) {
    dispatch({
      type: "logoutFail",
      payload: error.response.data.message,
    });
  }
};
// update USER PROFILE

export const updateUser = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: "updateProfileRequest",
    });
    console.log(userData);
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(`/api/v1/me/update`, userData, config);
    dispatch({
      type: "updateProfileSuccess",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "updateProfileFail",
      payload: error.response.data.message,
    });
  }
};

// update USER PROFILE
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({
      type: "updatePasswordRequest",
    });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/v1/password/update`,
      passwords,
      config
    );
    dispatch({
      type: "updatePasswordSuccess",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "updatePasswordFail",
      payload: error.response.data.message,
    });
  }
};

// FORGOT PASSWORD

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "forgotPassswordRequest",
    });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`/api/v1/password/forgot`, email, config);

    dispatch({
      type: "forgotPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "forgotPasswordFail",
      payload: error.response.data.message,
    });
  }
};

// RESET PASSWORD

export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({
      type: "resetPassswordRequest",
    });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({
      type: "resetPasswordSuccess",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "resetPasswordFail",
      payload: error.response.data.message,
    });
  }
};

// LOAD USER

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadUserRequest",
    });
    const { data } = await axios.get(`/api/v1/me`);
    dispatch({
      type: "loadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "loadUserFail",
      payload: error.response.data.message,
    });
  }
};

// ADMIN

export const getAllUsers =() => async (dispatch) => {
  try {
    dispatch({
      type: "allUserRequest",
    });

    const { data } = await axios.get("/api/v1/admin/users");

    dispatch({
      type: "allUserSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "allUserFail",
      payload: error.response.data.message,
    });
  }
};

export const getUserDetail = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "userDetailRequest",
    });

    const { data } = await axios.get(`/api/v1/admin/user/${id}`);

    dispatch({
      type: "userDetailSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "userDetailFail",
      payload: error.response.data.message,
    });
  }
};

export const updateUserbyAdmin = (id, userData) => async (dispatch) => {
  try {
    dispatch({
      type: "uodateUserRequest",
    });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/v1/admin/user/${id}`,
      userData,
      config
    );

    dispatch({
      type: "updateUserSuccess",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "UpdateUserFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteUserbyAdmin = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteUserRequest",
    });

    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

    dispatch({
      type: "DeleteUserSuccess",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "DeleteUserFail",
      payload: error.response.data.message,
    });
  }
};

// CLEAR ERROR
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "clearErrors" });
};
