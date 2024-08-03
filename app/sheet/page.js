import { getData } from "../actions/sheet/loadSheet";

const initialState = {
  message: "",
};

export default async function Home() {
  const take = await getData();
  console.log(take);
//   console.log('take');
  return (
    <div>hello in sheet!
    </div>
  );
}
