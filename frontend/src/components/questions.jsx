import './questions.css';
import React from 'react';

function Questions({ques, ans}) {
    return (
        <>
            <button className='toggle active'>
                <span className='questions'>{ques}</span>
                <span className='icon'></span>
            </button>
        
            <div className='ans'>
                <p>{ans}</p>    
            </div>        
        </>
    );
};

export default Questions;