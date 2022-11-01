import React from 'react';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Signup from './components/Signup';

const Signup_view = props => {
    return (
        <div className='body'>
            <Header/>
            <Signup/>
            <Footer/>
        </div>
    );
};


export default Signup_view;