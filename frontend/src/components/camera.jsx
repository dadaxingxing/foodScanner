import './camera.css';
import { useState, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

function Camera( { onResult, active } ) {
    const videoRef = useRef(null);
    const codeReader = useRef(null);
    
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