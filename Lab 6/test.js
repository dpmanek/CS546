const connection = require('./config/mongoConnection');
//const data = require('../data/'); //generalizing it later
const bands = require('./data/bands');
const albums = require('./data/albums');
//const { albums } = require('./config/mongoCollections');
//const data = require('./data');

async function main() {
	const db = await connection.connectToDb();
	//	await db.dropDatabase();

	//fetch album on the basis of an albumid
	try {
		const albumsof = await albums.remove('6223a79ef34e1ce413c0b948');
		console.log(albumsof);
	} catch (e) {
		console.log(e);
	}

	console.log('Done seeding database');

	await connection.closeConnection();
}

main();
