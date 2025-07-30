import './startButton.css';
import { useState, useEffect, useRef } from 'react';


function StartButton({
    children, 
    height='2.5rem', 
    width='5.6rem', 
    radius='.25rem', 
    font_size='1.25rem',
    handleBarrcodeExtraction,
    wait
    }) {
        
    return (
        <div 
            role='button' 
            className={`no_select button_frame d-flex justify-content-center align-items-center ${wait ? 'button_frame--loading': ''}`}  
            style={{
                height,
                width,
                borderRadius: radius,
                fontSize: font_size,
            }}
            onClick={() => handleBarrcodeExtraction()}
        >
            <div className='button_text'>{`${wait ? 'Loading...' : children}`}</div>
        </div>
    )
};

export default StartButton;
