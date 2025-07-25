import './popup.css';
import { useEffect, useState } from 'react';
    
function Popup({message, trigger, duration = 1200}) {
    const [visible, setVisible] = useState(false); 


    useEffect(() => {
        setVisible(true);
        const timeOut = setTimeout(() => setVisible(false), duration);
        return () => clearTimeout(timeOut);
    }, [trigger]);

    return (
        <div className={`message_container ${visible ? 'show' : ''} `} >
            <div className='message d-flex justify-content-center align-items-center'>
                {message}
            </div>
        </div>
    );
}


export default Popup;