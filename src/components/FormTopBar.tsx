import React from 'react';
import './FormTopBar.css';
import white from "../images/MzCare_Logo_white.png"

const FormTopBar: React.FC = () => {
  return (
    <div className="placeTop">
        <div className='logoPlacement'>
        <img src={white}>
        </img>
        </div>
      </div>
  );
};

export default FormTopBar;
