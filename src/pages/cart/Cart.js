import { Button, Divider, Input, Spin, Modal} from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCTIMG } from '../../constants/ImageConstant';
import { deleteAllCart, getCart, removeCart, updateCart } from './reducers/CartReducer';
import './css/cart.css'
import { v4 } from 'uuid';
import TextArea from 'antd/lib/input/TextArea';
import Header from '../../components/header'
import Footer from '../../components/footer'
import axios from 'axios';
import { APIURL } from '../../constants/Api';
import { LoadingOutlined } from '@ant-design/icons';

const Cart = props => {
    const antIcon = (
        <LoadingOutlined
          style={{
            fontSize: 24,
          }}
          spin
        />
      );
      const success = () => {
        Modal.success({
          title: 'Đặt hàng thành công!',
        });
      };
      const error = () => {
        Modal.error({
          title: 'Đặt hàng thất bại!',
          
        });
      };
    const cart= useSelector(state=>state.cart.cartItems);
    const dispatch=useDispatch();
    let itemCount=0;
    let total=0;
    let items=[];
    function calMoney(e){
        if(items.length==0){
            cart.map((element)=>items.push({"product_id":element.id, "quantity":element.quantity}));
        }
        let quantity=e.currentTarget.value;
        let sum=0;
        let totalSum=0;
        let finalSum=0;
        let price=e.currentTarget.parentNode.parentNode.querySelector(".checkout-product-line-price").innerHTML;
        let total= document.getElementById("total");
        let allTotal=document.getElementById("allTotal");
        let index=e.currentTarget.id;
        
       
       
        price=price.replaceAll(".","").replaceAll("VND","").trim()
        totalSum=allTotal.innerHTML.replaceAll(".","").replaceAll("VND","").trim()

        sum=price*quantity;

        if(quantity > items[index].quantity){
            finalSum=parseInt(totalSum) + parseInt(price);
            items[index].quantity+=1;
        }else{
            
            if(items[index].quantity>1){
                finalSum=parseInt(totalSum) - parseInt(price);
                items[index].quantity-=1;
            }
           
        }

        e.currentTarget.parentNode.parentNode.querySelector(".checkout-product-line-sum").innerHTML=sum.toLocaleString()+" VND"
        total.innerHTML=finalSum.toLocaleString()+" VND";
        allTotal.innerHTML=finalSum.toLocaleString()+" VND";
        dispatch(updateCart({"index":index, "quantity":quantity}));
    }

    async function postOrder(){
        if(items.length==0){
            cart.map((element)=>items.push({"product_id":element.id, "quantity":element.quantity}));
        }
        let address= document.getElementById("address").value;
        let note= document.getElementById("note").value;
        let spin= document.getElementById("spin");
        spin.hidden=false;
        await axios.post(APIURL+"placeOrder", {
            "user_id":localStorage.getItem("id"),
            "address":address,
            "Status":"Đang giao",
            "note":note,
            "detailList":items
        }).then((result) => {
            console.log(result)
            spin.hidden=true;
            success();
            dispatch(deleteAllCart())
        }).catch((err) => {
            console.log(err)
            spin.hidden=true;
            error()
            
        });
    }
    useEffect(()=>{
       dispatch(getCart());
    },[])

    return (
       <div>
        <Header/>
         <div className='checkout'>
            <div className='checkout-products'>
                <div className='checkout-products-header'>
                    GIỎ HÀNG
                </div>
                <Divider/>
                <div className='checkout-products-tableHead'>
                    <div style={{width:"40%", }}>Sản Phẩm</div>
                    <div style={{width:"20%", textAlign:"center"}}>Số Lượng</div>
                    <div style={{width:"20%", textAlign:"center"}}>Giá</div>
                    <div style={{width:"20%", textAlign:"center"}}>Tổng</div>
                </div>
                
                    {
                        cart==null? null:cart.map((element,index)=>{
                            itemCount+=1
                            total+=element.price * element.quantity;
                            return <div key={v4()} className='checkout-products-line'>
                                <div className='checkout-products-line-product'>
                                    <img className='checkout-image' src={PRODUCTIMG+ element.thumbnail} alt="error"/>
                                    <div className='checkout-products-line-info'>
                                        <div className='checkout-product-title'>
                                            {element.title}
                                        </div>
                                        <div className='checkout-product-brand'>
                                           {element.brand}
                                        </div>
                                        <div className='checkout-product-remove' onClick={()=>dispatch(removeCart(element.id))}>
                                            Remove
                                        </div>
                                    </div>
                           
                                </div>
                                <div className='checkout-product-line-quantity'>
                                    <input id={index} className='inputNumber' onKeyDown={()=>false} type="number" max={999} min={1} defaultValue={element.quantity} onChange={calMoney} />
                                </div>
                                <div className='checkout-product-line-price'>
                                    {element.price.toLocaleString()+ " VND"}
                                </div>
                                <div className='checkout-product-line-sum'>
                                    {(element.price * element.quantity).toLocaleString()+" VND"}
                                </div>
                            </div>
                        })
                    }
                    <Divider/>
            </div>
            <div className='checkout-summary'>
                <div className='checkout-summary-header'>
                    SUMMARY
                </div>
                <Divider/>
                <div className='checkout-summary-total'>
                    <div>
                        Sản Phẩm x{itemCount}
                    </div>
                    <div id='total'>
                        {total.toLocaleString()+" VND"}
                    </div>
                </div>
                <div className='checkout-summary-address'>
                    <div>
                        Địa Chỉ
                    </div>
                    <Input id='address' className='checkout-summary-address-input'/>
                </div>
                <div className='checkout-summary-address'>
                    <div>
                        Ghi Chú
                    </div>
                    <TextArea id='note' className='checkout-summary-address-input'/>
                </div>
                <Divider/>
                <div className='checkout-summary-allTotal'>
                    <div>
                        Tổng Toàn Bộ
                    </div>
                    <div id='allTotal'>
                        {total.toLocaleString()+" VND"}
                    </div>
                </div>
                <div className='checkout-btn-wrapper'>
                <Spin hidden id="spin" indicator={antIcon} style={{marginRight:"10px"}}/>
                <Button hidden={localStorage.getItem("id")!=null? false:true} onClick={postOrder} className='checkout-btn' type='primary'>Check Out</Button>
                </div>
            </div>
        </div>
        <Footer/>
       </div>
    );
};


export default Cart;