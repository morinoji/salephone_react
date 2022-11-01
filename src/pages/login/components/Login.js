import React,{ useState } from 'react';
import 'antd/dist/antd.min.css'
import './css/Signin.css'
import {Button, Divider} from 'antd'
import axios from 'axios'
import { APIURL } from '../../../constants/Api';
import Input from './sub_components/Input';
import { Link, useNavigate } from 'react-router-dom';


const Login = props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    let navigate=useNavigate();

    const getEmailValue=(value)=>{
        const tempEmail=value;
        setEmail(tempEmail);
        let checkEmail=String(tempEmail)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        if(tempEmail===""){
            setError("")
        }else
        if(checkEmail==null){
            setError("Invalid Email!")
        }else{
            setError("")
        }
    }
    const getPasswordValue=(value)=>{
        const tempPassword=value;
        setPassword(tempPassword);

        if(error !== "Invalid Email!"){
            if(tempPassword.length<6 || tempPassword.length>12){
                setError("Password must be between 6 - 12 words!")
            }else{
                setError("")
            }
        }
    }
    async function login(){
        const params=new URLSearchParams();
        params.delete("email");
        params.delete("password");
        params.append('email', email);
        params.append('password', password);
        await axios.post(APIURL+"login",params).then((result) => {
            console.log(result);
        }).catch((err) => {
            setError(err.response.data.message)
        });
    }

    return (
        <div className="px-10 my-4 py-3 bg-white">
    <div className="font-thin text-3xl flex justify-center">SIGN IN</div>
    <div className="flex justify-center">
      <div className="block mt-6">
       <Input state={email} getValue={getEmailValue} title="Email Address" type="text"/>
       <Input state={password} getValue={getPasswordValue} title="Password &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" type="password"/>
        <div className="font-thin text-base flex justify-end text-red-600 mt-3">
          {error}
        </div>
        {/* <div
          v-for="err in store.error.list"
          className="font-thin text-sm flex justify-end text-red-600 mt-1"
        >
          {{ err }}
        </div> */}
        <Link to="/reset">
        <div
        
        className="font-thin text-base flex justify-end forgot mt-3 text-black"
       
      >
        Forgot password?
      </div>
        </Link>

        <div className="flex justify-center mt-8">
          <div>
            <Button onClick={login} disabled={error.length===0 && email.length!==0 && password.length!==0? false:true}
              >&nbsp;&nbsp; SIGN IN &nbsp;&nbsp;
            </Button>
          </div>
        </div>

        <Divider> <span className="font-thin">OR</span> </Divider>
        <div className="flex justify-center mt-8">
          <Link to="/sign-up">
          <Button
            >&nbsp;&nbsp; SIGN UP &nbsp;&nbsp;
          </Button></Link>
        </div>
      </div>
    </div>
  </div>
    );
};


export default Login;