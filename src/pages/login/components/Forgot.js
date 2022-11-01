import { Button } from 'antd';
import React from 'react';
import Input from './sub_components/Input';

const Forgot = props => {
    return (
        <div className="px-10 my-4 py-3 bg-white">
    <div className="font-thin text-3xl flex justify-center">RESET PASSWORD</div>
    <div className="flex justify-center">
      <div className="block mt-6">
        <Input title="Reset Password"/>
        <div className="font-thin text-base flex justify-end mt-3">
          A mail will be sent to your email address
        </div>
        <div className="flex justify-center mt-8">
          <div>
            <Button >&nbsp;&nbsp; RESET PASSWORD &nbsp;&nbsp; </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
    );
};


export default Forgot;