'use client'
import { useEffect, useRef } from "react";

const VideoTest = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }, // Menggunakan kamera belakang
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    startVideo();

    // Clean up video stream when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <h2>Video Test</h2>
      <video
        ref={videoRef}
        style={{
          width: "100%",
          height: "auto",
          border: "1px solid #ddd",
        }}
        autoPlay
        playsInline
      ></video>
    </div>
  );
};

export default VideoTest;
