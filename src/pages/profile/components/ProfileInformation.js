import { UploadOutlined, WindowsFilled } from '@ant-design/icons';
import { Button, Input, Modal, Upload } from 'antd';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { APIURL } from '../../../constants/Api';
import { ERROR, SUCCESS } from '../../../constants/functionContant';
import { AVATAR } from '../../../constants/ImageConstant';
import { storeProfile } from '../reducers/ProfileReducer';
import './css/profile_in4.css'
import In4Line from './sub_components/In4Line';

const ProfileInformation = props => {
    const profile=useSelector(state=>state.profile.detail)
    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalPasswordOpen, setModalPasswordOpen] = useState(false);
    const [isModalAvatarOpen, setModalAvatarOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [image, setImage] = useState(null);
    const navigate=useNavigate()
    const dispatch=useDispatch()
    let fullname=profile.user_fullname;
    let phone=profile.user_phone_number;
    let address=profile.user_address;
    let dob=profile.user_date_of_birth;
    let oldPassword="";
    let newPassword="";
    let confirmPassword="";

    function logout(){
        window.localStorage.removeItem("avatar")
        window.localStorage.removeItem("id")
        dispatch(storeProfile(""))
        navigate("/")
    }

    async function getNewProfile(){
        await axios.get(APIURL+"get-profile",{
            params:{
                id:window.localStorage.getItem("id")
            }
        }).then((result) => {
            dispatch(storeProfile(result.data.data))
        }).catch((err) => {
            ERROR("Đã xảy ra lỗi!")
        });
    }

    async function handleChangePassword(){
        if(confirmPassword!=newPassword){
            ERROR("Mật khẩu phải giống nhau!")
        }else{
            await axios.put(APIURL+"changePassword",{
                "id":window.localStorage.getItem("id"),
                "old_password":oldPassword,
                "new_password":newPassword
            }).then((result) => {
                SUCCESS(result.data.message)
                handlePasswordCancel()
            }).catch((err) => {

                ERROR(err.response.data.message)
            });
        }
        
    }

    function handleDate(date ){
        dob=date.target.value
    }

    function handleFullName(e){
        fullname=e.target.value;
    }

    function handlePhone(e){
        phone=e.target.value;
    }

    function handleOldPassword(e){
        oldPassword=e.target.value;
    }

    function handleNewPassword(e){
        newPassword=e.target.value;
    }

    function handleConfirmPassword(e){
        confirmPassword=e.target.value;
    }

    function handleAddress(e){
        address=e.target.value;
    }

    function showModal(){
        setModalOpen(true)
    }

    function showModalPassword(){
        setModalPasswordOpen(true);
    }

    function handlePasswordCancel(){
        setModalPasswordOpen(false)
    }

    function showModalAvatar(){
        setModalAvatarOpen(true);
    }

    function handleAvatarCancel(){
        setModalAvatarOpen(false)
    }

    async function handleUpdateOk(){
      
        await axios.put(APIURL+"updateCustomer",{
            "user_id":window.localStorage.getItem("id"),
            "user_fullname":fullname,
            "user_phone_number":phone,
            "user_date_of_birth":dob.split(" ")[0],
            "user_address":address
        }).then((result) => {
            SUCCESS(result.data.message);
            getNewProfile()
            handleCancel();
        }).catch((err) => {
            ERROR("Đã xảy ra lỗi!")
        });
    }
    function handleCancel(){
        setModalOpen(false)
    }

     function handlePreview(info){
        setImage(info.target.files[0])
        setPreviewImage(URL.createObjectURL( info.target.files[0]))
        
    }

    async function handleUpload(){
        let data=new FormData();
        data.delete("avatar")
        data.delete("old_avatar")
        data.delete("id")

        data.append("avatar",image)
        data.append("id", window.localStorage.getItem("id"))
        data.append("old_avatar", window.localStorage.getItem("avatar"))
        await axios.put(APIURL+"update-avatar",data).then((result) => {
            SUCCESS(result.data.message)
            window.localStorage.removeItem("avatar")
            window.localStorage.setItem("avatar", result.data.data)
            getNewProfile()
        }).catch((err) => {
            console.log(err)
        });
    }

    useEffect(()=>{
        setPreviewImage(AVATAR+ window.localStorage.getItem("avatar"))
    },[])

    return (
        <div className='profile-in4-section'>
            <div className='profile-in4-title'>Thông Tin Tài Khoản</div>
            <div className='profile-in4-content-wrapper'>
                    <div>
                        <img className='profile-in4-avatar' src={AVATAR+ profile.user_avatar} onClick={showModalAvatar} alt="error"/>
                        <div className='profile-btn'>
                            <Button className='dumb-btn' >Đổi mật khẩu</Button>
                        </div>
                    </div>
                    <div className='profile-in4-information'>
                        <In4Line label="Tên đầy đủ" constValue={profile.user_fullname} unCopiable={true}/>
                        <In4Line label="Số điện thoại" constValue={profile.user_phone_number} unCopiable={true}/>
                        <In4Line label="Địa chỉ" constValue={profile.user_address} unCopiable={true}/>
                        <In4Line label="Ngày sinh" constValue={profile.user_date_of_birth}  unCopiable={true} isDate={true}/>
                        <div className='profile-btn'>
                            <Button onClick={showModal}>Cập nhật thông tin</Button>
                            <Button className='change-password' onClick={showModalPassword}>Đổi mật khẩu</Button>
                            <Button onClick={logout} danger>Đăng xuất</Button>
                        </div>
                        {/* ---------------------------------Modal-------------------------------- */}
                        <Modal title="Cập nhật thông tin" open={isModalOpen} onOk={handleUpdateOk} onCancel={handleCancel}>
                        <In4Line label="Tên đầy đủ" initValue={profile.user_fullname} unCopiable={false} handleChange={handleFullName}/>
                        <In4Line label="Số điện thoại" initValue={profile.user_phone_number} unCopiable={false} handleChange={handlePhone}/>
                        <In4Line label="Địa chỉ" initValue={profile.user_address} unCopiable={false} handleChange={handleAddress}/>
                        <div className='information-line'>
            <span className='information-line-label'>Ngày sinh: </span>
            <input type="date" className='datePicker' onChange={handleDate} defaultValue={profile.user_date_of_birth!=null? profile.user_date_of_birth.split(" ")[0]:null}  format={'DD/MM/YYYY'}/>
         </div>
                        </Modal>

                        <Modal title="Thay đổi mật khẩu" open={isModalPasswordOpen} onOk={handleChangePassword} onCancel={handlePasswordCancel}>
                            <In4Line label="Mật khẩu cũ" password={true} unCopiable={false} handleChange={handleOldPassword}/>
                            <In4Line label="Mật khẩu mới" password={true} unCopiable={false} handleChange={handleNewPassword}/>
                            <In4Line label="Xác nhận mật khẩu mới" password={true} unCopiable={false} handleChange={handleConfirmPassword}/>
                        </Modal>

                        <Modal title="Thay đổi ảnh đại diện" open={isModalAvatarOpen} onOk={handleUpload} onCancel={handleAvatarCancel}>
                            <img className='preview-avatar' src={previewImage} alt="error"/>
                            <input type="file" className='datePicker' onChange={handlePreview} />
                            
                        </Modal>
                        {/* ---------------------------------------------------------------------- */}
                    </div>
                    
            </div>
            
        </div>
    );
};


export default ProfileInformation;