import { Card } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { APIURL } from '../../../constants/Api';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { PRODUCTIMG } from '../../../constants/ImageConstant';

import './css/prod_list.css'
import { v4 } from 'uuid';

const ProdList = props => {
    const [hotProduct, setHotProduct] = useState([]);
    const navigate=useNavigate();
    function navigation(slug){
        navigate({
            pathname: "product",
            search: createSearchParams({
                prd: slug
            }).toString()
        })
    }

    async function getProduct(field){
         await axios.get(APIURL+"listingProduct",{
            params:{
                field:field
            }
        }).then((result) => {
            setHotProduct(result.data.data);
        }).catch((err) => {
            console.log(err);
        });
    }
    useEffect(()=>{
    getProduct(props.field);
    },[])

    return (
        <div className='prodSection' style={{background:props.backgroundColor, width:props.width, margin:props.margin, borderRadius:props.radius}}>
            <div className='titleSection' style={{color:props.titleColor}}>{props.title}</div>
            <div className='prodList'>
                
                    {
                        hotProduct.map((element)=>{
                    return <Card hoverable 
                    key={v4()}
                    className="cardStyle"
                    onClick={()=>navigation(element.slug)}
                    // onClick={()=>dispatch(storeSlug(element.slug))}
                    cover={<div className='coverStyle'><img className='imageStyle' src={PRODUCTIMG+ element.thumbnail} alt="error"/></div>}
                >
                    <div className='title'>{element.title}</div>
                    <div className='price'>{element.price.toLocaleString()+"VNĐ"}</div>
                </Card>
                    
                        })
                    }

            </div>
        </div>
    );
};


export default ProdList;