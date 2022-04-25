//const stocks = require('./stocks'); // true
const people = require('./people');
const stocks = require('./stocks');
/*getPersonById*/
// const getPersonById = async () => {
// 	try {
// 		console.log(
// 			await people.getPersonById('20035a09-3820-4f49-bb8f-d947cebee537')
// 			//await people.getPersonById('20035a09-3820-4f49-bb8f-d947cebee537')
// 			//await people.getPersonById(1)
// 		);
// 	} catch (e) {
// 		console.log(e);
// 	}
// };
// getPersonById();

/* sameEmail*/
// const sameEmail = async () => {
// 	try {
// 		let peopleArray = await people.sameEmail('harvard.edu');
// 		//	console.log(`length is ${peopleArray.length}`);
// 		console.log(peopleArray);
// 	} catch (e) {
// 		console.log(e);
// 	}
// };

// sameEmail();

/*manipulateIp() */
const manipulateIp = async () => {
	try {
		console.log(
			await people.manipulateIp()
			//await people.getPersonById('20035a09-3820-4f49-bb8f-d947cebee537')
			//await people.getPersonById(1)
		);
	} catch (e) {
		console.log(e);
	}
};
manipulateIp();

/*sameBirthday */
// const sameBirthday = async () => {
// 	try {
// 		console.log(await people.sameBirthday(12, 12));
// 	} catch (e) {
// 		console.log(e);
// 	}
// };
// sameBirthday();

/* STOCKS */
//listShareholders
// const listShareholders = async () => {
// 	try {
// 		console.log(await stocks.listShareholders());
// 	} catch (e) {
// 		console.log(e);
// 	}
// };
// listShareholders();

//totalShare
// const totalShares = async () => {
// 	try {
// 		console.log(await stocks.totalShares('Aeglea BioTherapeutics, Inc.'));
// 	} catch (e) {
// 		console.log(e);
// 	}
// };
// totalShares();

//listStocks
// const listStocks = async () => {
// 	try {
// 		console.log(await stocks.listStocks(null, null));
// 	} catch (e) {
// 		console.log(e);
// 	}
// };
// listStocks();

//getStockById
// const getStockById = async () => {
// 	try {
// 		console.log(
// 			await stocks.getStockById('7989fa5e-5617-43f7-a931-46036f9dbcff')
// 		);
// 	} catch (e) {
// 		console.log(e);
// 	}
// };
// getStockById();
