import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

import Popup from './components/popup';
import StartButton from './components/startButton';
import CardData from './components/cardData';
import Camera from './components/camera.jsx';


function App() {
  const [foodCode, setFoodCode] = useState(0);
  const [nutrData, setNutrData] = useState(null);
  
  const handleBarrcodeExtraction = async () => {
    if (!foodCode) return;
    
    const strFoodCode = foodCode.toString();
    if (strFoodCode.length !== 12 && strFoodCode.length !== 13 && /^\d+$/.test(strFoodCode)) {
      console.log('Error: Invalid barcode format.');
      return;
    }
    
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_BACKEND_URL}/api/get_cal/${foodCode}`);
      console.log('Response: Extraction Successful!')
      setNutrData(response.data);

    } catch (error) {
      console.log(`Error: ${error}`);
      setNutrData(null);
    }
    
  }

  useEffect(() => {
    console.log(nutrData);
  }, [nutrData]);

  useEffect(() => {
    setFoodCode(3017620429484);
  }, []);

  // console.log(foodCode);

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
                  handleBarrcodeExtraction={handleBarrcodeExtraction}
                >Extract Barcode</StartButton>
            </div>
          </div>

        </div>
      </div>
      

      <div className='data d-flex flex-column justify-content-center align-items-center'>
            <div className='container d-flex justify-content-center align-items-center'>

              <div className='row'>
                  <CardData data={nutrData}/>
              </div>

            </div>
      </div>
    </>

);
}

export default App;
