import MobileFooter from "@/app/scan-computer/mobileFooter";
import Link from "next/link";
import { LuClipboardCheck } from "react-icons/lu";

export default function FormASuccess({ params }) {
  const name = params.slug.replace(/-/g, " ");

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="lg:w-1/4 w-5/6 text-sm lg:text-base bg-white  p-6 rounded-md shadow-md text-center text-neutral-700">
        <LuClipboardCheck className="inline-block text-neutral-500 text-8xl lg:text-9xl" />
        <p className="font-extrabold text-lg lg:text-2xl mt-1">Yay!</p>
        <p className="font-semibold mb-2">Absensi Berhasil</p>
        <p className="text-start text-neutral-600">
          <span className="font-semibold"> {name}</span> sudah terabsensi
          sekarang.
        </p>
        <Link href={"/dashboard"}>
          <button className="capitalize w-full mt-8 p-3 text-white bg-green-500 rounded-md font-medium cursor-pointer">
            Kembali ke Home
          </button>
        </Link>
      </div>
    </div>
  );
}