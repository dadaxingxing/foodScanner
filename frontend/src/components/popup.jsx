import './popup.css';
import { useEffect, useState, createContext, useContext } from 'react';

// Context Setup
const PopupContext = createContext();
export const usePopup = () => useContext(PopupContext);

// Toast Provider + Popup Rendering
export const PopupProvider = ({ children }) => {
    const [popup, setPopup] = useState([]);
    
    const showToast = (message) => {
        const id = Date.now();
        setPopup(prev => [...prev, { id, message}]);

        setTimeout(() => {
            setPopup(prev => prev.filter(p => p.id !== id))
        }, 2000);
    };

    return (
        <PopupContext.Provider value={showToast}>
            
            {children}
            {popup.map(({ id, message}) => (
                <Popup key={id} message={message} trigger={id} />
            ))}

        </PopupContext.Provider>
    )
}


// OG Popup Component
function Popup({message, trigger, duration = 2000, fadeOutDuration = 400}) {
    const [visible, setVisible] = useState(false); 


    useEffect(() => {
        setVisible(true);

        const fadeOutTimer = setTimeout(() => setVisible(false), duration - fadeOutDuration);

        return () => clearTimeout(fadeOutTimer);

    }, [trigger, duration, fadeOutDuration]);

    return (
        <div className={`message_container ${visible ? 'show' : ''} `} >
            <div className='message d-flex justify-content-center align-items-center'>
                {message}
            </div>
        </div>
    );
}


export default Popup;   