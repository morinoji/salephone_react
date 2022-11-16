import { DatePicker, Input } from 'antd';
import React from 'react';
import './css/in4_line.css'
import moment from 'moment';

const In4Line = props => {
    return (
        <div className='information-line'>
            <span className='information-line-label'>{props.label}: </span>
            {
                props.isDate==null? <Input type={props.password? "password":"text"} className='input-in4' readOnly={props.unCopiable} onChange={props.handleChange} defaultValue={props.initValue} value={props.constValue}/>: <DatePicker  onChange={props.handleChange} defaultValue={moment(props.initValue!=null? props.initValue.split(" ")[0]:null, 'YYYY/MM/DD')} value={moment(props.constValue!=null? props.constValue.split(" ")[0]:null, 'YYYY/MM/DD')} format={'DD/MM/YYYY'}/>
            }
         </div>
    );
};



export default In4Line;