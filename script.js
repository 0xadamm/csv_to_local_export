const delay = require("./utils/delay");
const downloadCSVFile = require("./utils/downloadCSVFile");
const getCSVDownloadLink = require("./utils/getCSVDownloadLink");
const importContacts = require("./utils/json2csv");
const processData = require("./utils/processData");

const main = async () => {
	try {
		const downloadLink = await getCSVDownloadLink();
		// immediately the download url does not work it requires some time to wait.

		await delay(2000);

		const file_stream = await downloadCSVFile(downloadLink);
		console.log(downloadLink);
		const result = await processData(file_stream.data);

		importContacts(result.all, "./outputs/all.csv");
		importContacts(result.paid, "./outputs/paid.csv");
		importContacts(result.withphoneno, "./outputs/withphone.csv");
		importContacts(
			result.withoutphone,
			"./outputs/withoutphone.csv"
		);
	} catch (error) {
		console.log(error);
	}
};

main();
