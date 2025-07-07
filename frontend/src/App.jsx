import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import './App.css';
import BarcodeScanner from "react-qr-barcode-scanner";
import Popup from './components/popup';

function App() {
  const [foodCode, setFoodCode] = useState(0)

  return (
    
    <div className='container d-flex flex-column justify-content-center align-items-center vh-100'>
      <div className='row'>
        <Popup message={'monkey fudisahfiudshfsuiadh'}/>
      </div>


      <div className='row'>

        {/* how do I activate the scanning feature of the barcode component? */}
        <BarcodeScanner
          className='col-auto'
          width={500}
          height={500}
          onUpdate={(err, result) => {
            if (result) setFoodCode(result.text);
            else console.log(err); 
          }}
        />
      </div>
        
      <div className='row'>
        <div className='col-12 offset-6'>
          <div>{foodCode}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
