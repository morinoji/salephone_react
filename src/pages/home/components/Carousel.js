import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './css/carousel.css'
import { APIURL } from '../../../constants/Api';
import { Carousel, Icon } from 'antd';
import { BANNERIMG } from '../../../constants/ImageConstant';



const CarouselComp = props => {
    const [sliders, setSliders] = useState([]);
    const carouselRef=useRef();
    useEffect(()=>{
        getSliders()
    },[])
    function next(){
        carouselRef.current.next();
    }
    function previous(){
        carouselRef.current.previous();
    }
    async function getSliders(){
        await axios.get(APIURL+"getNewestBanners").then((result) => {
            setSliders(result.data.data)
        }).catch((err) => {
            console.log(err)
        });
    }


    return (
        <div className='carousel-container'>
            
            <Carousel className='carousel'  autoplay infinite adaptiveHeight draggable arrows pauseOnHover touchMove>
                {
                    sliders.map((element)=>{
                        return <div  key={element.slider_id}>
                            <img className='carousel-item' src={BANNERIMG+ element.slider_image}/>
                        </div>
                    })
                }
            </Carousel>
            
        </div>
    );
};


export default CarouselComp;