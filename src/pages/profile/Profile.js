import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Footer from '../../components/footer';
import Header from '../../components/header';
import { APIURL } from '../../constants/Api';
import OngoingOrder from './components/OngoingOrder';
import ProfileInformation from './components/ProfileInformation';
import { storeOrder, storeProfile } from './reducers/ProfileReducer';

const Profile = props => {
    const dispatch=useDispatch()
    async function fetchData(){
        await axios.get(APIURL+"get-profile",{
            params:{
                id:window.localStorage.getItem("id")
            }
        }).then((result) => {
            dispatch(storeProfile(result.data.data))
        }).catch((err) => {
            
        });

        await axios.get(APIURL+"getOrdersById",{
            params:{
                status:"Đang giao",
                id:localStorage.getItem("id")
            }
        }).then((result) => {
            dispatch(storeOrder(result.data.data))
        }).catch((err) => {
            
        });
    }

    useEffect(()=>{
        fetchData()
    },[])
    return (
        <div>
            <Header/>
            <ProfileInformation/>
            <OngoingOrder/>
            <Footer/>
        </div>
    );
};


export default Profile;