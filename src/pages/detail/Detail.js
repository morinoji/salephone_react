import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';


const Detail = props => {
    const [searchParams, setSearchParams] = useSearchParams();
    let params=useParams();
    useEffect(()=>{
        console.log(params.slug)
    })
    return (
        <div>
            
        </div>
    );
};


export default Detail;