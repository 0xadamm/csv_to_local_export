const axios = require("axios");
require("dotenv").config();

async function getCSVDownloadLink() {
  console.log("Getting CSV File Link");
  const apiUrl = process.env.APP_URL;
  const apiKey = process.env.AUTHORIZARTION_KEY;

  try {
    const response = await axios({
      url: apiUrl,
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: apiKey,
        "content-type": "application/json",
      },
    });
    return response.data.csv_file_url;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch download link: " + error.message);
  }
}

module.exports = getCSVDownloadLink;
