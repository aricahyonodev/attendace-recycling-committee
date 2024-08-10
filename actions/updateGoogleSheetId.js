 'use server'

import { redirect } from "next/navigation";
import { promises as fs } from "fs";
 const updateGoogleSheetId = async (formData) => {
  
    try {
      // 1. Membaca file JSON
      const filePath = process.cwd() + "/app/data.json";
      const file = await fs.readFile(filePath, "utf8");
      const data = JSON.parse(file); // Mengurai JSON

      // 2. Mengubah nilai googleSheetId
      data.googleSheetId = formData.get("google_sheet_id");

      // 3. Mengubah data menjadi string JSON dan menulis ke file
      const jsonString = JSON.stringify(data, null, 2); // Format JSON dengan indentasi
      await fs.writeFile(filePath, jsonString, "utf8"); // Menulis ke file
      console.log("File has been updated successfully");
    } catch (error) {
      console.error("Failed to update file:", error);
    }

    redirect("/dashboard")
};


export { updateGoogleSheetId };
