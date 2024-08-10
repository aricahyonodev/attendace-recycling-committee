"use server";

import { googleSheet } from "@/helpers/googleSheet";

 async function getData() {
  const doc = await googleSheet(); // loads document properties and worksheets
  const sheetList = doc.sheetsByIndex
    .filter((dt) => dt.a1SheetName.includes("Blok"))
    .map((dt) => dt.a1SheetName.replace(/^'(.*)'$/, "$1"));
  const sheet = doc.sheetsByTitle[sheetList[8]];
  const rows = await sheet.getRows();
  const namesAndNumbers = rows.map((row) => ({
    No: row.get("No"), // Adjust 'number' to your actual column name
    Nama: row.get("Nama"), // Adjust 'name' to your actual column name
  }));

  return {
    title: doc.title,
  };
}

async function getCongregationList(blokNumber) {
  const doc = await googleSheet(); // loads document properties and worksheets
  const sheetName = doc.sheetsByIndex
    .filter((dt) => dt.a1SheetName.toLocaleLowerCase().includes(`blok ${blokNumber}` ))
    .map((dt) => dt.a1SheetName.replace(/^'(.*)'$/, "$1"));

  const sheet = doc.sheetsByTitle[sheetName[0]];
  const rows = await sheet.getRows();
  const list = rows.map((row) => ({
    No: row.get("No"), 
    Nama: row.get("Nama"), 
  }));

  return list;
}

export { getData, getCongregationList };