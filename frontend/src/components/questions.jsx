import './questions.css';
import React, { useState } from 'react';

function Questions({ques, ans}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button 
                className='toggle'
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className='questions'>{ques}</span>
                <span className={`icon ${isOpen ? 'active' : ''}`}>+</span>
            </button>

            {isOpen && 
                <div className='ans'>
                    <p>{ans}</p>    
                </div>
            }
        </>
    );
};

export default Questions; 