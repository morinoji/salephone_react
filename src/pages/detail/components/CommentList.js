import { Divider, Rate } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { AVATAR } from '../../../constants/ImageConstant';
import './css/comment_list.css'

const CommentList = props => {
    const commentList=useSelector(state=>state.detail.comments)
    return (
        <div className='commentList-section'>
            <div className='commentList-comments'>
                {
                    commentList.map((element)=>{
                        return <div key={v4()} className='commentList-commentLine'>
                           <div className='commentList-first'>
                                <div className='commentList-avatar-wrapper'>
                                    <img className='commentList-avatar' src={element.avatar==null? "/icons/placeholder_image.png":AVATAR+element.avatar}  alt="error"/>
                                </div>
                                <div className='commentList-name-wrapper'>
                                    <div className='commentList-commentLine-name'>
                                    {element.fullname==null? "Người Dùng":element.fullname}
                                    </div>
                                    <div>
                                        <Rate className='commentList-commentLine-star' defaultValue={element.stars} disabled/>
                                    </div>
                                </div>
                           </div>
                            <div className='commentList-commentLine-content'>
                                {element.comment_content}
                               
                            </div>
                            <span className='commentList-time'>{element.comment_createdAt.split(" ")[0]}</span>
                            <Divider/>
                        </div>
                    })
                }
            </div>
        </div>
    );
};


export default CommentList;