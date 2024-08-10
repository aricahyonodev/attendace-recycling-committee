import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { promises as fs } from "fs";

async function googleSheet(params) {
  const SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
  ];

  const jwt = new JWT({
    email: process.env.GOOGLE_SERVICE_EMAIL,
    key: process.env.GOOGLE_KEY.replace(/\\n/g, "\n"),
    scopes: SCOPES,
  });
  const file = await fs.readFile(process.cwd() + "/app/data.json", "utf8");
  const data = JSON.parse(file);
  const doc = new GoogleSpreadsheet(data.googleSheetId, jwt);
  
  await doc.loadInfo();
  return doc
}

export { googleSheet };


