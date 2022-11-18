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
            {/* <div style={{backgroundColor:"white", height:"400px", width:"100%"}}>
                <div style={{backgroundColor:"blue", height:"200px", width:"200px", marginTop:"-60px",zIndex:"999",borderRadius:"50%", border:"3px solid yellow",boxShadow:" 0 20px 25px -5px rgba(0, 0, 0, 0.5)"}}></div>
               
            </div> */}
            <Footer/>
        </div>
    );
};



export default home;