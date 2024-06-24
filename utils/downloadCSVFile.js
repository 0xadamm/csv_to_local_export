const axios = require("axios");

const downloadCSVFile = async (url) => {
  try {
    const file_stream = await axios({
      url: url,
      method: "GET",
      responseType: "stream",
    });

    return file_stream;
  } catch (error) {
    throw new Error("Failed to download CSV file: " + error.message);
  }
};

module.exports = downloadCSVFile;
