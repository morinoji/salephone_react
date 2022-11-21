
import { useSelector } from "react-redux";
import { AVATAR } from "../../../constants/ImageConstant";
import "./newInformation.css"
import { useDispatch } from "react-redux";
import { storeProfile } from "../../profile/reducers/ProfileReducer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal, Input } from "antd";
import axios from "axios";
import { APIURL} from "../../../constants/Api";
import { SUCCESS,ERROR } from "../../../constants/functionContant";
import In4Line from "../../profile/components/sub_components/In4Line";
import { useEffect } from "react";
import OngoingOrder from "../../profile/components/OngoingOrder";
const NewInformation=()=>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isModalPasswordOpen, setModalPasswordOpen] = useState(false);
    const [isModalAvatarOpen, setModalAvatarOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [image, setImage] = useState(null);
    const profile=useSelector(state=>state.profile.detail)
    const [isModalOpen, setModalOpen] = useState(false);
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
        localStorage.removeItem("avatar")
        localStorage.removeItem("id")
        dispatch(storeProfile(""))
        navigate("/")
    }

    async function getNewProfile(){
        await axios.get(APIURL+"get-profile",{
            params:{
                id:localStorage.getItem("id")
            }
        }).then((result) => {
            dispatch(storeProfile(result.data.data))
        }).catch((err) => {
            ERROR("Đã xảy ra lỗi!")
        });
    }

    async function handleChangePassword(){
        if(confirmPassword!==newPassword){
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
            localStorage.removeItem("avatar")
            localStorage.setItem("avatar", result.data.data)
            getNewProfile()
        }).catch((err) => {
            console.log(err)
        });
    }

    useEffect(()=>{
        setPreviewImage(AVATAR+ localStorage.getItem("avatar"))
    },[])
    return(
        <div className="newInfor"> 
            <div className="bg-avatar"><img src="https://png.pngtree.com/thumb_back/fh260/back_our/20190620/ourmid/pngtree-electronic-technology-website-texture-background-banner-image_156039.jpg" className="bg-img" alt="as"></img> </div>
            <img className="avatar-img" alt="avatar" src={AVATAR+profile.user_avatar}></img>
            <div className="basic-infor">
                <br></br>
                <h1 className="profile-name">{profile.user_fullname}</h1>
                <p className="ttcb"><strong>Số điện thoại:</strong> {profile.user_phone_number}</p>
                <p className="ttcb"><strong>Địa chỉ: </strong>{profile.user_address}</p>
                <p className="ttcb"><strong>Ngày sinh: </strong>{profile.user_date_of_birth==null? null:profile.user_date_of_birth.split(" ")[0]}</p>
                <div className="button-change">
                    <button type="button" className="btn-change" onClick={showModal} >Update profile</button>
                    <button type="button" className="btn-change" onClick={showModalPassword}>Change password</button>
                    <button type="button" className="btn-change" onClick={logout}>Log Out</button>
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
            <div className="order-status">
            <OngoingOrder/>
            </div>
        </div>
    )
}
export default NewInformation;