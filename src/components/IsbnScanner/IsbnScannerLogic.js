import { useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import PageLogic from '../../helpers/PageLogicHelper';

const IsbnScannerLogic = ({ onResult, onError }) => {
  const { useLoadPage } = PageLogic();
  const controls = useRef();
  const videoRef = useRef(null);
  const videoInputDevices = useRef(null);
  const codeReader = new BrowserMultiFormatReader();
  const [cameraId, setCameraId] = useState();
  const [cameraLoaded, setCameraLoaded] = useState(false);

  useLoadPage(async () => {
    videoInputDevices.current =
      await BrowserMultiFormatReader.listVideoInputDevices();

    if (!videoInputDevices.current || !videoInputDevices.current.length) {
      onError && onError();
      return;
    }

    // choose your media device (webcam, frontal camera, back camera, etc.)
    var selectedDeviceId;
    if (videoInputDevices.current[1].deviceId) {
      setCameraId(1);
      selectedDeviceId = videoInputDevices.current[1].deviceId;
    } else {
      setCameraId(0);
      selectedDeviceId = videoInputDevices.current[0].deviceId;
    }

    const previewElem = videoRef.current;

    // you can use the controls to stop() the scan or switchTorch() if available
    controls.current = await codeReader.decodeFromVideoDevice(
      selectedDeviceId,
      previewElem,
      (result, error, controls) => {
        if (result) onFinishScan(result.text);
      }
    );

    setCameraLoaded(true);
  });

  const rotateCam = async () => {
    const newCameraId = cameraId === 1 ? 0 : 1;

    const selectedDeviceId = videoInputDevices.current[newCameraId].deviceId;

    // Exit if something is wrong
    if (!controls.current || !selectedDeviceId) return;

    setCameraLoaded(false);

    // Stop the old
    controls.current.stop();

    const previewElem = videoRef.current;

    controls.current = await codeReader.decodeFromVideoDevice(
      selectedDeviceId,
      previewElem,
      (result, _, __) => {
        if (result) onFinishScan(result.text);
      }
    );
    setCameraId(newCameraId);
    setCameraLoaded(true);
  };

  const onFinishScan = (isbn) => {
    if (!controls.current) return;
    controls.current.stop();
    onResult({ isbn: isbn });
  };

  return { videoRef, rotateCam, cameraLoaded };
};

export default IsbnScannerLogic;
