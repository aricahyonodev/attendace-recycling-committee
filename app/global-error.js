"use client";
import Link from "next/link";
import { GrSystem } from "react-icons/gr";
export default function GlobalError() {
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="lg:w-1/4 w-5/6 text-sm lg:text-base bg-white  p-6 rounded-md shadow-md text-center text-neutral-700">
          <GrSystem className="inline-block text-neutral-500 text-8xl lg:text-9xl" />
          <p className="font-extrabold text-lg lg:text-2xl mt-1">Maafff!</p>
          <p className="font-semibold mb-2">Sistem Sedang Bermasalah</p>
          <p className="text-start text-neutral-600">Segera hubungi admin.</p>
          <Link href={"/home"}>
            <button className="capitalize w-full mt-8 p-3 text-white bg-red-500 rounded-md font-medium cursor-pointer">
              Kembali ke Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
