import React from 'react';
import './css/spec_line.css'

const SpecLine = props => {
    return (
        <div className='spec-line' style={{backgroundColor:props.bgColor}}>
            <div className='spec-line-key'>
                {props.title}
            </div>
            <div className='spec-line-value'>
                {props.value}
            </div>
         </div>
    );
};



export default SpecLine;