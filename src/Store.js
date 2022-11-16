import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./pages/cart/reducers/CartReducer";
import detailSlice from './pages/detail/reducers/DetailReducers'
import ProfileReducer from "./pages/profile/reducers/ProfileReducer";
import SearchReducer from "./pages/search/reducers/SearchReducer";

export default configureStore({
    reducer:{detail:detailSlice, cart: cartReducer, search:SearchReducer, profile:ProfileReducer}
})