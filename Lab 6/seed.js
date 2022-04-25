const connection = require('./config/mongoConnection');
//const data = require('../data/'); //generalizing it later
const bands = require('./data/bands');
const albums = require('./data/albums');
//const { albums } = require('./config/mongoCollections');

async function main() {
	const db = await connection.connectToDb();
	await db.dropDatabase();

	let sanam = undefined;
	try {
		sanam = await bands.create(
			'Sanam1',
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
		//		console.log(sanam);
	} catch (e) {
		console.log(e);
	}

	let sanam2 = undefined;
	try {
		sanam2 = await bands.create(
			'Sanam2',
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
	} catch (e) {
		console.log(e);
	}

	let sanam3;
	try {
		sanam3 = await bands.create(
			'Sanam3',
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
	} catch (e) {
		console.log(e);
	}

	let sanam4 = undefined;
	try {
		sanam4 = await bands.create(
			'Sanam4',
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
	} catch (e) {
		console.log(e);
	}

	//updating sanam 4
	let usanam4 = undefined;
	try {
		usanam4 = await bands.update(
			sanam4._id.toString(),
			'  Sanam5  ',
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
	} catch (e) {
		console.log(e);
	}
	/*Album.js starts here */

	let insertAlbumSanam = undefined;
	try {
		insertAlbumSanam = await albums.create(
			sanam4._id.toString(),
			'Sanam Redemption',
			'09/12/2018',
			['Tara Vina Shyam', 'Yeh Raatein Yeh Mausam', 'Yeh Raatein Yeh Mausam2'],
			3
		);
		//	console.log(insertAlbumSanam);
	} catch (e) {
		console.log(e);
	}

	let insertAlbumSpiderman = undefined;
	try {
		insertAlbumSpiderman = await albums.create(
			sanam4._id.toString(),
			'Spiderman Redemption',
			'09/12/2018',
			['Tara Vina Shyam', 'Yeh Raatein Yeh Mausam', 'Yeh Raatein Yeh Mausam2'],
			3
		);
		console.log(insertAlbumSpiderman);
	} catch (e) {
		console.log(e);
	}

	let insertAlbumSuperman;
	try {
		insertAlbumSuperman = await albums.create(
			sanam3._id.toString(),
			'Spiderman Redemption',
			'09/12/2018',
			['Tara Vina Shyam', 'Yeh Raatein Yeh Mausam', 'Yeh Raatein Yeh Mausam2'],
			3
		);
	} catch (e) {
		console.log(e);
	}

	//get all albums of a band id
	let getAlbumsOfSanam5 = undefined;
	try {
		getAlbumsOfSanam5 = await albums.getAll(sanam4._id.toString());
		//	console.log(getAlbumsOfSanam5);
	} catch (e) {
		console.log(e);
	}

	//	fetch album on the basis of an albumid
	try {
		//	console.log(insertAlbumSuperman._id.toString());
		const albumsof = await albums.get(insertAlbumSpiderman._id);
		console.log('FINALLLLL:::::::');
		console.log(albumsof);
	} catch (e) {
		console.log(e);
	}

	console.log('Done seeding database');

	await connection.closeConnection();
}

main();
