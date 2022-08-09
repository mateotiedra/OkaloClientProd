/* import { useState } from 'react'; */
//import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import Navbar from '../Navbar/Navbar';
import SectionContainer from '../SectionContainer/SectionContainer';

function IsbnScanner() {
  /* const [code, setCode] = useState(); */

  /* const handleScan = (err, result) => {
    if (result) setCode(result.text);
    else setCode('Not Found');
  }; */

  return (
    <>
      <Navbar coverPage />
      <SectionContainer fullPage maxWidth={'sm'}>
        {/* <BarcodeScannerComponent
          width={500}
          height={500}
          onUpdate={handleScan}
        /> 
        <p>{code}</p>*/}
      </SectionContainer>
    </>
  );
}

export default IsbnScanner;
