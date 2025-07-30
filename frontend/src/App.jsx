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
  const [toastTrigger, setToastTrigger] = useState(0);
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(0);
  const [wait, setWait] = useState(false);

  
  const handleBarrcodeExtraction = async () => {
    if (wait) return;

    if (!foodCode) {
      setMessage('🔴Error: Please scan a barcode first.');
      setCount(prev => prev + 1);
      return;
    }

    const strFoodCode = foodCode.toString();
    if (strFoodCode.length !== 12 && strFoodCode.length !== 13 && /^\d+$/.test(strFoodCode)) {
      setMessage('🔴Error: Invalid barcode format.');
      setCount(prev => prev + 1);
      return;
    }
    
    setWait(true);  
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_BACKEND_URL}/api/get_cal/${foodCode}`);
      setMessage('🟢Success: Extraction Complete!');
      setCount(prev => prev + 1);
      setNutrData(response.data);
      
    } catch (error) {
    
      setMessage(`🔴Error: ${error.response.data.message}`);
      setCount(prev => prev + 1);
      setNutrData(null);
    } finally {
      setWait(false);
    }
  }
  
  useEffect(() => {
    if (count !== 0) {
      const showMessage = () => {
        setToastTrigger(prev => prev + 1);
      };
      
      showMessage();
    }    
  }, [count]);


  // useEffect(() => {
  //   setFoodCode(3017620429484);
  // }, []);

  // console.log(toastTrigger);


  return (
    <>
      {toastTrigger > 0 && 
        <Popup
        message={message}
        trigger={toastTrigger} 
        />      
      }

      <div className='scanner d-flex flex-column justify-content-center align-items-center'>
        <div className='container'>

          <div className='row gap-4'>
            <div className='d-flex justify-content-center flex-row col-12'>
              <div className='scanner_container d-flex justify-content-center align-items-center flex-column'>

                <div className='text scanner_text'>Scan Barcode Below</div>

                <div className='px-2'>
                  <Camera onResult={(text) => {
                    setMessage(`🟢Success: Barcode Found (${text})`);
                    setCount(prev => prev + 1);
                    setFoodCode(text)}}/>
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
