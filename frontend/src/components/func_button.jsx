import './func_button.css';
import React, { useState } from 'react';


function Func_button({children, onClick, background}) {


    return (
        <button onClick={onClick} className={`func_button ${background ? 'default_green' : 'default_white'}`}>
            {children}
        </button>
    );
};

export default Func_button;