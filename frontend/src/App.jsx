import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import './App.css';
import BarcodeScanner from "react-qr-barcode-scanner";

import Popup from './components/popup';
import StartButton from './components/startButton';
import CardData from './components/cardData';
import Camera from './components/camera.jsx';


function App() {
  const [foodCode, setFoodCode] = useState(0)

  return (
    <>
      <div className='scanner d-flex flex-column justify-content-center align-items-center'>
        <div className='container'>

          <div className='row gap-4'>
            <div className='d-flex justify-content-center flex-row col-12'>
              <div className='scanner_container d-flex justify-content-center align-items-center flex-column'>

                <div className='text scanner_text'>Scan Barcode Below</div>

                <div className='px-2'>
                  <Camera onResult={(text) => setFoodCode(text)}/>
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
      </div>
      

      <div className='data d-flex flex-column justify-content-center align-items-center'>
            <div className='container d-flex justify-content-center align-items-center'>

              <div className='row'>
                  <CardData />
              </div>

            </div>
      </div>
    </>


  );
}

export default App;
