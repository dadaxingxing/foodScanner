import './startButton.css';
import { useState, useEffect, useRef } from 'react';



function StartButton({children, height='2.5rem', width='5.6rem', radius='.25rem', font_size='1.25rem'}) {
        
    return (
        <>
            <div 
                role='button' 
                className='btn button_frame d-flex justify-content-center align-items-center' 
                style={{
                    height,
                    width,
                    borderRadius: radius,
                    fontSize: font_size,
                }}
            >
                <div className='button_text'>{children}</div>
            </div>
        </>
    )
};

export default StartButton;