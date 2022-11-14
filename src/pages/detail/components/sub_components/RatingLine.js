import { Rate } from 'antd';
import React from 'react';
import './css/rating_line.css'

const RatingLine = props => {
    return (
        <div className='rating-line'>
            <Rate className='rating-line-star' disabled defaultValue={props.star}/>
            {props.starNumber}
        </div>
    );
};


export default RatingLine;