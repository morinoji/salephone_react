import Header from "../../components/header";
import Footer from "../../components/footer";
import axios from "axios";
import { useDispatch } from "react-redux";
import { storeProfile } from "../profile/reducers/ProfileReducer";
import { APIURL } from "../../constants/Api";
import { useEffect } from "react";
import { storeOrder } from "../profile/reducers/ProfileReducer";
import NewInformation from "./component/newInformation";
const NewProfile=props=>{
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch=useDispatch()
    async function fetchData(){
        await axios.get(APIURL+"get-profile",{
            params:{
                id:localStorage.getItem("id")
            }
        }).then((result) => {
            dispatch(storeProfile(result.data.data))
        }).catch((err) => {
            
            console.log(err)
        });

        await axios.get(APIURL+"getOrdersById",{
            params:{
                status:"Đang giao",
                id:localStorage.getItem("id")
            }
        }).then((result) => {
            dispatch(storeOrder(result.data.data))
        }).catch((err) => {
            console.log(err)
        });
    }


    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
        fetchData()
    },[])  
    return(
        <div>
            <Header></Header>
            <NewInformation></NewInformation>
            <Footer></Footer>
        </div>
    )
}
export default NewProfile;