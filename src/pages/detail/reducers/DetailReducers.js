import { createSlice } from "@reduxjs/toolkit";

export const detailSlice=createSlice({
    name:"detail",
    initialState:{
        imageList:[],
        colors:[],
        presents:[],
        innerDetail:"",
        detail:"",
        star:5,
        comments:[]
    },
    reducers:{
        storeImageList: (state, data)=>{
            state.imageList=data.payload;
        },
        storecolors: (state, data)=>{
            state.colors=data.payload;
        },
        storePresents: (state, data)=>{
            state.presents=data.payload;
        },
        storeDetail: (state, data)=>{
            state.detail=data.payload;
        },
        storeInnerDetail: (state, data)=>{
            state.innerDetail=data.payload;
        },
        storeStar: (state, data)=>{
            state.star=data.payload;
        },
        storeComment:(state, data)=>{
            state.comments=data.payload;
        },
    }
})

export const {storeImageList, storeDetail, storePresents, storecolors, storeInnerDetail, storeStar,storeComment} = detailSlice.actions

export default detailSlice.reducer