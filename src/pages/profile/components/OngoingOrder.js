import { Divider } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { PRODUCTIMG } from '../../../constants/ImageConstant';
import './css/ongoing_order.css'

const OngoingOrder = props => {
    const orders=useSelector(state=>state.profile.orders)
    let total=0;

    return (
        <div className='checkout-products' style={{width:"100%"}}>
                <div className='checkout-products-header'>
                    ĐƠN HÀNG ĐANG GIAO
                </div>
                <Divider/>
                <div className='checkout-products-tableHead' style={{marginBottom:"15px"}}>
                    <div style={{width:"40%", }}>Sản Phẩm</div>
                    <div style={{width:"20%", textAlign:"center"}}>Số Lượng</div>
                    <div style={{width:"20%", textAlign:"center"}}>Giá</div>
                    <div style={{width:"20%", textAlign:"center"}}>Tổng</div>
                </div>
                
                    {
                        
                         orders==null? null:orders.map((element,index)=>{
                            total=0;
                            return <div key={v4()}>
                                {
                                    element.listProd.map((prodElement)=>{
                                        total+=prodElement.price * prodElement.quantity;
                                        return <div key={v4()} className='checkout-products-line'>
                                        <div className='checkout-products-line-product'>
                                            <img className='checkout-image' src={PRODUCTIMG+ prodElement.thumbnail} alt="error"/>
                                            <div className='checkout-products-line-info'>
                                                <div className='checkout-product-title'>
                                                    {prodElement.title}
                                                </div>
                                                <div className='checkout-product-brand'>
                                                   {prodElement.brand}
                                                </div>
                                                <div className='checkout-product-remove'>
                                                    Remove
                                                </div>
                                            </div>
                                   
                                        </div>
                                        <div className='checkout-product-line-quantity'>
                                            <input readOnly id={index} className='inputNumber' onKeyDown={()=>false} type="number" max={999} min={1} defaultValue={prodElement.quantity}  />
                                        </div>
                                        <div className='checkout-product-line-price'>
                                            {prodElement.price.toLocaleString()+ " VND"}
                                        </div>
                                        <div className='checkout-product-line-sum'>
                                            {(prodElement.price * prodElement.quantity).toLocaleString()+" VND"}
                                        </div>
                                    </div>
                                    })
                                }
                                <div className='orders-in4'>
                                    <div >
                                        Mã số đơn hàng: <span >{element.order_id}</span>
                                    </div>
                                    <div >
                                        Địa chỉ: <span >{element.address}</span>
                                    </div>
                                    <div >
                                        Trạng thái: <span style={{color:"green", fontWeight:"400"}}>Đang giao </span>
                                    </div>
                                    <div>
                                        Tổng giá trị đơn hàng: {total.toLocaleString()+" VND"}
                                    </div>
                                </div>
                                <Divider/>
                                
                            </div>
                        })
                    }
                    
            </div>
    );
};



export default OngoingOrder;