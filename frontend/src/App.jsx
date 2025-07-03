import { useState } from 'react';
import './App.css';
import BarcodeScanner from "react-qr-barcode-scanner";
 

function App() {
  const [foodCode, setFoodCode] = useState(0)

  return (
    <>
      <BarcodeScanner
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) setFoodCode(result.text);
          else console.log(err); 
        }}
      />

      <div>{foodCode}</div>
    </>
  );
}

export default App;
