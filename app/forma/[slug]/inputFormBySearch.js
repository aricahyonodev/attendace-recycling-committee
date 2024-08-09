"use client";
import { useState } from "react";

function InputFormBySearch({ data, label, blokNumber, qrCode }) {
  const [search, setSearch] = useState("");
  const [pemilih, setPemilih] = useState("");
  const [isDisable, setIsDisable] = useState(false);

  const filterUser = data?.filter((dt) =>
    dt.Nama.toLowerCase().includes(search.toLowerCase())
  );

  const handleClick = (dt) => {
    setSearch(dt.Nama);
    setPemilih({ ...dt, blokNumber,qrCode });
    setIsDisable(true);
  };

  const HandleClickSubmit = async () => {
    // Fungsi untuk melakukan POST request
    const response = await fetch("http://localhost:3000/googlesheet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pemilih),
    });
    console.log(await response.json());
  };

  return (
    <>
      <div className="mt-5 relative">
        <label className="uppercase mb-1 block font-medium">{label} </label>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          disabled={isDisable}
          className={`border-b-2 p-2 rounded-md w-full capitalize `}
        />
        <div className="absolute top-[70px] w-full right-0">
          {search &&
            !isDisable &&
            filterUser.slice(0, 5).map((ls) => (
              <div
                className="bg-white border-2 p-2 cursor-pointer hover:bg-green-200"
                key={ls.Nama}
                onClick={() => handleClick(ls)}
              >
                <div>
                  <p>{ls.Nama}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="flex-col justify-center mt-8 mb-10">
        <button
          onClick={HandleClickSubmit}
          className="bg-green-500 font-medium p-2 w-full rounded-md"
        >
          Submit
        </button>
      </div>
    </>
  );
}

export { InputFormBySearch };
