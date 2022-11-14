import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { PRODUCTIMG } from '../../../constants/ImageConstant';
import './css/prod_grid.css'
import './css/prod_list.css'
import axios from 'axios';
import { APIURL } from '../../../constants/Api';
import { v4 } from 'uuid';


const ProductGrid = props => {
    const [allProd, setAllProd] = useState([]);

    async function fetchData(limit, offset){
        await axios.get(APIURL+"listing-all-product",{params:{
            limit:limit,
            offset:offset
        }}).then((result) => {
            setAllProd(result.data.data)
        }).catch((err) => {
            console.log(err)
        });
    }
    useEffect(()=>{
        fetchData(20,0)
    },[])


    return (
        <div className='grid-section'>
             <div className='grid-title' style={{color:props.titleColor}}>{props.title}</div>
             <div className='grid-core'>
                {
                    allProd.map((element)=>{
                       return <Card hoverable 
                       key={v4()}
                       className="cardStyle"
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


export default ProductGrid;