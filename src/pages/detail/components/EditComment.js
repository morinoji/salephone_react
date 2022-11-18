import { Button, Divider, Rate, Modal } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import axios from 'axios';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { APIURL } from '../../../constants/Api';
import { storeStar } from '../reducers/DetailReducers';
import CommentList from './CommentList';
import './css/edit_cmt.css'

const EditComment = props => {
    // const rate=useRef();
    const dispatch=useDispatch();
    const detail=useSelector(state=>state.detail.detail)
    const navigate=useNavigate();
    const success = () => {
        Modal.success({
          title: 'Đăng bình luận thành công!',
        });
      };
      const error = () => {
        Modal.error({
          title: 'Đăng bình luận thất bại!',
          
        });
      };
    let star=0.0;

    async function postComment(){
        let cmt_content=document.getElementById("content").value;
        console.log(star)
        await axios.post(APIURL+"postComment",{
            "comment_content":cmt_content,
            "stars":star,
            "product_id":detail.product_id,
            "user_id":localStorage.getItem("id")
        }).then((result) => {
            success()
            window.location.reload();
        }).catch((err) => {
            error()
        });
    }
    return (
        <div className='editcmt-section'>
            <div className='editcmt-rating'>
            Bạn cảm thấy sản phẩm này như thế nào? (chọn sao nhé) <Rate className='editcmt-rating-star'   onChange={(rate)=>star=rate} defaultValue={5}/>
            </div>
            <div className='editcmt-editor'>
                Đánh Giá: 
                <TextArea id='content' className='editcmt-editor-textarea' rows={5}/>
            </div>
            <div className='edicmt-btn-wrapper'>
                <Button hidden={localStorage.getItem("id")!=null? false:true} onClick={postComment} className='editcmt-btn'>Đăng bình luận</Button>
            </div>
            <Divider/>
            <CommentList/>
        </div>
    );
};


export default EditComment;