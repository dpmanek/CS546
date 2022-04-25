const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const errorChecking = require('../errorChecking');
const { ObjectId } = require('mongodb');

const create = async (
	name,
	genre,
	website,
	recordLabel,
	bandMembers,
	yearFormed
) => {
	if (
		!name ||
		!genre ||
		!website ||
		!recordLabel ||
		!bandMembers ||
		!yearFormed
	)
		throw 'All fields need to have valid values';
	if (name.trim().length === 0)
		throw 'Name cannot be blank. Please enter a String';
	if (typeof name !== 'string') throw 'please enter name in a string format';
	if (website.trim().length === 0)
		throw 'Website cannot be blank. Please enter a String';
	if (typeof website !== 'string')
		throw 'please enter website in a string format';
	if (recordLabel.trim().length === 0)
		throw 'Record Label cannot be blank. Please enter a String';
	if (typeof recordLabel !== 'string')
		throw 'please enter Record Label in a string format';
	const regex =
		/[h][t][t][p][\:][/][/][w][w][w][\.][\w{5,}][a-z A-Z 0-9 \.]{4,}[\.][c][o][m]/g;
	const found = website.match(regex);
	if (!found) throw 'website isnt in the proper format';

	if (!Array.isArray(genre)) throw 'Genre should be an array of strings';
	if (!Array.isArray(bandMembers))
		throw 'Band Members should be an array of strings';
	genre.forEach((element) => {
		if (typeof element !== 'string')
			throw 'Please provide genre in string format';
		if (element.trim().length === 0)
			throw 'Genre cannot be blank. Please enter a String';
	});
	for (i in genre) {
		genre[i] = genre[i].trim();
	}
	bandMembers.forEach((element) => {
		if (typeof element !== 'string')
			throw 'Please provide Band Member name  in string format';
		if (element.trim().length === 0)
			throw 'Band Member name cannot be blank. Please enter a String';
	});
	for (i in bandMembers) {
		bandMembers[i] = bandMembers[i].trim();
	}
	if (genre.length === 0) throw 'Please enter genre. It cannot be empty';
	if (bandMembers.length === 0)
		throw 'Please enter band members. It cannot be empty';
	if (typeof yearFormed !== 'number' || !Number.isInteger(yearFormed))
		throw 'Year should be in a number format and YYYY format';
	if (yearFormed < 1900 || yearFormed > 2022)
		throw 'Please enter a valid year between 1990-2022';

	name = name.trim();
	website = website.trim();
	recordLabel = recordLabel.trim();

	let bandsCollection = await bands();

	let band = {
		name: name,
		genre: genre,
		website: website,
		recordLabel: recordLabel,
		bandMembers: bandMembers,
		yearFormed: yearFormed,
		albums: [],
		overallRating: 0,
	};

	const data = await bandsCollection.insertOne(band);

	if (!data.acknowledged || !data.insertedId) throw 'could not add band';

	const dataId = data.insertedId.toString();

	//console.log(dataId);
	const insertedBand = await get(dataId); //this logic doubt
	insertedBand._id = insertedBand._id.toString();
	//console.log(insertedBand);
	return insertedBand;
};

const get = async (id) => {
	if (!id) throw { code: 400, message: 'Please provide an id. Id is missing' };
	if (typeof id !== 'string')
		throw { code: 400, message: 'Enter ID in string format' };
	if (id.trim().length === 0)
		throw { code: 400, message: 'ID cannot be blank. Please enter a String' };
	id = id.trim();
	if (!ObjectId.isValid(id)) throw { code: 400, message: 'invalid object ID' };
	let band = await bands();
	const bandData = await band.findOne({ _id: ObjectId(id) });
	if (bandData === null) throw { code: 404, message: 'No Band with that id' };
	bandData._id = bandData._id.toString();
	if (bandData.albums && bandData.albums.length > 0) {
		for (i in bandData.albums) {
			bandData.albums[i]._id = bandData.albums[i]._id.toString();
		}
	}
	return bandData;
};

const getAll = async () => {
	const band = await bands();
	const bandList = await band.find({}).toArray();
	if (bandList.length === 0) return [];
	if (!bandList) return 'Could not get all Bands';
	for (i in bandList) {
		bandList[i]._id = bandList[i]._id.toString();
	}
	return bandList;
};

const remove = async (id) => {
	//error checking
	try {
		await errorChecking.errorGetBand(id);
	} catch (e) {
		throw e;
	}

	id = id.trim();
	const band = await bands();

	const bandData = await get(id.toString()); //this logic doubt
	//band._id = band._id.toString();
	bandName = bandData.name;

	const deletedBand = await band.deleteOne({ _id: ObjectId(id) });

	if (deletedBand.deletedCount === 0) {
		throw `${id} Could'nt be deleted `;
	}

	return `The ${bandName} has been successfully deleted!`;
};

const update = async (
	id,
	name,
	genre,
	website,
	recordLabel,
	bandMembers,
	yearFormed
) => {
	try {
		await errorChecking.errorPutBand(
			id,
			name,
			genre,
			website,
			recordLabel,
			bandMembers,
			yearFormed
		);
	} catch (e) {
		throw e;
	}
	name = name.trim();
	website = website.trim();
	recordLabel = recordLabel.trim();

	const band = await bands();
	let updatedBand = {
		name: name,
		genre: genre,
		website: website,
		recordLabel: recordLabel,
		bandMembers: bandMembers,
		yearFormed: yearFormed,
	};

	const updatedData = await band.updateOne(
		{ _id: ObjectId(id) },
		{ $set: updatedBand }
	);

	if (updatedData.modifiedCount === 0) {
		let dummy = await get(id); //checks for validity of id here

		throw 'Band Name you provided is same as the name of existing band. Hence, band not updated';
	}

	const bandData = await get(id.toString());
	bandData._id = bandData._id.toString();
	return bandData;
};

const updateBand = async (id, albums, overallRating) => {
	const band = await bands();
	let updatedBand = {
		albums: albums,
		overallRating: overallRating,
	};

	const updatedData = await band.updateOne(
		{ _id: ObjectId(id) },
		{ $set: updatedBand }
	);

	if (updatedData.modifiedCount === 0) {
		throw 'Band Name you provided is same as the name of existing band. Hence, band not updated';
	}

	const bandData = await get(id.toString());
	bandData._id = bandData._id.toString();
	return bandData;
};

module.exports = {
	create,
	getAll,
	get,
	remove,
	update,
	updateBand,
};
