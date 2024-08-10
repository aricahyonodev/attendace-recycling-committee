import MobileFooter from "@/app/scan-computer/mobileFooter";
import Link from "next/link";
import { CiWarning } from "react-icons/ci";

export default function formAalready({ params }) {
  const name = params.slug.replace(/-/g, " ");

  return (
      <div className="flex justify-center items-center h-screen">
        <div className="lg:w-1/4 w-5/6 text-sm lg:text-base bg-white  p-6 rounded-md shadow-md text-center text-neutral-700">
          <CiWarning className="inline-block text-neutral-500 text-8xl lg:text-9xl" />
          <p className="font-extrabold text-2xl">Oops!</p>
          <p className="font-semibold mb-3">Ada yang salah</p>
          <p className="text-start">
            sepertinya,<span className="font-semibold capitalize"> {name}</span> sudah
            melakukan absensi sebelumnya
          </p>
          <Link href={"/dashboard"}>
            <button className="capitalize w-full mt-8 p-3 text-white bg-orange-500 rounded-md font-medium cursor-pointer">
              Kembali ke Home
            </button>
          </Link>
        </div>
      </div>
  );
}
