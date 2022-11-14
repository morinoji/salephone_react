import { Button, Divider } from 'antd';
import { GiftOutlined } from '@ant-design/icons';
import React from 'react';
import { v4 } from 'uuid';
import './css/general_in4.css'
import { useDispatch, useSelector } from 'react-redux';
import { add2cart } from '../../cart/reducers/CartReducer';

const GeneralIn4 = props => {
    const detail=useSelector(state=>state.detail.detail)
    const colors=useSelector(state=>state.detail.colors)
    const presents=useSelector(state=>state.detail.presents)
    const dispatch=useDispatch();
    let justPassed="";
    function clickedButton(e){
        e.currentTarget.style.color="crimson";
        e.currentTarget.style.backgroundColor="white";
        e.currentTarget.style.borderColor="crimson";
        console.log(            document.getElementById(justPassed))
        if(justPassed!="" && justPassed!=e.currentTarget.id){
            
            document.getElementById(justPassed).style.borderColor="#e0e0e0"
            document.getElementById(justPassed).style.color="black"
           
        }
        justPassed=e.currentTarget.id;
        
    }
    return (
        <div className='genInfo-section'>
            <div className='genInfo-title'>
                {detail.title}
            </div> 
            <div className='genInfo-price'>
                {detail.price==null? null :detail.price.toLocaleString()+ " VNĐ"}
            </div>
            <div className='genInfo-colors'>
                {
                    colors.map((element, index)=>{
                        return <Button key={v4()} id={index+"a"} className='genInfo-colors-item' onClick={clickedButton}>{element}</Button>
                    })
                }
            </div>
            <Divider orientation="left">Quà Tặng</Divider>
            <div className='genInfo-presents'>
                {
                    presents.map((element)=>{
                        return <div key={v4()} className='genInfo-presents-item'>
                            <GiftOutlined style={{fontSize:"18px"}}/>
                            <div className='genInfo-presents-item-content'>
                                {element}
                            </div>
                        </div>
                    })
                }
            </div>
            <Divider/>
            <div className='genInfo-buttons'>
            <Button onClick={()=>dispatch(add2cart({"id":detail.product_id, "thumbnail":detail.thumbnail, "quantity":1, "price":detail.price, "title":detail.title, "brand":detail.brand}))} className='genInfo-colors-item '>Thêm vào giỏ hàng</Button>
            <Button className='genInfo-colors-item'><span style={{fontWeight:"semi-bold"}}>Mua ngay</span></Button>
            </div>
            
        </div>
    );
};



export default GeneralIn4;