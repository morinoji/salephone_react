import React from 'react';
import { BrowserRouter,Route, Routes, } from 'react-router-dom';
import Signin_view from '../pages/login/Signin_view';
import Signup_view from '../pages/login/Signup_view';
import Reset_password_view from '../pages/login/Reset_password_view';
import Home from '../pages/home/Home'
import Detail from '../pages/detail/Detail';
import Cart from '../pages/cart/Cart';

const Router = props => {
    return (
        <BrowserRouter>
   <Routes>
   <Route path="/" element={<Home/>}></Route>
    <Route path="/sign-in" element={<Signin_view/>}></Route>
    <Route path="/sign-up" element={<Signup_view/>}></Route>
    <Route path="/reset" element={<Reset_password_view/>}></Route>
    <Route path="/product" element={<Detail/>}></Route>
    <Route path="/cart" element={<Cart/>}></Route>
    {/* {
      routes.forEach((element)=> {
        element.forEach(subElement => {
          return <Route key={v4()} path={subElement.path} element={subElement.component} />
        });
        
      })
    } */}
   </Routes>
   </BrowserRouter>
    );
};


export default Router;