var config = require("../config/config");
var db = require("../db/models/db");
const blockchain = require("./blockchain.controller")

module.exports.getDoc = async (req, res) => {
	try {
        const document = req.document;
        const record = await blockchain.getDoc(document.record_id);
        document.details = record;
		res.status(200).json({
			success: true,
			document: document,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: "Internal server error",
			details: e.message,
		});
	}
};

