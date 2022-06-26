import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const productReducer = createReducer(initialState, {
  allProductRequest: (state) => {
    state.loading = true;
  },

  allProductSuccess: (state, action) => {
    state.loading = false;
    state.products = action.payload.products;
    state.productCount = action.payload.productsCount;
    state.resultPerPage = action.payload.resultPerPage;
    state.filteredProductCount = action.payload.filteredProductCount;
  },
  allProductsFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },

  // admin

  adminProductRequest: (state) => {
    state.loading = true;
  },

  adminProductSuccess: (state, action) => {
    state.loading = false;
    state.products = action.payload;
  },
  adminProductsFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});

export const productDetailReducer = createReducer(initialState, {
  productDetailRequest: (state) => {
    state.loading = true;
  },
  productDetailSuccess: (state, action) => {
    state.loading = false;
    state.product = action.payload;
  },
  productDetailFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const newReviewReducer = createReducer(initialState, {
  newReviewRequest: (state) => {
    state.loading = true;
  },
  newReviewSuccess: (state, action) => {
    state.loading = false;
    state.success = action.payload;
  },
  newReviewFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  newReviewReset: (state, action) => {
    state.success = false;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

//Admin

export const newProductReducer = createReducer(initialState, {
  newProductRequest: (state) => {
    state.loading = true;
  },
  newProductSuccess: (state, action) => {
    state.loading = false;
    state.success = action.payload;
    state.product = action.payload.product;
  },
  newProductFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  newProductReset: (state, action) => {
    state.success = false;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const updateproductReducer = createReducer(initialState, {
  productDeleteRequest: (state) => {
    state.loading = true;
  },
  productDeleteSuccess: (state, action) => {
    state.loading = false;
    state.isDeleted = action.payload;
   
  },
  productDeleteFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  productDeleteReset: (state, action) => {
    state.isDeleted = false;
  },
// UPDATE PRODUCT

updateProductRequest: (state) => {
  state.loading = true;
},
updateProductSuccess: (state, action) => {
  state.loading = false;
  state.isUpdated = action.payload;
 
},
updateProductFail: (state, action) => {
  state.loading = false;
  state.error = action.payload;
},
updateProductReset: (state, action) => {
  state.isUpdated = false;
},


  clearErrors: (state) => {
    state.error = null;
  },
});


// Review

export const allReviewsReducer = createReducer(initialState, {
  allReviewsRequest: (state) => {
    state.loading = true;
  },
  allReviewsSuccess: (state, action) => {
    state.loading = false;
    state.reviews = action.payload;
  },
  allReviewsFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
 
  clearErrors: (state) => {
    state.error = null;
  },
});

export const deleteReviewReducer = createReducer(initialState, {
  deleteReviewRequest: (state) => {
    state.loading = true;
  },
  deleteReviewSuccess: (state, action) => {
    state.loading = false;
    state.isDeleted = action.payload;
  },
  deleteReviewFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  deleteReviewReset: (state, action) => {
    state.isDeleted = false;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
