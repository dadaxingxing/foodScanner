import './camera.css';
import { useEffect, useRef } from 'react';
import { BarcodeFormat, BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

function Camera( { onResult } ) {
    const videoRef = useRef(null);
    const codeReader = useRef(null);
    const isCoolDown = useRef(false);


    useEffect( () => {

        codeReader.current = new BrowserMultiFormatReader();
        codeReader.current.decodeFromVideoDevice(null, videoRef.current, (result, err) => {

            if (isCoolDown.current) return;
            isCoolDown.current = true;
            setTimeout(() => {
                isCoolDown.current = false;
            }, 2000)
            
            
            if (result) {
                
                const text = result.getText();
                console.log(text);
                onResult(text);
                
            } else if (err && !(err instanceof NotFoundException)) {
                console.log(err);
            }
         },
        {
            formats: [BarcodeFormat.EAN_13, BarcodeFormat.UPC_A]
        }
        );

        return () => {
            if (codeReader.current) {
                codeReader.current.reset();
            }
        };
    }, [onResult]);

    return (
        <video ref={ videoRef } className='cam_wrap'/>
    );
};

export default Camera;