"use client";
import axios from "axios";
import QRCodeScanner from "../scan-computer/page";
import { useEffect, useState } from "react";
import { MdQrCode2 } from "react-icons/md";
import useSWR from "swr";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  // const [code, setCode] = useState("JKFSSGM");
  const [code, setCode] = useState("");
  const router = useRouter();


  const buttonClik = () => {
    setIsActive(isActive ? false : true);
  };

  const getCodeScan = (code) => {
    setCode(code);
    router.push(`/forma-test/${code}`);
  };

  return (
    <div className="flex justify-center text-center items-center">
      <div className="sm:w-screen sm:h-screen h-screen w-screen">
        {!code && (
          <button onClick={buttonClik} className="p-6 bg-red-300 text-center">
            {!isActive && <MdQrCode2 size={"6em"} className="inline-block" />}
            <p> {isActive ? "Matikan Camera" : "Scan Barcode"}</p>
          </button>
        )}
        {isActive && <QRCodeScanner getCodeScan={getCodeScan} />}
      </div>
    </div>
  );
}
