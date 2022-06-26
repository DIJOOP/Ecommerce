import {createReducer} from "@reduxjs/toolkit"
const initialState={}

export const newOrderReducer = createReducer(initialState,{

    createOrderRequest : (state)=>{
        state.loading=true
    },

    createOrderSuccess:(state,action)=>{
        state.loading=false
        state.order=action.payload
    },
    createOrderFail:(state,action)=>{
        state.loading=false
        state.error= action.payload
    },

    clearErrors: (state) => {
        state.error = null;
      },

})

export const myOrderReducer = createReducer(initialState,{
   myOrderRequest : (state)=>{
        state.loading=true
    },

   myOrderSuccess:(state,action)=>{
        state.loading=false
        state.orders=action.payload
    },
   myOrderFail:(state,action)=>{
        state.loading=false
        state.error= action.payload
    },

    clearErrors: (state) => {
        state.error = null;
      },

})

export const orderDetailReducer =createReducer(initialState,{
    orderDetailRequest:(state)=>{
        state.loading=true
    },

    orderDetailSuccess:(state,action)=>{
        state.loading=false
        state.order =action.payload
    },
    orderDetailFail:(state,action)=>{
        state.loading=false
        state.error=action.payload
    },
    clearErrors: (state) => {
        state.error = null;
      },


})

// ADMIN


export const getAllOrdersReducer=createReducer(initialState,{
    allOrderRequest:(state=>{
        state.loading=true
    }),
    allOrderSuccess:(state,action)=>{
    
        state.loading=false
        state.orders=action.payload
    },
    allOrderfail:(state,action)=>{
        state.loading=false
        state.error= action.payload
    },
    clearErrors: (state) => {
        state.error = null;
      },

})

export const updateOrderReducer=createReducer(initialState,{
    updateOrderRequest:(state)=>{
        state.loading=true
    },
    updateOrderSuccess:(state,action)=>{
        state.loading=false
        state.isUpdated=action.payload
    },
    updateOrderFail:(state,action)=>{
        state.loading=false
        state.error=action.payload
    },
    updateOrderReset:(state)=>{
        state.isUpdated=false
    },

   deleteOrderRequest:(state)=>{
        state.loading=true
    },
   deleteOrderSuccess:(state,action)=>{
        state.loading=false
        state.isDeleted=action.payload
    },
   deleteOrderFail:(state,action)=>{
        state.loading=false
        state.error=action.payload
    },
   deleteOrderReset:(state)=>{
        state.isDeleted=false
    },
    clearErrors: (state) => {
        state.error = null;
      },

})