import React from 'react';
import './css/footer.css'
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom'

const Footer = props => {
    return (
        <div className='footer-section shadow'>
            <div className='footer-title'>
                SALEPHONE
            </div>
            <div className='footer-grid'>
                <div className='footer-grid-element'>
                    <div className='footer-grid-element-title'>
                    About Us
                    </div>
                    <div className='footer-grid-element-content'>
                        <span className='footer-link'>
                            Aim
                        </span >
                        <span className='footer-link'>
                            Vision
                        </span>
                        <span className='footer-link'>
                            Testimonials
                        </span>
                    </div>
                </div>
                <div className='footer-grid-element'>
                    <div className='footer-grid-element-title'>
                    Services
                    </div>
                    <div className='footer-grid-element-content'>
                        <span className='footer-link'>
                        Writing
                        </span>
                        <span className='footer-link'>
                        Internships 
                        </span>
                        <span className='footer-link'>
                        Coding
                        </span>
                        <span className='footer-link'>
                        Teaching
                        </span>
                    </div>
                </div>
                <div className='footer-grid-element'>
                    <div className='footer-grid-element-title'>
                    Contact Us
                    </div>
                    <div className='footer-grid-element-content'>
                        <span className='footer-link'>
                            Hanoi
                        </span>
                        <span className='footer-link'>
                        Uttar Pradesh
                        </span>
                        <span className='footer-link'>
                        Ahemdabad
                        </span>
                        <span className='footer-link'>
                        Indore
                        </span>
                        <span className='footer-link'>
                        Mumbai
                        </span>
                    </div>
                </div>
                <div className='footer-grid-element'>
                    <div className='footer-grid-element-title'>
                    Social Media
                    </div>
                    <div className='footer-grid-element-content'>
                        <Link style={{color:"black"}}>
                        <FacebookOutlined className='footer-icon' />
                           <span className='footer-link'>Facebook</span> 
                        </Link>
                        <Link style={{color:"black"}}>
                        <TwitterOutlined className='footer-icon'/>
                            <span className='footer-link'>Twitter</span>
                        </Link>
                        <Link style={{color:"black"}}>
                        <InstagramOutlined className='footer-icon'/>
                            <span className='footer-link'>Instagram</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default Footer;