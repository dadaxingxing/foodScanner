import './camera.css';
import { useState, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

function Camera( { onResult, active } ) {
    const videoRef = useRef(null);
    const codeReader = useRef(null);
    const [index, setIndex] = useState(0);
    const [cameraId, setCameraId] = useState([]);

    // Runs on mount to get list of avilable cameras    
    useEffect(() => {
        
    }, []);

    // Runs to return the next camera from the list through ID
    const switchCamera = () => {};

    // Starts the camera
    const startCamear = () => {};

    useEffect( () => {

        if (!active) {
            if (codeReader.current) codeReader.current.reset();
            return;
        }

        codeReader.current = new BrowserMultiFormatReader();
        codeReader.current.decodeFromVideoDevice(
            null, 
            videoRef.current,
            (result, err) => {
                if (err && !(err instanceof NotFoundException)) {
                    console.log(err);
                } else if (result) {
                    onResult(result.getText());
                }
            }
        )

        return () => {
            if (codeReader.current) codeReader.current.reset();
        };
    }, [active, onResult]);

    return (
        <video ref={ videoRef } className='cam_wrap'/>
    );
};

export default Camera;