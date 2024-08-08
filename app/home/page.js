"use client";
import axios from "axios";
import QRCodeScanner from "../scan-computer/page";
import { useEffect, useState } from "react";
import { MdQrCode2 } from "react-icons/md";

export default function Home(params) {
  const [isActive, setIsActive] = useState(false);
  // const [code, setCode] = useState("JKFSSGM");
  const [code, setCode] = useState("");
  const [voter, setVoter] = useState([]);
  const [listJemaat, setListJemaat] = useState([]);

  useEffect(() => {
    const isiData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/googlesheet");
        console.log("kamu jalan berapa kali");
   setListJemaat(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    isiData()
    return () => {
    }
  }, [])
  

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

  const InputFormBySearch =  ({ label}) => {
    const [value, setValue] = useState("");
    const [list, setList] = useState([]);
    const [list2, setList2] = useState(listJemaat);
    const [isDisable, setIsDisable] = useState(false)

    const onChange = (e) => {
      const value = e.target.value;
      setValue(value);
      const listJemaat2 = list2.filter((dt) =>
        dt.Nama.toLowerCase().includes(value)
      );
      setList(listJemaat2);
      console.log(listJemaat2);
      
    };

    const onClick = async (data) => {
       setValue(data.Nama);
      console.log(data.Nama);
      setIsDisable(!isDisable)
      
      setList([]);
      // setVoter(data);
    };

    return (
      <div className="mt-5 relative">
        <label className="uppercase mb-1 block font-medium">{label} </label>
        <input
          type="text"
          value={value}
          className={`border-b-2 p-2 rounded-md w-full capitalize ${isDisable && "cursor-not-allowed"}
          }`}
          onChange={onChange}
          disabled={isDisable}
        />
        <div className="absolute top-[70px] w-full right-0">
            {list.map((ls) => (
              <div
                onClick={() => onClick(ls)}
                className="bg-white border-2 p-2 cursor-pointer hover:bg-green-200"
                key={ls.Nama}
              >
                <div>
                  <p>{ls.Nama}</p>
                </div>
              </div>
            ))}
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
          defaultValue={blokNumberActive}
        >
          {numberBlokList.map((number) => (
            <option
              value={number}
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
    <div className="flex justify-center text-center items-center">
      <div className="w-1/2">
        {!code && (
          <button onClick={buttonClik} className="p-6 bg-red-300 text-center">
            {!isActive && <MdQrCode2 size={"6em"} className="inline-block" />}
            <p> {isActive ? "Matikan Camera" : "Scan Barcode"}</p>
          </button>
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
