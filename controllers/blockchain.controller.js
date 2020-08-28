const DocumentContract = require("../abis/DocumentContract.json");
const fs = require("fs");
const Web3 = require("web3");
var Tx = require("ethereumjs-tx");
const config = require("../config/config");

const infuraKey = config.keys.infura_project_id;
const deployer = config.accounts.deployer;
const privateKey = Buffer.from(config.keys.account_pvt_key, "hex");

// Infura Setup
const web3 = new Web3(
	new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/" + infuraKey)
);

web3.eth.net
	.isListening()
	.then(() => console.log("Web3 is connected"))
	.catch((e) => console.log("Wow. Something went wrong"));

async function getNetworkId() {
	return await web3.eth.net.getId();
}

async function setUpContract() {
	await web3.eth.net.getId().then((networkId) => {
		networkData = DocumentContract.networks[networkId];
		console.log("address : ", networkData.address);

		console.log("Setting up contract...");
		if (networkData) {
			documentContract = new web3.eth.Contract(
				DocumentContract.abi,
				networkData.address
			);
			console.log("Set up successfully!");
		}else{
			console.log("Something went wrong! Could not set up blockchain contract!");
		}
	});
}

async function getDocCount() {
	return await documentContract.methods.docCount().call();
}

async function addDoc(user, doctor, type, link) {
	web3.eth.getTransactionCount(deployer, async (err, txCount) => {
		try {
			const txObject = {
				nonce: web3.utils.toHex(txCount),
				gasLimit: web3.utils.toHex(800000), // Raise the gas limit to a much higher amount
				gasPrice: web3.utils.toHex(web3.utils.toWei("20", "gwei")),
				to: networkData.address,
				data: documentContract.methods
					.addDocument(user, doctor, type, link)
					.encodeABI(),
			};

			const tx = new Tx.Transaction(txObject, { chain: "ropsten" });
			tx.sign(privateKey);

			const serializedTx = tx.serialize();
			const raw = "0x" + serializedTx.toString("hex");

			await web3.eth.sendSignedTransaction(raw).then((hash, e) => {
				console.log("reciept: ", hash);
			});
		} catch (e) {
			console.log(e);
		}
	});
}

async function getDoc(id) {
	const doc =  await documentContract.methods.docList(id).call();
	return {
		id: doc.id,
		user: doc.user,
		doctor: doc.doctor,
		docType: doc.docType,
		link: doc.link
	}
}

async function getUserDocs(user){
	var count = 0
	var docs = []
	var docCount = await getDocCount()
	for(var i = 1; i <= docCount; i++){
		const doc = await getDoc(i)
		// console.log("DOC" + i, doc)
		if(doc.user == user && doc.docType == "R"){
			docs[count] = doc
			count++	
		}
	}
	return docs
}

async function getUserPrescriptions(user){
	var count = 0
	var docs = []
	var docCount = await getDocCount()
	for(var i = 1; i <= docCount; i++){
		const doc = await getDoc(i)
		// console.log("DOC" + i, doc)
		if(doc.user == user && doc.docType == "P"){
			docs[count] = doc
			count++	
		}
	}
	return docs
}

async function getDoctorPrescriptions(user){
	var count = 0
	var docs = []
	var docCount = await getDocCount()
	for(var i = 1; i <= docCount; i++){
		const doc = await getDoc(i)
		// console.log("DOC" + i, doc)
		if(doc.doctor == user && doc.docType == "P"){
			docs[count] = doc
			count++	
		}
	}
	return docs
}

async function run() {
	// await setUpContract();
	// console.log("Network id: ", await getNetworkId());
	// console.log("Count is: ", await getDocCount());
	// await addDoc("1", "2", "P", "this.link.com");
	console.log("1: ", await getDoc(1))
	// console.log("userDocs: ", await getUserDocs(1))
}

run();

module.exports = {
	getNetworkId,
	setUpContract,
	getDocCount,
	addDoc,
	getUserDocs,
	getDoc,
	getUserPrescriptions,
	getDoctorPrescriptions
}