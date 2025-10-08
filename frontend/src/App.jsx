import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

import StartButton from './components/startButton';
import CardData from './components/cardData';
import Camera from './components/camera.jsx';
import Func_button from './components/func_button.jsx';
import Questions from './components/questions.jsx';

import { usePopup } from './components/popup.jsx';

function App() {
  const showToast = usePopup();
  const [foodCode, setFoodCode] = useState(0);
  const [nutrData, setNutrData] = useState(null);
  const [wait, setWait] = useState(false);
  const [camActive, setCamActive] = useState(false);

  const faqs = [
    {
      question: "What is your refund policy?",
      answer: "We offer a 30-day refund for all purchases."
    },
    {
      question: "Do you offer support?",
      answer: "Yes, you can reach out to our 24/7 customer support team."
    },
    {
      question: "Where are you located?",
      answer: "We’re based in Los Angeles, California."
    }
  ];

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
                      showToast(`🟢Success: Barcode Found (${text})`);
                      setFoodCode(text);
                    }}
                      
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
      
      <div className='functions d-flex flex-row justify-content-center align-items-center'>

        {/* <button onClick={() => setCamActive(!camActive)}>
          {camActive ? 'stop camera' : 'start camera'}
        </button> */}
        <Func_button onClick={() => setCamActive(!camActive)} background={camActive}>
          {camActive ? '📷 Stop Camera' : '📷 Start Camera'}
        </Func_button>
        
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
        
      <div className='FAQ_container d-flex flex-column justify-content-center align-items-center'>
        <h4 className='FAQ_header'>Frequently Asked Questions</h4>
        {faqs.map((faq, ans) => (
          <Questions key={faq.question} ques={faq.question} ans={faq.answer}/>
        ))}
      </div>
    </>
);
}

export default App;
