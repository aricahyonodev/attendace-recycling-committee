import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

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
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, jwt);

  await doc.loadInfo();
  return doc;
}

export { googleSheet };
