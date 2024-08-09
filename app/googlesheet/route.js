import { NextResponse } from "next/server";
import { googleSheet } from "../helpers/googleSheet";

export async function POST(request, context) {
  // Menampilkan data di console
  const data = await request.json();
  const { No, blokNumber, qrCode } = data;

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

  const rowId = No - 1;
  rows[rowId].get("Nama");
  rows[rowId].set("Token", qrCode);
  await rows[rowId].save();

  return NextResponse.json({ message: "dawdaw" });
}
