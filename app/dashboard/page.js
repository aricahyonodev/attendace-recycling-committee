"use client";
import axios from "axios";
import QRCodeScanner from "../scan-computer/page";
import { useEffect, useState } from "react";
import { MdQrCode2 } from "react-icons/md";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import MobileFooter from "../scan-computer/mobileFooter";
import NavbarTop from "../scan-computer/navbarTop";
import Avatar from "boring-avatars";

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

export const MemberCard = ({ name }) => {
  const colors = ["#1A5319", "#D6EFD8", "#9CDBA6"]; // Contoh warna hex
  const randomColor = getRandomColor(colors);

  return (
    <div className="px-2 text-xs py-3 flex bg-white my-1 shadow-sm rounded-md">
      <div className="flex space-x-1">
        <Avatar
          color={randomColor}
          name={name}
          size="38"
          variant="marble"
          colors={["#1A5319", "#41B06E", "#9CDBA6"]}
          className="rounded-full"
        />
        <div>
          <p className="font-medium text-sm capitalize">{name}</p>
          <p className="text-xs font-light">11-08-2024 06:45:15</p>
        </div>
      </div>
      <div className="flex-1 font-medium text-xs justify-end flex items-center">
        <div className="flex flex-row items-center">
          <p>BLOK IX</p>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const [code, setCode] = useState("");
  const [contentHide, setContentHide] = useState(false);
  const router = useRouter();

  const buttonClik = () => {
    setIsActive(isActive ? false : true);
  };

  const getCodeScan = (code) => {
    setCode(code);
    router.push(`/forma/${code}`);
  };

  return (
      <div className="px-4">
        {!isActive && (
          <div>
            <div className="mt-24 bg-white rounded-md text-center pt-4 pb-6 shadow-sm text-sm">
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

            <div className="text-sm">
              <div className="flex justify-between mt-5 mb-2">
                <p className="font-medium capitalize">Absensi terverifikasi</p>
                <p>Lihat Semua</p>
              </div>

              <div className="mb-32">
                {members.map((name, i) => (
                  <MemberCard key={i} name={name} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-center text-center items-center">
          <div className="lg:w-1/2 ">
            {!code && (
              <div className="absolute top-1 left-0 right-0 z-10">
                <button
                  onClick={buttonClik}
                  className=" hidden lg:inline-block  p-6 bg-green-300 text-center"
                >
                  {!isActive && (
                    <MdQrCode2 size={"6em"} className="inline-block" />
                  )}
                  <p> {isActive ? "Matikan Camera" : "Scan Barcode"}</p>
                </button>
              </div>
            )}
            {isActive && <QRCodeScanner getCodeScan={getCodeScan} />}
          </div>
        </div>
      </div>
  );
}
