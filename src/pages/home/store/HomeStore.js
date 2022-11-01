import { configureStore } from "@reduxjs/toolkit";
import homeReducer from './slicers/homeSlicer'

export default configureStore({
    reducer:{home:homeReducer}
})