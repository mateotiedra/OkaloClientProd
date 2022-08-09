import { useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import PageLogic from '../../helpers/PageLogicHelper';

const IsbnScannerLogic = ({ onResult, onError }) => {
  const { useLoadPage, axios, API_ORIGIN, getStatusCode } = PageLogic();
  const controls = useRef();
  const videoRef = useRef(null);
  const codeReader = new BrowserMultiFormatReader();

  useLoadPage(async () => {
    const videoInputDevices =
      await BrowserMultiFormatReader.listVideoInputDevices();

    if (!videoInputDevices || !videoInputDevices.length) {
      onError();
      return;
    }

    // choose your media device (webcam, frontal camera, back camera, etc.)
    const selectedDeviceId = Boolean(videoInputDevices[1])
      ? videoInputDevices[1].deviceId
      : videoInputDevices[0].deviceId;

    const previewElem = videoRef.current;

    // you can use the controls to stop() the scan or switchTorch() if available
    controls.current = await codeReader.decodeFromVideoDevice(
      selectedDeviceId,
      previewElem,
      (result, error, controls) => {
        if (result) onFinishScan(result.text);
      }
    );
  });

  const onFinishScan = (isbn) => {
    if (!controls.current) return;
    controls.current.stop();
    onResult({ isbn: isbn });
  };

  return { videoRef };
};

export default IsbnScannerLogic;
