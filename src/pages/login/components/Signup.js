import React from 'react';
import Input from './sub_components/Input';
import { useState } from 'react';
import { Button } from 'antd';
import { APIURL } from '../../../constants/Api';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Signup = props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [error, setError] = useState("");
    let navigate = useNavigate();

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
            }else if(tempPassword!==confirmPassword){
              setError("Passwords must similar!")
          }
            
            else{
                setError("")
            }
        }
    }
    const getConfirmPasswordValue=(value)=>{
        const tempCPassword=value;
        setconfirmPassword(tempCPassword);

        if(error !== "Invalid Email!"){
          if(error!=="Password must be between 6 - 12 words!"){
            if(tempCPassword!==password){
              setError("Passwords must similar!")
          }else{
              setError("")
          }
          }
            
        }
    }
    async function signUp(){
      await axios.post(APIURL+"register",{user_email:email, user_password:password}).then((result) => {
        navigate("/sign-in");

      }).catch((err) => {
          setError(err.response.data.message)
      });
  }

    return (
        <div className="px-10 my-4 py-3 bg-white">
    <div className="font-thin text-3xl flex justify-center">SIGN UP</div>
    <div className="flex justify-center">
      <div className="block mt-6">
        <Input state={email} getValue={getEmailValue} title="Email Address" type="text"/>
        <Input state={password} getValue={getPasswordValue} title="Password " type="password"/>
        <Input state={confirmPassword} getValue={getConfirmPasswordValue} title="Confirm Password " type="password"/>
        
        <div className="font-thin text-base flex justify-end text-red-600 mt-3">
          { error }
        </div>
        {/* <div className="font-thin text-base flex justify-end text-red-600 mt-3">
          {{ store.checkDup }}
        </div> */}
        <div className="flex justify-center mt-8">
          <div>
            <Button
              disabled={error==="" && password.length!==0 && confirmPassword.length!==0? false:true}
              onClick={signUp}
              >&nbsp;&nbsp; SIGNUP &nbsp;&nbsp;
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
    );
};


export default Signup;