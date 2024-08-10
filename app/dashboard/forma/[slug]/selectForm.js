const SelectForm = ({  blokNumber }) => {
  const numberBlokList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return (
    <div className="mt-4">
      <select
        name="cars"
        id="cars"
        className="border-b-2  p-2  w-full uppercase"
        defaultValue={blokNumber}
      >
        {numberBlokList.map((blok) => (
          <option value={blok} key={`blok ${blok}`} className="p-2">
            blok {blok}
          </option>
        ))}
      </select>
    </div>
  );
};


export {SelectForm}