"use client";

import { AiOutlineQrcode } from "react-icons/ai";
import { GoHome, GoHomeFill } from "react-icons/go";
import { FaDoorOpen, FaRegRectangleList } from "react-icons/fa6";
import { CiViewList } from "react-icons/ci";
import { IoIosListBox } from "react-icons/io";
import { RiFileList3Fill, RiFileList3Line } from "react-icons/ri";
import { BsDoorOpen, BsFillDoorOpenFill } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import { MdOutlineDoorBack } from "react-icons/md";
import { TbDoorExit } from "react-icons/tb";
import { VscNotebook } from "react-icons/vsc";
import QRCodeScanner from "./page";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
// FaBookmark;
export function QrCode({ buttonScan }) {
  return (
    <div className="relative">
      <div className="absolute  -top-10 inset-0 flex flex-col items-center justify-center">
        <div
          onClick={buttonScan}
          className="relative flex items-center justify-center bg-[#FFFFFF] border-[6px] border-[#EEF1F4]  p-3 rounded-full"
        >
          <AiOutlineQrcode size={"2em"} color="#118911" />
        </div>
        {/* <p className="text-[#939185] font-semibold text-sm my-1">QR Code</p> */}
      </div>
    </div>
  );
}

export default function MobileFooter({ hideContent }) {
  const [isActive, setIsActive] = useState(false);
  // const [code, setCode] = useState("JKFSSGM");
  const [code, setCode] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  // const fetcher = (url) => fetch(url).then((r) => r.json());
  // const { data, error, isLoading } = useSWR("/googlesheet", fetcher);

  const buttonClik = () => {
    setIsActive(!isActive);

    hideContent();
  };

  const getCodeScan = (code) => {
    setCode(code);

    // Ambil bagian URL yang diinginkan
    const basePath = "/dashboard/forma/";
    if (pathname.startsWith(basePath)) {
      setIsActive(!isActive);
      hideContent();
    }

    router.push(`/dashboard/forma/${code}`);
  };

  return (
    <>
      {isActive && <QRCodeScanner getCodeScan={getCodeScan} />}
      <div className="lg:hidden rounded-tr-lg rounded-tl-lg shadow-md z-10 fixed bottom-0 right-0 w-full py-2 px-5 bg-[#FFFFFF] ">
        <QrCode buttonScan={buttonClik} />
        <div className="flex ">
          <div className="flex-1 flex justify-between space-x-6 text-sm">
            <Link
              className={`${
                pathname.includes("/dashboard") &&
                pathname !== "/dashboard/setting-google-id"
                  ? "text-[#118911]"
                  : "text-[#939185]"
              }`}
              href={"/dashboard"}
            >
              <div className="flex-row text-center ">
                <GoHomeFill size={"1.6em"} className="inline-block" />
                <p>Home</p>
              </div>
            </Link>
            <div className="flex-row text-center text-[#939185]">
              <RiFileList3Line size={"1.6em"} className="inline-block" />
              <p>Record</p>
            </div>
            {/* <GoHome size={"2em"} className="text-white " /> */}
            {/* <IoIosListBox size={"2em"} className="text-white" /> */}
            {/* <FaRegRectangleList size={"2em"} className="text-white" /> */}
            {/* <RiFileList3Line size={"2em"} className="text-white" /> */}
            <Link
              className={`${
                pathname === "/dashboard/setting-google-id"
                  ? "text-[#118911]"
                  : "text-[#939185]"
              }`}
              href={"/dashboard/setting-google-id"}
            >
              <div className="flex-row text-center ">
                <VscNotebook size={"1.6em"} className="inline-block" />
                <p>Note</p>
              </div>
            </Link>
            <div className="flex-row text-center text-[#939185]">
              <TbDoorExit size={"1.6em"} className="inline-block" />
              <p>Exit</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
