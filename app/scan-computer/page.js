"use client";

import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import jsQR from "jsqr";

const QRCodeScanner = ({getCodeScan}) => {
  const [isScanning, setIsScanning] = useState(true);
  const [videoHidden, setVideoHidden] = useState(false);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Fungsi untuk menghentikan video
  const stopStream = () => {
    if (webcamRef.current && webcamRef.current.video.srcObject) {
      const stream = webcamRef.current.video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      webcamRef.current.video.srcObject = null;
    }
  };

  const scanQRCode = () => {
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

        const code = jsQR(
          imageData.data,
          overlayRect.width,
          overlayRect.height
        );

        if (code) {
          getCodeScan(code.data);
          setIsScanning(false);
          setVideoHidden(true);
          stopStream();
          console.log("Camera stopped and QR code detected");
        } else if (isScanning) {
          requestAnimationFrame(scanQRCode);
        }
      } else {
        setTimeout(scanQRCode, 100);
      }
    }
  };

  useEffect(() => {
    if (isScanning) {
      scanQRCode();
    }

    return () => {
      stopStream();
    };
  }, [isScanning]);

  return (
    <div className="pt-24 px-4 ">
      <div className="flex flex-col items-center relative">
        <div className="w-full">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "environment" }}
            className="w-full"
            style={{
              height: "auto",
              border: "1px solid #ddd",
              background: "rgba(0, 0, 0, 0.3)",
              display: videoHidden ? "none" : "block",
            }}
          />
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          {!videoHidden && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "200px",
                height: "200px",
                border: "3px solid #00FF00",
                borderRadius: "20px",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontSize: "16px",
                fontWeight: "bold",
                textAlign: "center",
                padding: "10px",
                boxSizing: "border-box",
              }}
            >
              <p className="top-32 text-sm relative">
                Posisikan QR CODE pada otak Hijau
              </p>
            </div>
          )}
        </div>
   
      </div>
    </div>
  );
};

export default QRCodeScanner;
