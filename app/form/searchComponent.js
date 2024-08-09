'use client'
import { useState } from "react";

export default function SearchComponent({data}) {

    const [search, setSearch] = useState("")
    const [isDisable, setIsDisable] = useState(false);

    const filterUser = data.filter((dt) =>
      dt.Nama.toLowerCase().includes(search.toLowerCase())
    );

    const handleClick = (dt) => {
        setSearch(dt.Nama)
        setIsDisable(true);
    }

    return (
      <div className="mt-5 relative">
        <label className="uppercase mb-1 block font-medium">Hello </label>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className={`border-b-2 p-2 rounded-md w-full capitalize `}
        />
        <div className="absolute top-[70px] w-full right-0">
          {(search && !isDisable) &&
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
    );
}