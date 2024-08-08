"use client";
import { list } from "postcss";
import QRCodeScanner from "../scan-computer/page";
import { useState } from "react";
import { MdQrCode2 } from "react-icons/md";

const jemaat = [
  {
    id: 1,
    nama: "ari cahyono",
  },
  {
    id: 2,
    nama: "endang ariantini",
  },
  {
    id: 3,
    nama: "yusuf sariyono",
  },
];
export default function Home(params) {
  const [isActive, setIsActive] = useState(false);
  // const [code, setCode] = useState("JKFSSGM");
  const [code, setCode] = useState("");
  const [voter, setVoter] = useState([]);

  const buttonClik = () => {
    setIsActive(isActive ? false : true);
  };

  const getCodeScan = (code) => {
    setCode(code);
  };

  function hurufKeAngka(huruf) {
    huruf = huruf.toUpperCase(); // Mengubah huruf menjadi huruf besar

    return huruf.charCodeAt(0) - "A".charCodeAt(0);
  }

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
          // readOnly
          disabled={disabled}
        />
      </div>
    );
  };
  const InputFormBySearch = ({ label, disabled = false }) => {
    const [value, setValue] = useState("");
    const [list, setList] = useState([]);

    const onChange = (e) => {
      const value = e.target.value;
      setValue(value);
      const listJemaat = jemaat.filter((dt) =>
        dt.nama.toLowerCase().includes(value)
      );
      setList(listJemaat);
    };

    const onClick = (data) => {
      setValue(data.nama);
      setVoter(data);
      setList([]);
    };

    return (
      <div className="mt-5 relative">
        <label className="uppercase mb-1 block font-medium">{label} </label>
        <input
          type="text"
          value={value}
          className={`border-2 p-2 rounded-md w-full capitalize ${
            disabled && " cursor-not-allowed"
          }`}
          disabled={disabled}
          onChange={onChange}
        />
        <div className="absolute top-[70px] w-full right-0">
          <ul>
            {list.map((ls) => (
              <li
                onClick={() => onClick(ls)}
                className="bg-white border-2 p-2 cursor-pointer hover:bg-green-200"
                key={ls.nama}
              >
                {ls.nama}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  const SelectForm = ({ disabled = false }) => {
    const numberBlokList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const blokNumberActive = hurufKeAngka(code[0]);
    return (
      <div className="mt-4">
        <select
          name="cars"
          id="cars"
          className="border-2 p-2 rounded-md w-full uppercase"
        >
          {numberBlokList.map((number) => (
            <option
              value={number}
              selected={blokNumberActive === number}
              key={`blok ${number}`}
              className="p-2"
            >
              blok {number}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const blok = hurufKeAngka(code && code[0]);

  return (
    <div className="flex justify-center items-center text-center ">
      <div className="w-1/2">
        {!code && (
          <div className="flex justify-center">
            <button
              onClick={buttonClik}
              className="p-6 flex flex-col items-center bg-red-100 font-medium"
            >
              {!isActive && <MdQrCode2 size={"6em"} />}
              {isActive ? "Matikan Camera" : "Scan Barcode"}
            </button>
          </div>
        )}
        {isActive && <QRCodeScanner getCodeScan={getCodeScan} />}

        {code && (
          <div className="flex justify-center">
            <div className="bg-white border-2 w-1/2 shadow-md rounded-md pt-14 text-start px-6 ">
              <h1 className="uppercase text-2xl font-semibold text-center mb-7">
                form a
              </h1>

              <InputForm label={"Code"} inpuValue={code} disabled={true} />
              <SelectForm label={"blok"} />
              <InputFormBySearch label={"nama pemilih"} inpuValue={blok} />
              <div className="flex-col justify-center mt-8 mb-10">
                <button
                  onClick={() => console.log(voter)}
                  className="bg-green-500 font-medium p-2 w-full rounded-md"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
