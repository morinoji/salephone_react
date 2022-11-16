
import { createSlice } from "@reduxjs/toolkit";

export const profileSlice=createSlice({
    name:"profile",
    initialState:{
        detail:"",
        orders:[]
    },
    reducers:{
        storeProfile: (state, data)=>{
            state.detail=data.payload;
        },
        storeOrder: (state, data)=>{
            state.orders=data.payload;
        },
    }
})

export const {storeProfile,storeOrder} = profileSlice.actions

export default profileSlice.reducer