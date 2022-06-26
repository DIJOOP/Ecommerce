import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const userReducer = createReducer(initialState, {
  loginRequest : (state) => {
    state.loading = true;
    state.isAuthenticated = false;
  },

  loginSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  loginFail: (state, action) => {
    state.loading = false;
    state.user = null;
    state.isAuthenticated = false;
    state.error = action.payload;
  },

  registerRequest : (state) => {
    state.loading = true;
    state.isAuthenticated = false;
  },



  registerSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  registerFail: (state, action) => {
    state.loading = false;
    state.user = null;
    state.isAuthenticated = false;
    state.error = action.payload;
  },

  logoutSuccess:(state)=>{
    state.loading = false;
    state.user = null;
    state.isAuthenticated = false;
  },
  logoutFail:(state,action)=>{
    state.loading = false;
    state.isAuthenticated = false;
    state.error=action.payload
  },


  loadUserRequest : (state,action) => {
    state.loading = true;
    state.isAuthenticated = false;
    state.error = action.payload;
  },

  loadUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  loadUserFail: (state, action) => {
    state.loading = false;
    state.user = null;
    state.isAuthenticated = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});


export const profileRducer= createReducer(initialState,{
  updateProfileRequest : (state) => {
    state.loading = true;
   
  },

  updateProfileSuccess: (state, action) => {
    state.loading = false;
    state.isUpdated = action.payload;
  
  },
  updateProfileFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  updateProfileReset:(state)=>{
    state.isUpdated=false
  },

  updatePasswordRequest : (state) => {
    state.loading = true;
   
  },

  updatePasswordSuccess: (state, action) => {
    state.loading = false;
    state.isUpdated = action.payload;
  
  },
  updatePasswordFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  updatePasswordReset:(state)=>{
    state.isUpdated=false
  },
  clearErrors: (state) => {
    state.error = null;
  },
})


export const forgotPassswordReducer= createReducer(initialState,{

  forgotPassswordRequest:(state)=>{
    state.loading=true;
    state.error=null;
  },

  forgotPasswordSuccess:(state,action)=>{

    state.loading=false;
    state.test=true;
    state.message=action.payload;
  },
  forgotPasswordFail:(state,action)=>{
    state.loading=false
    state.error=action.payload
   
  },



  resetPasswordRequest:(state)=>{
    state.loading=true;
    state.error=null;
  },

  resetPasswordSuccess:(state,action)=>{

    state.loading=false;
    state.test=true;
    state.success=action.payload;
  },
  resetPasswordFail:(state,action)=>{
    state.loading=false
    state.error=action.payload
   
  },



  clearErrors: (state) => {
    state.error = null;
    state.message=null
  },
})


// ADMIN


export const allUserReducer=createReducer(initialState,{
  allUserRequest:(state)=>{
    state.loading=true
  },allUserSuccess:(state,action)=>{
    state.loading=false
    state.users=action.payload
  },
  allUserFail:(state,action)=>{
    state.loading=false
    state.error = action.payload
  },
  clearErrors: (state) => {
    state.error = null;
  },

})

export const userDetailReducer=createReducer(initialState,{
  userDetailRequest:(state)=>{
    state.loading=true
  },userDetailSuccess:(state,action)=>{
    state.loading=false
    state.user=action.payload
  },
  userDetailFail:(state,action)=>{
    state.loading=false
    state.error=action.payload
  },
  clearErrors: (state) => {
    state.error = null;
    
  },

})
export const updateUserReducer=createReducer(initialState,{
  uodateUserRequest:(state)=>{
    state.loading=true
  },
  updateUserSuccess:(state,action)=>{
    state.loading=false
    state.isUpdated=action.payload
  },
  UpdateUserFail:(state,action)=>{
    state.loading=false
    state.error=action.payload
  },
  updateUserReset:(state)=>{
    state.isUpdated=false
  },

  // deleteuser

  DeleteUserRequest:(state)=>{
    state.loading=true
  },
  DeleteUserSuccess:(state,action)=>{
    state.loading=false
    state.isDeleted=action.payload
  },
  DeleteUserFail:(state,action)=>{
    state.loading=false
    state.error=action.payload
  },
 deleteUserReset:(state)=>{
    state.isDeleted=false
  },
  
  clearErrors: (state) => {
    state.error = null;
    
  },


})