import SearchComponent from "./searchComponent";

async function allData(params) {
   
}

export default async function Form(second) {

  let data;

   try {
    const revalidatedData = await fetch(`http://localhost:3000/googlesheet`, {
    });
    data =  await revalidatedData.json();
  } catch (error) {
    console.log(error);
  }

  return (
    <SearchComponent data={data} />
  );
}
