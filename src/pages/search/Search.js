import { Card } from 'antd';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import Footer from '../../components/footer';
import Header from '../../components/header';
import { APIURL } from '../../constants/Api';
import { PRODUCTIMG } from '../../constants/ImageConstant';
import '../home/components/css/prod_grid.css'
import { storeItems, storeItemsSearch } from './reducers/SearchReducer';

const Search = props => {
    const [path, setPath] = useState("");
    const cateId=useSelector(state=>state.search.category_id)
    const cateName=useSelector(state=>state.search.category_name)
    const items=useSelector(state=>state.search.items)
    const searchText=useSelector(state=>state.search.searchText)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    function navigation(slug){
        navigate({

            pathname: "product",
            search: createSearchParams({
                prd: slug
            }).toString()
        })
        // window.location.href=window.location.origin+"/product?prd="+slug
        // console.log(window.location.origin)
    }


    return (
        <div >
            <Header/>
            <div className='grid-section'>
             <div className='grid-title' style={{color:props.titleColor}}>{window.location.pathname=="/search"? "":"Danh mục:  "+ cateName}</div>
             <div className='grid-core'>
                {
                    items.map((element)=>{
                       return <Card hoverable 
                       key={v4()}
                       className="cardStyle"
                       onClick={()=>navigation(element.slug)}
                       cover={<div className='coverStyle'><img className='imageStyle' src={PRODUCTIMG+ element.thumbnail} alt="error"/></div>}
                   >
                       <div className='title'>{element.title}</div>
                       <div className='price'>{element.price.toLocaleString()+"VNĐ"}</div>
                   </Card>
                    })
                }
             </div>
        </div>
            <Footer/>
        </div>
    );
};


export default Search;