const connection = require('./config/mongoConnection');
const bands = require('./data/bands');
//const { ObjectId } = require('mongodb');

const main = async () => {
	const db = await connection.connectToDb();
	await db.dropDatabase();

	// insert a band
	// try {
	// 	const pinkFloyd = await bands.create(
	// 		'Pinky Floyd',
	// 		['Progressive Rock', 'Psychedelic rock', 'Classic Rock'],
	// 		'http://www.pinkfloyd.com',
	// 		'EMI',
	// 		[
	// 			'Roger Waters',
	// 			'David Gilmour',
	// 			'Nick Mason',
	// 			'Richard Wright',
	// 			'Sid Barret',
	// 		],
	// 		1965
	// 	);
	// 	console.log(pinkFloyd);
	// } catch (e) {
	// 	console.log(e);
	// }

	// get all bands

	// try {
	// 	const allBands = await bands.getAll();
	// 	console.log(allBands);
	// } catch (e) {
	// 	console.log(e);
	// }

	// get a particular band based on id

	// try {
	// 	const bandDetail = await bands.get('6208a231edee75af2dae45ab');
	// 	console.log(bandDetail);
	// } catch (e) {
	// 	console.log(e);
	// }

	// remove using id
	// try {
	// 	const removeBeatles = await bands.remove('6208a231edee75af2dae45ab');
	// 	console.log(removeBeatles);
	// } catch (e) {
	// 	console.log(e);
	// }

	//rename band
	// const renamedBeatles = await bands.rename(
	// 	'6208a2360dd2dfbcd47766cf',
	// 	'Deep Manek'
	// );
	// console.log(renamedBeatles);

	// await connection.closeConnection();
	//	console.log('Done!');

	/* Assignment Starts now */
	let sanam = undefined;
	let hansZimmer = undefined;
	try {
		sanam = await bands.create(
			'Sanam',
			['Old Bollywood', '90s Music', 'Classical'],
			'http://www.sanam.com',
			'Tseries',
			[
				'sanam Puri',
				'AR Rahman',
				'Lata Mangeshkar',
				'sonu Nigam',
				'Ankit Tiwari',
			],
			1963
		);
		console.log(sanam);
	} catch (e) {
		console.log(e);
	}

	try {
		hansZimmer = await bands.create(
			'Hans Zimmer',
			['Instrumental', 'Background Music'],
			'http://www.hanszimmer.com',
			'Pewdiepie',
			['Tanmay Bhatt', 'Samay Raina', 'Rohan Joshi', 'Ajey Nagar'],
			1960
		);
		//console.log(hansZimmer);
	} catch (e) {
		console.log(e);
	}

	try {
		const allBands = await bands.getAll();
		console.log(allBands);
	} catch (e) {
		console.log(e);
	}
	let narutoUzumaki = undefined;
	try {
		narutoUzumaki = await bands.create(
			'Naruto Uzumaki',
			['Japanese', 'Anime Music'],
			'http://www.konaha.com',
			'Jiraiya',
			['Kakashi Hatake', 'Sasuke Uchiha', 'Sakura Haruno', 'Naruto Uzumaki'],
			1959
		);
		console.log(narutoUzumaki);
	} catch (e) {
		console.log(e);
	}

	// try {
	// 	const renamedSanam = await bands.rename(
	// 		sanam._id.toString(),
	// 		'Sanam Reloaded'
	// 	);
	// 	console.log(renamedSanam);
	// } catch (e) {
	// 	console.log(e);
	// }

	try {
		const removeHanszimmer = await bands.remove(hansZimmer._id);
		console.log(removeHanszimmer);
	} catch (e) {
		console.log(e);
	}

	// try {
	// 	const allBands = await bands.getAll();
	// 	console.log(allBands);
	// } catch (e) {
	// 	console.log(e);
	// }

	//bad input parameter

	// try {
	// 	const pinkFloyd = await bands.create(
	// 		'Pinky Floyd',
	// 		['Progressive Rock', 'Psychedelic rock', 'Classic Rock'],
	// 		'http://www.poyd.com',
	// 		'EMI',
	// 		[
	// 			'Roger Waters',
	// 			'David Gilmour',
	// 			'Nick Mason',
	// 			'Richard Wright',
	// 			'Sid Barret',
	// 		],
	// 		1965
	// 	);
	// 	console.log(pinkFloyd);
	// } catch (e) {
	// 	console.log(e);
	// }

	//removing band that doesnt exist
	// try {
	// 	const removeBeatlesColdPlay = await bands.remove(
	// 		'6201a231edee75af2dae45ac'
	// 	);
	// 	console.log(removeBeatlesColdPlay);
	// } catch (e) {
	// 	console.log(e);
	// }

	//rename band that doesnt exist

	try {
		const renameColdPlay = await bands.rename('fakeid', 'Cold Play Reloaded');
		console.log('Rename happened');
		console.log(renameColdPlay);
	} catch (e) {
		console.log('Rename happened');
		console.log(e);
	}
	//rename band that doesnt exist

	try {
		const renamedSanam = await bands.rename(
			sanam._id.toString(),
			'Sanam Reloaded'
		);
		console.log(renamedSanam);
	} catch (e) {
		console.log(e);
	}

	//get band whose id doesnt exist
	try {
		const bandDetail = await bands.get('6201a231edee75af2dae45ac');
		console.log(bandDetail);
	} catch (e) {
		console.log(e);
	}

	//checking error of lab 4
	console.log('OUTPUT:::::::::::::' + narutoUzumaki);
	try {
		const bandDetail = await bands.get(narutoUzumaki._id.toString());

		console.log(bandDetail);
	} catch (e) {
		console.log('LAB4');
		console.log(e);
	}

	//closing DB connection
	await connection.closeConnection();
	//console.log('Done!');
};

main();
