require("dotenv").config();
const { parse } = require("json2csv");
const fs = require("fs");

// Import Contacts
async function importContacts(jsonBody, outputFileName = "output.csv") {
  if (jsonBody.length > 0) {
    const fields = Object.keys(jsonBody[0]);
    const csv = parse(jsonBody, { fields });

    // Write CSV data to a file
    fs.writeFileSync(outputFileName, csv, "utf-8");
    console.log("CSV file generated successfully.");
  }
}

module.exports = importContacts;
