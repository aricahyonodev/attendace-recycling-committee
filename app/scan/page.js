"use client";
import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import MobileFooter from "./mobileFooter";
import NavbarTop from "./navbarTop";
import Avatar from "react-avatar";

const members = [
  "yan edi",
  "Wim Mostmans",
  "Wim Mostmans",
  "Angga Dewantoro",
  "Vincent",
  "Dia ayu",
];

const getRandomColor = (colors) => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

export const MemberCard = ({name}) => {

   const colors = ["#557C55", "#6482AD", "#213363"]; // Contoh warna hex
   const randomColor = getRandomColor(colors);

  return (
    <div className="px-2 py-3 flex bg-white my-1 shadow-sm rounded-md">
      <div className="flex space-x-1">
        <Avatar
          color={randomColor}
          name={name}
          size="38"
          className="rounded-full"
        />
        <div>
          <p className="font-medium text-sm capitalize">{name}</p>
          <p className="text-xs font-light">11-08-2024 06:45:15</p>
        </div>
      </div>
      <div className="flex-1 font-medium text-sm justify-end flex items-center">
        <div className="flex flex-row items-center">
          <p>BLOK IX</p>
        </div>
      </div>
    </div>
  );
}

const QRCodeScanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [qrCode, setQrCode] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  const [videoHidden, setVideoHidden] = useState(false); // State untuk kontrol visibilitas video

  useEffect(() => {
    const startVideo = async () => {
      try {
        // const stream = await navigator.mediaDevices.getUserMedia({
        //   video: {
        //     facingMode: "environment", // Kamera belakang
        //     width: { ideal: 1280 },
        //     height: { ideal: 720 },
        //   },
        // });
        if (videoRef.current) {
          // videoRef.current.srcObject = stream;
          // videoRef.current.play();
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    startVideo();

    const scanQRCode = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (video && canvas && context) {
        // Periksa jika video memiliki dimensi yang valid
        if (video.videoWidth > 0 && video.videoHeight > 0) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          const code = jsQR(imageData.data, canvas.width, canvas.height);

          if (code) {
            setQrCode(code.data);
            setIsScanning(false); // Berhenti melakukan pemindaian
            setVideoHidden(true); // Sembunyikan video
            // Stop video stream
            if (video.srcObject) {
              const stream = video.srcObject;
              const tracks = stream.getTracks();
              tracks.forEach((track) => track.stop());
            }
          } else if (isScanning) {
            requestAnimationFrame(scanQRCode);
          }
        } else {
          // Cek jika video belum sepenuhnya dimuat
          setTimeout(scanQRCode, 100); // Coba lagi setelah beberapa waktu
        }
      }
    };

    if (isScanning) {
      // scanQRCode();
    }

    // Cleanup function
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        // const stream = videoRef.current.srcObject;
        // const tracks = stream.getTracks();
        // tracks.forEach((track) => track.stop());
      }
    };
  }, [isScanning]);

  return (
    <div className=" h-screen pt-24 px-4 mb-40">
      {/* Navbar */}
      <NavbarTop />

      <div className="bg-white rounded-md text-center pt-4 pb-6 shadow-sm text-sm">
        <div>
          <p className="text-4xl">40</p>
          <p className="">Total sudah mengumpulkan</p>
        </div>
        <div className="flex mt-4">
          <div className="flex-1">
            <p className="text-2xl">40%</p>
            <p className="capitalize text-sm">terkumpul</p>
          </div>
          <div className="flex-1">
            <p className="text-2xl">60%</p>
            <p className="capitalize text-sm">belum terkumpul</p>
          </div>
        </div>
      </div>

      <div className="">
        <div className="flex justify-between mt-5 mb-2">
          <p className="font-medium capitalize">Absensi terverifikasi</p>
          <p>Lihat Semua</p>
        </div>

        <div className="">
          {members.map((name, i) => (
            <MemberCard key={i} name={name} />
          ))}
        </div>
      </div>
      {/* <video
        ref={videoRef}
        style={{
          width: "100%",
          height: "auto",
          border: "1px solid #ddd",
          display: videoHidden ? "none" : "block", // Sembunyikan video jika diperlukan
        }}
        autoPlay
        playsInline
      ></video>
      <canvas
        ref={canvasRef}
        style={{ display: "none" }} // Canvas tidak perlu ditampilkan
      ></canvas> */}
      {/* {qrCode && (
        <div style={{ marginTop: "20px" }}>
          <h3>QR Code Detected:</h3>
          <p>{qrCode}</p>
        </div>
      )} */}

      <MobileFooter></MobileFooter>
    </div>
  );
};

export default QRCodeScanner;
