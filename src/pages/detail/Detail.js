import React, { useEffect, useState } from 'react';
import {  useSearchParams } from 'react-router-dom';
import ImageGallery from './components/ImageGallery';
import axios from 'axios';
import { APIURL } from '../../constants/Api';
import GeneralIn4 from './components/GeneralIn4';
import './components/css/detail.css'
import Article from './components/Article';
import Spec from './components/Spec';
import { useDispatch, useSelector } from 'react-redux';
import { storecolors, storeComment, storeDetail, storeImageList, storeInnerDetail, storePresents } from './reducers/DetailReducers';
import Rating from './components/Rating';
import EditComment from './components/EditComment';
import Header from '../../components/header';
import Footer from '../../components/footer';


const Detail = props => {
    const dispatch=useDispatch();
    const detail=useSelector(state=>state.detail.detail)
    const [searchParams] = useSearchParams();
    let product_id;
    async function fetchData(){
        await axios.get(APIURL+"detail", {params:{
            prd:searchParams.get("prd")
        }}).then((result) => {
           dispatch(storeImageList(result.data.data.imageList));
           dispatch(storecolors(result.data.data.colorList))
           dispatch(storeDetail(result.data.data))
           dispatch(storePresents(result.data.data.presentList))
           dispatch(storeInnerDetail(result.data.data.detail))
           product_id=result.data.data.product_id
        }).catch((err) => {
           
        });
        
        await axios.get(APIURL+"getCmtByProd",{
            params:{
                product_id:product_id,
                limit:10,
                offset:0

            }
        }).then((result) => {
            dispatch(storeComment(result.data.data))
        }).catch((err) => {
            
            dispatch(storeComment([]))
        });
      
    }
    useEffect(()=>{
        window.scrollTo(0, 0);
        fetchData();
    },[])
    return (
       <div>
        <Header/>
         <div className="detail-page">
           
           <div className="detail-page-frontline">
           <ImageGallery/>
           <GeneralIn4/>
           </div>
           <div className='detail-page-midline'>
           <Article/>
           <Spec/>
           </div>
           <div className='detail-page-backline'>
           <Rating/>
           <EditComment/>
           
           </div>
          
       </div>
       <Footer/>
       </div>
    );
};


export default Detail;