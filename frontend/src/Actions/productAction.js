import axios from "axios";

export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 50000], category, rating = 0) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "allProductRequest",
      });
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`;
      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${rating}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: "allProductSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "allProductsFail",
        payload: error.response.data.message,
      });
    }
  };

export const getProductDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: "productDetailRequest" });

    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch({
      type: "productDetailSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: " productDetailFail",
      payload: error.response.data.message,
    });
  }
};

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({
      type: "newReviewRequest",
    });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({
      type: "newReviewSuccess",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: " newReviewFail",
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "clearErrors" });
};

// ADMIN

export const getAllAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "adminProductRequest" });

    const { data } = await axios.get(`/api/v1/admin/products`);
    dispatch({
      type: "adminProductSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: " adminProductsFail",
      payload: error.response.data.message,
    });
  }
};

// create new product

export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({
      type: "newProductRequest",
    });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/admin/product/new`,
      productData,
      config
    );

    dispatch({
      type: "newProductSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: " newProductFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "productDeleteRequest",
    });

    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

    dispatch({
      type: "productDeleteSuccess",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: " productDeleteFail",
      payload: error.response.data.message,
    });
  }
};

export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({
      type: "updateProductRequest",
    });
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: "updateProductSuccess",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: " updateProductFail",
      payload: error.response.data.message,
    });
  }
};

// product review

export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "allReviewsRequest",
    });
    const { data } = await axios.get(`/api/v1/review?id=${id}`);
    dispatch({
      type: "allReviewsSuccess",
      payload: data.reviews
    });
  } catch (error) {
    dispatch({
      type: "allReviewsFail",
      patload: error.response.data.message,
    });
  }
};

export const deleteReview = (productId, reviewId) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteReviewRequest",
    });

    const { data } = await axios.delete(
      `/api/v1/review?productId=${productId}&id=${reviewId}`
    );

    dispatch({
      type: "deleteReviewSuccess",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "deleteReviewFail",
      payload: error.response.data.message,
    });
  }
};
