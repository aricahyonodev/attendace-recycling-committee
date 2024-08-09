'use client'

import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const InputForm = ({ label, inpuValue, disabled = false }) => {
  return (
    <div className="mt-5">
      <label className="uppercase mb-1 block font-medium">{label} </label>
      <input
        type="text"
        value={inpuValue}
        className={`border-2 p-2 rounded-md w-full ${
          disabled && " cursor-not-allowed"
        }`}
        readOnly
        disabled={disabled}
      />
    </div>
  );
};


function hurufKeAngka(huruf) {
  huruf = huruf.toUpperCase(); // Mengubah huruf menjadi huruf besar

  return huruf.charCodeAt(0) - "A".charCodeAt(0);
}


export default function FormA({ params }) {
  const qrCode = params.slug;

  const blokNumber = hurufKeAngka(qrCode[0])

  const [state, setState] = useState({
    value: qrCode,
    copied: false,
  }); 


  return (
    <div className="flex justify-center">
      <div className="bg-white border-2 sm:w-screen lg:w-1/4 shadow-md rounded-md pt-14 text-start px-6 ">
        <h1 className="uppercase text-2xl font-semibold text-center mb-7">
          form a
        </h1>

        <InputForm label={"Blok"} inpuValue={blokNumber} disabled={true} />
        <InputForm label={"Code"} inpuValue={qrCode} disabled={true} />
        <CopyToClipboard
          text={state.value}
          onCopy={() => setState({ ...state, copied: true })}
        >
          <button
            className={`p-2 bg-green-400 w-full mt-8 text-white rounded-md ${
              state.copied ? "bg-slate-600 " : "bg-green-600"
            }`}
          >
            Copy QRCODE
          </button>
        </CopyToClipboard>

        <div className="pb-12" />
      </div>
    </div>
  );
}
