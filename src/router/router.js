import React from 'react';
import { BrowserRouter,Route, Routes, } from 'react-router-dom';
import Signin_view from '../pages/login/Signin_view';
import Signup_view from '../pages/login/Signup_view';
import Reset_password_view from '../pages/login/Reset_password_view';
import Home from '../pages/home/Home'
import Detail from '../pages/detail/Detail';
import Cart from '../pages/cart/Cart';
import Search from '../pages/search/Search';
import Profile from '../pages/profile/Profile';
import NewProfile from '../pages/newProfile/newProfile';

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
    <Route path="/search" element={<Search/>}></Route>
    <Route path="/search/product" element={<Detail/>}></Route>
    <Route path="/category" element={<Search/>}></Route>
    <Route path="/category/product" element={<Detail/>}></Route>
    <Route path="/profile" element={<NewProfile/>}></Route>
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