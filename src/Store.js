import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./pages/cart/reducers/CartReducer";
import detailSlice from './pages/detail/reducers/DetailReducers'

export default configureStore({
    reducer:{detail:detailSlice, cart: cartReducer}
})