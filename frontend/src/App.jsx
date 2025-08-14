import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

import StartButton from './components/startButton';
import CardData from './components/cardData';
import Camera from './components/camera.jsx';
import { usePopup } from './components/popup.jsx';

function App() {
  const showToast = usePopup();
  const [foodCode, setFoodCode] = useState(0);
  const [nutrData, setNutrData] = useState(null);
  const [wait, setWait] = useState(false);
  const [camActive, setCamActive] = useState(false);
  
  const handleBarrcodeExtraction = async () => {
    if (wait) return;

    if (!foodCode) {
      showToast('🔴Error: Please scan a barcode first.');
      return;
    }

    const strFoodCode = foodCode.toString();
    if (strFoodCode.length !== 12 && strFoodCode.length !== 13 && /^\d+$/.test(strFoodCode)) {
      showToast('🔴Error: Invalid barcode format.');
      return;
    }

    setWait(true);  
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_BACKEND_URL}/api/get_cal/${foodCode}`);
      showToast('🟢Success: Extraction Complete!');
      setNutrData(response.data);
      
    } catch (error) {
    
      showToast(`🔴Error: ${error.response.data.message}`);
      setNutrData(null);
    } finally {
      setWait(false);
      setFoodCode(0);
    }
  }
  

  return (
    <>
      <div className='scanner d-flex flex-column justify-content-center align-items-center'>
        <div className='container'>

          <div className='row gap-4'>
            <div className='d-flex justify-content-center flex-row col-12'> 
              <div className='scanner_container d-flex justify-content-center align-items-center flex-column'>

                <div className='text scanner_text'>Scan Barcode Below</div>

                <div className='px-2'>
                  <Camera 
                  
                    onResult={(text) => {
                      setCamActive(false);
                      setMessage(`🟢Success: Barcode Found (${text})`);
                      setFoodCode(text)}}
                    active={camActive}
                    
                  />
                </div>
              </div>  
            </div>

            <div className='col-12 d-flex justify-content-center'>
                <StartButton
                  wait={wait}
                  width='31.25rem'
                  height='2.5rem'
                  handleBarrcodeExtraction={handleBarrcodeExtraction}
                >Extract Barcode</StartButton>
            </div>
          </div>

        </div>
      </div>
      
      <div className='functions'>

        <button onClick={() => setCamActive(true)}>
          Start Camera
        </button>
        
      </div>

      <div className='data d-flex flex-column justify-content-center align-items-center'>
            <div className='container d-flex justify-content-center align-items-center'>

              <div className='row'>
                    <div className='col-12'>
                      <CardData data={nutrData}/>
                    </div>
              </div>

            </div>
      </div>

    </>

);
}

export default App;
