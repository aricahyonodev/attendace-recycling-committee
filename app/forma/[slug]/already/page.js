import Link from "next/link";
import { CiWarning } from "react-icons/ci";

export default function formAalready({ params }) {
  const name = params.slug.replace(/-/g, " ");

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/4 bg-white  p-6 rounded-md shadow-md text-center">
        <CiWarning size={"10em"} className="inline-block text-gray-400" />
        <p className="font-extrabold text-2xl">Oops!</p>
        <p className="font-semibold mb-3">Ada yang salah</p>
        <p className="text-start">
          sepertinya,<span className="font-semibold"> {name}</span> sudah
          melakukan absensi sebelumnya
        </p>
        <Link href={"/home"}>
          <button className="capitalize w-full mt-8 p-3 text-white bg-red-500 rounded-md font-medium cursor-pointer">
            Kembali ke Home
          </button>
        </Link>
      </div>
    </div>
  );
}
