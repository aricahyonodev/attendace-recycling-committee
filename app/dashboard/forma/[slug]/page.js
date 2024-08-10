import { InputFormBySearch } from "./inputFormBySearch";
import { SelectForm } from "./selectForm";

const InputForm = ({ label, inpuValue, disabled = false }) => {
  return (
    <div className="mt-5">
      <label className="uppercase mb-1 block font-medium">{label} </label>
      <input
        type="text"
        value={inpuValue}
        className={`border-b-2 p-2   w-full ${
          disabled && " cursor-not-allowed"
        }`}
        // readOnly
        disabled={disabled}
      />
    </div>
  );
};

function hurufKeAngka(huruf) {
  huruf = huruf.toUpperCase(); // Mengubah huruf menjadi huruf besar

  return huruf.charCodeAt(0) - "A".charCodeAt(0);
}

export default async function FormA({ params }) {
  const qrCode = params.slug;
  let data;
  const blokNumber = hurufKeAngka(qrCode[0]);

  try {
    const revalidatedData = await fetch(
      `https://attendace-recycling-committee.vercel.app/googlesheet/${blokNumber}`,
      { cache: "no-store" }
    );
    data = await revalidatedData.json();
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="flex justify-center h-screen items-center">
      <div className="bg-white border-2 lg:w-1/4 shadow-md rounded-md pt-14 text-start px-6 ">
        <h1 className="uppercase text-xl lg:text-2xl font-semibold text-center mb-7">
          pendataan Absensi
          <br />
          <span>form a</span>
        </h1>

        <InputForm label={"Code"} inpuValue={qrCode} disabled={true} />
        <SelectForm blokNumber={blokNumber} />
        <InputFormBySearch
          label={"nama pemilih"}
          qrCode={qrCode}
          data={data}
          blokNumber={blokNumber}
        />
      </div>
    </div>
  );
}
