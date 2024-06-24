const { createGunzip } = require("zlib");
const csv = require("csv-parser");
require("dotenv").config();

async function processData(file_stream) {
  const allData = [];
  const jsonRows = [];
  const paid = [];
  const emailList = {};

  return new Promise((resolve, reject) => {
    file_stream
      .pipe(createGunzip()) // Decompress the gzipped data
      .pipe(csv())
      .on("data", (data) => {
        if (data.tags !== "{}") {
          let tags = JSON.parse(data.tags);
          const { email, ...rest } = tags;
          if (!emailList[email]) {
            emailList[email] = true;
            allData.push(data);
            jsonRows.push({ email, ...rest });
            if (parseFloat(data.amount_spent) > 0) {
              paid.push({ email, ...rest });
            }
          }
        }
      })
      .on("end", async () => {
        console.log("CSV parsing completed.");
        let dataset = allData.sort((a, b) => {
          return parseInt(b.playtime) - parseInt(a.playtime);
        });
        let datasetwithphone = [],
          datasetwithoutphone = [];
        dataset.forEach((data) => {
          const tags = JSON.parse(data.tags);
          if (tags.hasOwnProperty("phone")) {
            datasetwithphone.push({ ...tags, SMS: tags.phone });
          } else {
            datasetwithoutphone.push(tags);
          }
        });

        resolve({
          all: jsonRows,
          paid,
          withphoneno: datasetwithphone.slice(0, 200),
          withoutphone: datasetwithoutphone.slice(0, 200),
        });
      })
      .on("error", (error) => {
        reject(error); // Reject the promise if there's an error during streaming
      });
  });
}

module.exports = processData;
