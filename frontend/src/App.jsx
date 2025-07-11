import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import './App.css';
import BarcodeScanner from "react-qr-barcode-scanner";

import Popup from './components/popup';
import StartButton from './components/startButton';


function App() {
  const [foodCode, setFoodCode] = useState(0)

  return (
    
    <div className='scanner d-flex flex-column justify-content-center align-items-center'>
      <div className='container'>

        <div className='row gap-4'>
          <div className='d-flex justify-content-center flex-row col-12'>
            <div className='scanner_container d-flex justify-content-center align-items-center flex-column'>

              <div className='text scanner_text'>Scan Barcode Below</div>

              <div className='camera_wrapper px-2'>
                <BarcodeScanner
                  onUpdate={(err, result) => {
                    if (result) setFoodCode(result.text);
                    else console.log(err); 
                  }}
                />
              </div>
            </div>
          </div>

          <div className='col-12 d-flex justify-content-center'>
              <StartButton
                width='31.25rem'
                height='2.5rem'
              >Extract Barcode</StartButton>
          </div>
        </div>


        
      </div>
     {/* <div className='row'>

        <BarcodeScanner
          className='col-auto'
          width={500}
          height={500}
          onUpdate={(err, result) => {
            if (result) setFoodCode(result.text);
            else console.log(err); 
          }}
        />
      </div> */}
        

    </div>
  );
}

export default App;
