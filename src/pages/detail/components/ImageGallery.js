import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Carousel} from 'antd';
import axios from 'axios';
import React, { createRef, useEffect, useState } from 'react'; 
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { APIURL } from '../../../constants/Api';
import { PRODUCTIMGDETAIL } from '../../../constants/ImageConstant';
import './css/gallery.css'

const ImageGallery = props => {
    const images=useSelector(state=>state.detail.imageList)
    const carousel=createRef();
    let justPassed=0;
    let isExpand=false;

    function asyncImageCarousel(index){
        let Sindex=index.toString();
        document.getElementById(Sindex).style.border="1px solid red"
        if(justPassed!=index){
            document.getElementById(justPassed).style.border="1px solid #e0e0e0"
        }

        justPassed=index;
    }

    function asyncImageNavigate(e){
        let id=e.target.id;
        if(id==""){
            id = e.target.parentElement.parentElement.id;
        }
        carousel.current.goTo(id);
    }

    function expandNavigate(e){
        let galleryNavi=document.getElementById("galleryNavigate")
        let expandBtn=document.getElementById("expand")
        let collapseB=document.getElementById("collapse")
        if(isExpand){
            galleryNavi.style.maxHeight="65px"
            galleryNavi.style.transition="max-height 200ms ease-in"
            expandBtn.hidden=false;
            collapseB.hidden=true;
        }else{
            galleryNavi.style.maxHeight=galleryNavi.scrollHeight+"px"
            galleryNavi.style.transition="max-height 200ms ease-in"
            expandBtn.hidden=true;
            collapseB.hidden=false;
        }
        isExpand=!isExpand;
    }


    return (
        <div className='gallery-section'>
            <div className='gallery-main'>
                <Carousel ref={carousel} touchMove infinite adaptiveHeight draggable className='gallery-mainImage' afterChange={(index)=>asyncImageCarousel(index)}>
                {
                    images.map((element)=>{
                        return <img key={v4()} className='gallery-mainImage' src={PRODUCTIMGDETAIL+element} alt="err"/>
                    })
                }
                </Carousel>
            </div>
            <div className='gallery-navigate-section'>
            <div className='gallery-navigate' id="galleryNavigate" >
                {
                    images.map((element,index)=>{
                        return <div key={v4()} id={index} className='gallery-navigate-item' >
                            <div className='inner'>
                            <img className='gallery-navigate-image' src={PRODUCTIMGDETAIL+element} alt="err" onClick={asyncImageNavigate}/>
                            </div>
                        </div>
                    })
                }
                
                
            </div>
            <Button id="expand" className='genInfo-colors-item' onClick={expandNavigate}><DownOutlined /> Mở Rộng <DownOutlined /></Button>
            <Button id="collapse" hidden className='genInfo-colors-item' onClick={expandNavigate}><UpOutlined /> Thu Gọn <UpOutlined /></Button>
            </div>
            
        </div>
    );
};



export default ImageGallery;