import { NextResponse } from "next/server";
import { googleSheet } from "../helpers/googleSheet";

export async function GET(request) {

   const doc = await googleSheet(); // loads document properties and worksheets
   const sheetName = doc.sheetsByIndex
     .filter((dt) =>
       dt.a1SheetName.toLocaleLowerCase().includes(`blok ${9}`)
     )
     .map((dt) => dt.a1SheetName.replace(/^'(.*)'$/, "$1"));

   const sheet = doc.sheetsByTitle[sheetName[0]];
   const rows = await sheet.getRows();
   const list = rows.map((row) => ({
     No: row.get("No"),
     Nama: row.get("Nama"),
   }));

  return NextResponse.json(list);
}
