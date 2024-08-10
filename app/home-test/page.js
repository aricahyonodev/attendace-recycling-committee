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
      <div className="lg:w-1/2 ">
        {!code && (
          <div className="absolute top-1 left-0 right-0 z-10">
            <button
              onClick={buttonClik}
              className=" hidden lg:inline-block  p-6 bg-green-300 text-center"
            >
              {!isActive && <MdQrCode2 size={"6em"} className="inline-block" />}
              <p> {isActive ? "Matikan Camera" : "Scan Barcode"}</p>
            </button>
          </div>
        )}
        {isActive && <QRCodeScanner getCodeScan={getCodeScan} />}
      </div>
    </div>
  );
}
