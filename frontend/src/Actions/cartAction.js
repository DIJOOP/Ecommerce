import axios from "axios";

export const addItemstoCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);

  dispatch({
    type: "addToCArt",
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// REMOVE FROM CART

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: "removeCartItem",
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO

export const saveShipping = (data) => async (dispatch) => {
  dispatch({ type: "saveShippingInfo", payload: data });

  localStorage.setItem("shippingInfo",JSON.stringify(data))

};
