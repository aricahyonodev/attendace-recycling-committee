"use server";

import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

export async function getData() {


 const doc = new GoogleSpreadsheet(
   "1dltIE2oor04xnF0vvXQu-Mo1tv2D2NAalFOtsyCqqD4",
   { apiKey: process.env.GOOGLE_API_KEY }
 );

 await doc.loadInfo(); // loads document properties and worksheets
 const sheet = doc.sheetsByIndex[0];
 const sheet1 = doc.sheetsByIndex[1];
 const row = await sheet.getRows();
//  console.log(sheet.title);
//  console.log(sheet1.title);
await sheet.loadCells();
//  console.log(sheet.getCell(5, 1));
const a1 = sheet.getCell(3, 2); // access cells using a zero-based index
const c6 = sheet.getCellByA1("C4"); // or A1 style notation
// access everything about the cell
// console.log(a1.value);
 const list = row
   .map((row) => row.get("Nama")) // Asumsi "Nama" adalah nama kolom
   .filter((name) => name.includes("ono"));
console.log(list);
console.log(row[4].rowNumber);
console.log(row[4].get("Nama"));
// console.log(row[1].get("Nama"));
// console.log(row[1].get("Blok"));
// console.log(row[1].get("No"));
  return {
    title: doc.title,
    // rows : row
  };
}
