
import { updateGoogleSheetId } from "@/actions/updateGoogleSheetId";


const InputForm = ({ label, inpuValue }) => {
  return (
    <div className="mt-5">
      <label className="uppercase mb-1 block font-medium">{label} </label>
      <input
        type="text"
        name="google_sheet_id"
        value={inpuValue}
        className={`border-2 p-2 rounded-md w-full `}
      />
    </div>
  );
};


export default function FormA({ params }) {
  

  return (
    <div className="flex justify-center mt-32">
      <div className="bg-white border-2 sm:w-screen lg:w-1/4 shadow-md rounded-md pt-14 text-start px-6 ">
        <form action={updateGoogleSheetId}>
          <InputForm label={"Google Sheet ID"} />
          <button
            type="submit"
            className="mt-4 bg-green-500 font-medium p-2 w-full cursor-pointer uppercase text-white rounded-md"
          >
            Submit
          </button>
        </form>
        <div className="pb-12" />
      </div>
    </div>
  );
}
