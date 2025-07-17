import './camera.css';
import { useEffect, useRef } from 'react';
import { BarcodeFormat, BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

function Camera( { onResult } ) {
    const videoRef = useRef(null);
    const codeReader = useRef(null);
    const isCoolDown = useRef(false);

    useEffect( () => {

        let timer = null;
        codeReader.current = new BrowserMultiFormatReader();
        codeReader.current.decodeFromVideoDevice(
            null, 
            videoRef.current,  
            (result, err) => {

            if (isCoolDown.current) return;
            
            if (result) {
                isCoolDown.current = true;
                
                timer = setTimeout(() => {
                    isCoolDown.current = false;
                }, 1000);

                const text = result.getText();
                console.log('Barcode Found!');
                
                onResult(text);
                
            } else if (err && !(err instanceof NotFoundException)) {
                console.log(err);
            }},
        );

        return () => {
            if (codeReader.current) {
                codeReader.current.reset();
            }
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [onResult]);

    return (
        <video ref={ videoRef } className='cam_wrap'/>
    );
};

export default Camera;