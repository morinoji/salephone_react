import { Button, Divider, Rate } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { storeStar } from '../reducers/DetailReducers';
import CommentList from './CommentList';
import './css/edit_cmt.css'

const EditComment = props => {
    // const rate=useRef();
    const dispatch=useDispatch();
    return (
        <div className='editcmt-section'>
            <div className='editcmt-rating'>
                <Rate className='editcmt-rating-star' onChange={(rate)=>dispatch(storeStar(rate))} defaultValue={5}/>
            </div>
            <div className='editcmt-editor'>
                Đánh Giá: 
                <TextArea className='editcmt-editor-textarea' rows={5}/>
            </div>
            <div className='edicmt-btn-wrapper'>
                <Button className='editcmt-btn'>Đăng bình luận</Button>
            </div>
            <Divider/>
            <CommentList/>
        </div>
    );
};


export default EditComment;