import React from 'react';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Forgot from './components/Forgot';


const Reset_password_view = props => {
    return (
        <div className='body'>
            <Header/>
            <Forgot/>
            <Footer/>
        </div>
    );
};



export default Reset_password_view;