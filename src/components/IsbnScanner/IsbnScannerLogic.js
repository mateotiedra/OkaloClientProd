import { useRef, useState } from 'react';
import Quagga from 'quagga';
import PageLogic from '../../helpers/PageLogicHelper';

const IsbnScannerLogic = ({ onResult, onError }) => {
  const { useLoadPage } = PageLogic();
  const [cameraStatus, setCameraStatus] = useState('loading');
  const scanFinished = useRef(false);
  const videoRef = useRef(null);
  const camProps = {
    id: 'interactive',
    className: 'viewport',
  };

  useLoadPage(
    () => {
      Quagga.init(
        {
          inputStream: {
            type: 'LiveStream',
            target: videoRef.current,
            constraints: {
              height: { max: 400 },
              facingMode: 'environment',
              aspectRatio: { min: 1, max: 2 },
            },
          },
          frequency: 10,
          decoder: {
            readers: ['ean_reader'],
          },
          locate: true,
        },
        (err) => {
          if (err) {
            setCameraStatus('fail');
          } else {
            Quagga.start();
            setCameraStatus('active');
          }
          return () => {
            Quagga.stop();
          };
        }
      );

      //Quagga.onProcessed((_) => {});

      Quagga.onDetected(onFinishScan);
    },
    {
      actionOut: () => {
        Quagga.stop();
      },
    }
  );

  const onFinishScan = ({ codeResult }) => {
    if (scanFinished.current) return;
    scanFinished.current = true;
    onResult({ isbn: codeResult.code });
    Quagga.stop();
  };

  return { cameraStatus, camProps, videoRef };
};

export default IsbnScannerLogic;
