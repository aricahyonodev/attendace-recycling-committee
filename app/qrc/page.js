"use client";

import React, { useState, useRef } from "react";
import Webcam from "react-webcam";

export default function Qrc() {
  const [isStreaming, setIsStreaming] = useState(true);
  const webcamRef = useRef(null);

  // Fungsi untuk menghentikan video
  const stopVideo = () => {
    setIsStreaming(false);
  };

  // Fungsi untuk memulai video
  const startVideo = () => {
    setIsStreaming(true);
  };

  return (
    <div className="flex flex-col items-center">
      {isStreaming ? (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: "environment" }}
          className="w-full h-auto"
        />
      ) : (
        <p>Video stopped</p>
      )}
      <div className="mt-4">
        <button onClick={startVideo} className="btn btn-primary">
          Start Video
        </button>
        <button onClick={stopVideo} className="btn btn-secondary ml-4">
          Stop Video
        </button>
      </div>
    </div>
  );
}
