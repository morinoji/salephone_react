import { Badge } from 'antd';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { APIURL } from '../constants/Api';
import { AVATAR } from '../constants/ImageConstant';
import { add2cart, getBadge } from '../pages/cart/reducers/CartReducer';

import './css/header.css'


const Header = props => {

    const [category, setCategory] = useState([]);
    const [cateDisplay, setCateDisplay] = useState(true);
    const [avatar, setAvatar] = useState("/icons/user.svg");
    const badge=useSelector(state=>state.cart.cartCount)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    let link=useRef("/sign-in");

    useEffect(()=>{
      dispatch(getBadge());
      if (new Date().getTime() < localStorage.getItem("expiredDate")) {
        if (localStorage.getItem("avatar") != "null") {
          setAvatar(AVATAR + localStorage.getItem("avatar"));
        } else {
          setAvatar("/icons/user.svg")
        }
    
        link.current = "/profile";
      }
      axios.get(APIURL+"findAllCategories").then((result) => {
        setCategory(result.data.data)
      }).catch((err) => {
        
      });
    },[])
    
    return (
        <div className="h-24 w-screen m-0 p-0 flex shadow justify-between bg-white header-container">
        <div className="h-full w-10/12 sm:w-10/12 md:w-4/12 lg:w-2/12">
          <img
            src="/icons/SALEPHONE1.png"
            alt=""
            className="h-20  z-50 m-auto"
            
          />
        </div>
        <div className="burger-container flex justify-center items-center">
          <img
            src="/icons/hamburger.svg"
            alt=""
            className="burger-menu"
          />
          <div
            v-show="dislayBurger"
            className="absolute min-w-full right-0 shadow top-full p-3 z-10 bg-white"
          >
            <div className="flex">
              <input
                type="text"
                className="border-b-1 border-black p-2 outline-none"
                placeholder="Search..."
              />
              <button type="button" className="rounded shadow p-2 w-20 ml-2">Tìm kiếm</button>
            </div>
            {/* <Link to="/"
              className="block mt-2 text-black text-xl font-thin hover: cursor-pointer"
             
              >Tài khoản</Link>
            <Link to="/"
              className="block mt-2 text-black text-xl font-thin hover: cursor-pointer"
             
              >Giỏ hàng</Link> */}
          </div>
        </div>
        <div className="flex justify-between flex-1 navBarUtil">
          <div
           onMouseEnter={()=>setCateDisplay(false)} onMouseLeave={()=>setCateDisplay(true)}
            className="h-full flex justify-center items-center"
          >
            <span className="text-black text-xl font-thin hover: cursor-pointer" >Danh mục</span>
            <div
              
                hidden={cateDisplay}
                className="absolute hideCate bg-white shadow p-6 z-10"
              >
               {
              category.map((element)=>{
                return  <Link key={v4() } to="">
                <div >
                <span className='text-black font-thin text-base '> {
               element.categoryName
              }</span>
                </div>
              </Link>
              })
            }
              </div>
           
          </div>
    
          <div className="flex justify-center items-center">
            <div>
              <input
                type="text"
                className="border-b-1 border-black p-2 outline-none"
                placeholder="Search..."
              />
            </div>

           
           <img
            className="user"
            onClick={()=>navigate(link.current)}
             src={avatar}
              alt="user"
            />
           

            <Badge count={badge}><img src="/icons/cart.svg" onClick={()=>navigate("/cart")} alt="user" className="cart" /></Badge> 
          </div>
        </div>
      </div>
    );
};



export default Header;