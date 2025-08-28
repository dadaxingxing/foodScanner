import './func_button.css';
import React, { useState } from 'react';


function Func_button({children, onClick}) {
    const [background, setBackground] = useState(false);

    const handleClick = () => {
        onClick();
        setBackground(!background);
    };

    return (
        <button onClick={handleClick} className={`func_button ${background ? 'default_white' : 'default_green'}`}>
            {children}
        </button>
    );
};

export default Func_button;