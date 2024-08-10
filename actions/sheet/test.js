"use server";

import { googleSheet } from "@/helpers/googleSheet";
import { redirect } from "next/navigation";

const nameToUrl = (str) => {
  let words = str.split(" ").slice(0, 2).join(" ");

  // Ganti spasi dengan tanda hubung
  let formatted = words.replace(/ /g, "-");
  return formatted;
};

export default async function testClient(formData) {
  const noPemilih = formData.get("no_pemilih");
  const blokNumber = formData.get("blok_number");
  const qrCode = formData.get("qrcode");
  let  name;
  try {
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
    name = rows[rowId].get("Nama");

    const token = rows[rowId].get("Token");
    if(token){
      throw new Error("has done the attendance");
    }

    rows[rowId].set("Token", qrCode);
    await rows[rowId].save();
  } catch (error) {
    console.log(error.message);
    if (error.message === "has done the attendance") {
      redirect(`/dashboard/forma/${nameToUrl(name)}/already`);
    }
      redirect(`/dashboard/forma/failed`);
  }
  redirect(
    `/dashboard/forma/${nameToUrl(name)}/success`
  );
}

export const first = async() => {
  try {
  // 1. Membaca file JSON
  const filePath = process.cwd() + "/app/data.json";
  const file = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(file); // Mengurai JSON

  // 2. Mengubah nilai googleSheetId
  data.googleSheetId = formdata.get(google_sheet_id);

  // 3. Mengubah data menjadi string JSON dan menulis ke file
  const jsonString = JSON.stringify(data, null, 2); // Format JSON dengan indentasi
  await fs.writeFile(filePath, jsonString, "utf8"); // Menulis ke file
  console.log("File has been updated successfully");
} catch (error) {
  console.error("Failed to update file:", error);
}
}