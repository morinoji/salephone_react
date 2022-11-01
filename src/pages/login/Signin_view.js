import React from 'react';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Login from './components/Login';

const Signin_view = props => {
    return (
        <div className='body'>
            <Header/>
            <Login/>
            <Footer/>
        </div>
    );
};



export default Signin_view;