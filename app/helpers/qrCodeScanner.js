// Fungsi untuk menghentikan video
const stopStream = (webcamRef) => {
  if (webcamRef.current && webcamRef.current.video.srcObject) {
    const stream = webcamRef.current.video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    webcamRef.current.video.srcObject = null;
  }
};

const scanQRCode = (
  webcamRef,
  canvasRef,
  setQrCode,
  setIsScanning,
  setVideoHidden
) => {
  const video = webcamRef.current?.video;
  const canvas = canvasRef.current;
  const context = canvas?.getContext("2d");

  if (video && canvas && context) {
    if (video.videoWidth > 0 && video.videoHeight > 0) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const overlayRect = {
        left: canvas.width / 2 - 150,
        top: canvas.height / 2 - 100,
        width: 300,
        height: 200,
      };

      const imageData = context.getImageData(
        overlayRect.left,
        overlayRect.top,
        overlayRect.width,
        overlayRect.height
      );

      const code = jsQR(imageData.data, overlayRect.width, overlayRect.height);

      if (code) {
        setQrCode(code.data);
        setIsScanning(false);
        setVideoHidden(true);
        stopStream(webcamRef);
        console.log("Camera stopped and QR code detected");
      } else if (isScanning) {
        requestAnimationFrame(scanQRCode);
      }
    } else {
      setTimeout(scanQRCode(webcamRef, canvasRef), 100);
    }
  }
};

export {scanQRCode, stopStream}