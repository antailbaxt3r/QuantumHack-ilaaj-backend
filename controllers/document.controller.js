var config = require("../config/config");
var db = require("../db/models/db");
const blockchain = require("./blockchain.controller")

module.exports.getDoc = async (req, res) => {
	try {
        const document = req.document;
		await blockchain.getDoc(document.record_id).then((record) => {
			document.details = JSON.parse(record.toString())
			res.status(200).json({
				success: true,	
				document: document,
			});
		})
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
		const a = async () => {
			for(const doc of docs){
				await blockchain.getDoc(doc.record_id).then((record) => {
					console.log(record)
					doc.details = JSON.parse(record.toString())
				})
			}
			res.status(200).json({
				success: true,
				documents: docs,
			});
		}
		a()
		
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
		const doctorId = req.header.doctorId
		const d = await blockchain.getDoctorPrescriptions(doctorId)
		console.log(d)
		const docs = JSON.parse(d.toString())
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

module.exports.addDocument = async (req, res) => {
	try {
		const user = req.user.id;
		const doctor = req.body.doctor;
		const type = req.body.type;
		const link = req.body.link;
		const newDoc = {
			record_id: await blockchain.getDocCount(),
			name: req.body.name,
			userId: req.user.id
		}
		await blockchain.addDoc(user, doctor, type, link).then(async () => {
			await db.models.documents.create(newDoc).then((result) => {
				res.status(200).json({
					success: true,
					document: result,
					message: "Document Added Successfully!"
				});
			})
		}).catch((e) => {
			console.log(e);
			res.status(500).json({
				success: false,
				message: "Internal server error",
				details: e.message,
			});
		})
		
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: "Internal server error",
			details: e.message,
		});
	}
}

module.exports.delete = async (req, res) => {
	try {
		const document = req.document;
		db.models.documents.destroy({ where: { id: document.id } }).then(() =>{
			res.status(200).json({
				success: true,
				message: "Document Deleted Successfully!"
			});
		}).catch((e) => {
			console.log(e);
			res.status(500).json({
				success: false,
				message: "Internal server error",
				details: e.message,
			});
		})
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: "Internal server error",
			details: e.message,
		});
	}
}

module.exports.bcDoc = async (req, res) => {
	try{
		await blockchain.getDoc(req.header.id) //send record_id here to
		.then((record) => {
			const r = JSON.parse(record.toString())
			res.status(200).json({
				success: true,
				details: r
			});
		}) 
		.catch((e) => {
			console.log(e);
			res.status(500).json({
				success: false,
				message: "Internal server error",
				details: e.message,
			});
		})
	}  catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: "Internal server error",
			details: e.message,
		});
	}
}