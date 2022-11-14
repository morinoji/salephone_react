import { StarFilled } from '@ant-design/icons';
import { Divider } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import './css/rating.css'
import RatingLine from './sub_components/RatingLine';

const Rating = props => {
    const detail=useSelector(state=>state.detail.detail)
    return (
        <div className='rating-section'>
            <div className='rating-mainRate'>
                    {detail.rating}
                    <StarFilled style={{color:"yellow"}}/>
            </div>
            <Divider type='vertical' style={{height:"150px"}}/>
            <div className='rating-detailRate'>
                <div>
                    <RatingLine starNumber={detail.star5} star={5}/>
                    <RatingLine starNumber={detail.star4} star={4}/>
                    <RatingLine starNumber={detail.star3} star={3}/>
                    <RatingLine starNumber={detail.star2} star={2}/>
                    <RatingLine starNumber={detail.star1} star={1}/>
                </div>
            </div>
        </div>
    );
};


export default Rating;