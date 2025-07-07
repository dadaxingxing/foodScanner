import './popup.css';


function Popup({message}) {
    return (
        <div className='message_container'>
            <div className='message'>
                {message}
            </div>
        </div>
    );
}


export default Popup;