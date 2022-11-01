import { createSlice } from "@reduxjs/toolkit";

export const homeSlice=createSlice({
    name:"home",
    initialState:{
        slug:"asd"
    },
    reducers:{
        storeSlug: (state, a)=>{
            state.slug=a.payload;
        }
    }
})

export const {storeSlug} = homeSlice.actions

export default homeSlice.reducer