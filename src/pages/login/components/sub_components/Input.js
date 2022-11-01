import React from 'react';


const Input = props => {

    function handleChange(e){
        props.getValue(e.target.value)
    }
    return (
        <div className="flex flex-col justify-between sm:flex-row">
        <div className="font-thin text-xl mr-6">{props.title}</div>
        <div>
          <input
            type={props.type}
            name=""
            value={props.state}
            onChange={handleChange}
            id=""
            className="borderbot1 border-black p-2 outline-none"
            
          />
        </div>
      </div>
    );
};

export default Input;