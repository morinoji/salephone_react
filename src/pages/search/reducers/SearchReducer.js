import { createSlice } from "@reduxjs/toolkit";

export const searchSlice=createSlice({
    name:"search",
    initialState:{
        items:[],
        itemsSearch:[],
        category_id:0,
        searchText:"",
        category_name:""
    },
    reducers:{
        storeItems: (state, data)=>{
            state.items=data.payload;
        },
        storeCateId: (state, data)=>{
            state.category_id=data.payload;
        },
        storeSearchText: (state, data)=>{
            state.searchText=data.payload;
        },
        storeItemsSearch: (state, data)=>{
            state.itemsSearch=data.payload;
        },
        storeCategoryName: (state, data)=>{
            state.category_name=data.payload;
        },
    }
})

export const {storeItems, storeCateId, storeItemsSearch, storeSearchText, storeCategoryName} = searchSlice.actions

export default searchSlice.reducer