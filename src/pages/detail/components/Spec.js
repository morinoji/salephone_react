import React from 'react';
import { useSelector } from 'react-redux';
import SpecLine from './sub_components/SpecLine';

const Spec = props => {
    const detail=useSelector(state=>state.detail.innerDetail)
    return (
        <div className='spec-section' style={{width:"37%", marginTop:"24px"}}>
            <div style={{fontSize:"x-large", fontWeight:"350"}}>
                Cấu hình {detail.model_name}
            </div>
            <SpecLine title="Màn Hình:" value={detail.detail_screen} bgColor="#f5f5f5"/>
            <SpecLine title="Hệ điều hành:" value={detail.detail_os}/>
            <SpecLine title="Camera sau:" value={detail.detail_behindcam} bgColor="#f5f5f5"/>
            <SpecLine title="Camera trước:" value={detail.detail_frontcam}/>
            <SpecLine title="Chip:" value={detail.detail_chip} bgColor="#f5f5f5"/>
            <SpecLine title="RAM:" value={detail.detail_ram}/>
            <SpecLine title="Dung lượng lưu trữ:" value={detail.detail_internalmem} bgColor="#f5f5f5"/>
            <SpecLine title="SIM:" value={detail.detail_sim}/>
            <SpecLine title="Pin, Sạc:" value={detail.detail_pin} bgColor="#f5f5f5"/>

        </div>
    );
};


export default Spec;