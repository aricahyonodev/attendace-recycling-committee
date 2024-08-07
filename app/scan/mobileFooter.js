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
// FaBookmark;
export function QrCode(second) {
    return (
      <div className="relative">
        <div className="absolute -top-0 inset-0 flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center bg-[#FFFFFF] shadow-lg p-3 rounded-full">
            <AiOutlineQrcode size={"2em"} color="#118911" />
          </div>
          {/* <p className="text-[#939185] font-semibold text-sm my-1">QR Code</p> */}
        </div>
      </div>
    );
}

export default function MobileFooter(params) {
  return (
    <div className="shadow-md fixed bottom-0 right-0 w-full py-2 px-5 bg-[#FFFFFF] ">
      <QrCode />
      <div className="flex ">
        <div className="flex-1 flex justify-start space-x-6 text-sm">
          <div className="flex-row text-center text-[#118911]">
            <GoHomeFill size={"1.6em"} className="inline-block" />
            <p>Home</p>
          </div>
          <div className="flex-row text-center text-[#939185]">
            <RiFileList3Line size={"1.6em"} className="inline-block" />
            <p>Record</p>
          </div>
          {/* <GoHome size={"2em"} className="text-white " /> */}
          {/* <IoIosListBox size={"2em"} className="text-white" /> */}
          {/* <FaRegRectangleList size={"2em"} className="text-white" /> */}
          {/* <RiFileList3Line size={"2em"} className="text-white" /> */}
        </div>
        <div className="flex-1 flex justify-end space-x-6 text-sm">
          <div className="flex-row text-center text-[#939185]">
            <VscNotebook size={"1.6em"} className="inline-block" />
            <p>Note</p>
          </div>
          <div className="flex-row text-center text-[#939185]">
            <TbDoorExit size={"1.6em"} className="inline-block" />
            <p>Exit</p>
          </div>
        </div>
      </div>
    </div>
  );
}
