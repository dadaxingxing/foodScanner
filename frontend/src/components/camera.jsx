import './camera.css';
import { useState, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

function Camera( { onResult, active } ) {
    const videoRef = useRef(null);
    const codeReader = useRef(null);
    
    // const startScanner = () => {        
    //     codeReader.current = new BrowserMultiFormatReader();
    //     codeReader.current.decodeFromVideoDevice(
    //         null, 
    //         videoRef.current,  
    //         (result, err, controls) => {
                
    //             if (isCoolDown.current) return;
                
    //             if (result) {
    //                 isCoolDown.current = true;
                    
                    
    //                 const text = result.getText();                
    //                 onResult(text);
                    
    //                 timer.current = setTimeout(() => {
    //                     isCoolDown.current = false;
    //                 }, 1000);
    //             } else if (err && !(err instanceof NotFoundException)) {
    //                 console.log(err);
    //             }},
    //     );
    // };

    
    useEffect( () => {

        if (!active) {
            if (codeReader.current) codeReader.current.reset();
            return;
        }
        
        codeReader.current = new BrowserMultiFormatReader();
        codeReader.current.decodeFromVideoDevice(
            null, videoRef.current,
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