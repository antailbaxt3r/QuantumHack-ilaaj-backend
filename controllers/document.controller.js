var config = require("../config/config");
var db = require("../db/models/db");
const blockchain = require("./blockchain.controller")

module.exports.getDoc = async (req, res) => {
	try {
        const document = req.document;
        await blockchain.getDoc(document.record_id).then((record) => document.details = record);
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

module.exports.getUserDocuments = async (req, res) => {
	try{
		const userId = req.user.id
		const docs = await db.models.documents.findAll({
			where: { userId: userId }
		})
		docs.forEach(async (doc) => {
			doc.details = await blockchain.getDoc(doc.record_id)
		})
		res.status(200).json({
			success: true,
			documents: documents,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: "Internal server error",
			details: e.message,
		});
	}
}

module.exports.getDoctorPrescriptions = async (req, res) => {
	try{
		const doctorId = req.body.doctorId
		const docs = await blockchain.getDoctorPrescriptions(doctorId)
		const result = []
		docs.forEach(async (doc) => {
			const pres = await db.models.documents.findOne({ where: { record_id: doc.id } })
			pres.details = doc
			result.push(pres)
		})
		res.status(200).json({
			success: true,
			documents: result,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: "Internal server error",
			details: e.message,
		});
	}
}