'use server'

import { googleSheet } from "@/app/helpers/googleSheet";
import { redirect } from "next/navigation";

export default async function testClient(formData) {
  const noPemilih = formData.get('no_pemilih');
  const blokNumber =  formData.get('blok_number');
  const qrCode =  formData.get('qrcode');

  const doc = await googleSheet(); // loads document properties and worksheets
  // isi nama sheet bloknya
  const sheetName = doc.sheetsByIndex
    .filter((dt) =>
      dt.a1SheetName
        .toLocaleLowerCase()
        .includes(`blok ${blokNumber}`.toLocaleLowerCase())
    )
    .map((dt) => dt.a1SheetName.replace(/^'(.*)'$/, "$1"));

  const sheet = doc.sheetsByTitle[sheetName[0]];
  const rows = await sheet.getRows();

  const rowId = noPemilih - 1;
  rows[rowId].get("Nama");
  rows[rowId].set("Token", qrCode);
  await rows[rowId].save();
  redirect("/home"); 
}