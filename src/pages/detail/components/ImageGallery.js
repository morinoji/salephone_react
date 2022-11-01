import axios from 'axios';
import React, { useEffect, useState } from 'react'; 
import { APIURL } from '../../../constants/Api';

const ImageGallery = props => {
    const [images, setImages] = useState([]);

    // async function fetchData(){
    //     await axios.get(APIURL+"detail"+)
    // }

    useEffect(()=>{
        
    },[])

    return (
        <div className='gallery-section'>
            <div className='gallery-main'>
                <img id='mainImage'/>
            </div>
            <div className='gallery-navigate'>

            </div>
        </div>
    );
};



export default ImageGallery;