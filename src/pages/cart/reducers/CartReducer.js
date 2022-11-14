import { createSlice } from "@reduxjs/toolkit";

export const cartSlice=createSlice({
    name:"cart",
    initialState:{
        cartItems:[],
        cartCount:0,
    },
    reducers:{
        getCart: (state, data)=>{
           let cartItems = localStorage.getItem("cart");
            cartItems = JSON.parse(cartItems);
            state.cartItems=cartItems;
        },
        add2cart: (state, data)=>{
            
            let list=[];
            let isDup=false;
            let cartItems = localStorage.getItem("cart");
            list = JSON.parse(cartItems);
            if(list!=null){
                for (let index = 0; index < list.length; index++) {
                
                    if(data.payload.id==list[index].id){
                     console.log(list[index].id)
                     list[index].quantity+=1;
                     isDup=true;
                     break;
                    }
                     
                 }
                 if(isDup==false){
                     list.push(data.payload)
                     state.cartCount+=1
                 }
                 
            }else{
                list=[];
                list.push(data.payload)
                state.cartCount+=1
            }
            localStorage.setItem("cart", JSON.stringify(list));
            
            // console.log(data.payload.id)
            // list.push({"id":21,"thumbnail":"s7.png", "quantity":10,"price":1000000,"title":"Samsung Galaxy S7","brand":"SAMSUNG"})
            
        },
        deleteAllCart: (state, data)=>{
          localStorage.removeItem("cart");
        },
        getBadge: (state, data)=>{
            let count=0;
            let cartItems = localStorage.getItem("cart");
            cartItems = JSON.parse(cartItems);
            // if(cartItems==null || cartItems.length) count=0;
            // else count=cartItems.length;
            
            state.cartCount=cartItems==null? 0 :cartItems.length;
        },

    }
})

export const {getCart, getBadge, add2cart, deleteAllCart} = cartSlice.actions

export default cartSlice.reducer