import React from 'react';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Carousel from './components/Carousel';
import ProdList from './components/ProdList';
import ProductGrid from './components/ProductGrid';

const home = props => {
    
    return (
        <div className='body'>
            <Header/>
            <Carousel/>
            <ProdList title="SẢN PHẨM HOT" field="rated" width="80%" margin="24px auto" radius="15px" />
            <ProdList title="SẢN PHẨM MỚI" field="created_at" backgroundColor="#fcb69f" />
            <ProductGrid title="GỢI Ý"/>
            <Footer/>
        </div>
    );
};



export default home;