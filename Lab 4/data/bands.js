const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const { ObjectId } = require('mongodb');
// {
//     _id: ObjectId,
//     name: string,
//     genre: [strings],
//     website: string (must contain full url http://www.patrickseats.com),
//     recordLabel: string,
//     bandMembers: [strings],
//     yearFormed: number,

// }

// {
//     _id: ObjectId("507f1f77bcf86cd799439011"),
//     name: "Pink Floyd",
//     genre: ["Progressive Rock", "Psychedelic rock", "Classic Rock"],
//     website: "http://www.pinkfloyd.com",
//     recordLabel: "EMI",
//     bandMembers: ["Roger Waters", "David Gilmour", "Nick Mason", "Richard Wright", "Sid Barrett" ],
//     yearFormed: 1965
// }

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
	if (typeof yearFormed !== 'number') throw 'Year should be in a number format';
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
	if (!id) throw 'Please provide an id. Id is missing';
	if (typeof id !== 'string') throw 'Enter ID in string format';
	if (id.trim().length === 0)
		throw 'Record Label cannot be blank. Please enter a String';
	id = id.trim();
	if (!ObjectId.isValid(id)) throw 'invalid object ID';
	let band = await bands();
	const bandData = await band.findOne({ _id: ObjectId(id) });
	if (bandData === null) throw 'No Band with that id';
	bandData._id = bandData._id.toString();

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
	if (!id) throw 'id doesnt exist';
	if (typeof id !== 'string') throw 'Enter Id in a string format';
	if (id.trim().length === 0)
		throw 'id cannot be an empty string or just spaces';
	id = id.trim();
	if (!ObjectId.isValid(id)) throw ' object ID is not valid';

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

const rename = async (id, newName) => {
	if (!id) throw 'id does not exist';
	if (typeof id !== 'string') throw 'Please provide id in string format';
	if (id.trim().length === 0)
		throw 'Id cannot be blank, please enter id in valid string format';
	id = id.trim();
	if (typeof newName !== 'string') throw 'Name must be a string';
	if (!ObjectId.isValid(id)) throw 'object ID is invalid';
	if (!newName) throw 'Please provide a name of your updated band';
	if (newName.trim().length === 0)
		throw 'Name cannot be blank, please enter id in valid string format';

	const band = await bands();
	const updatedBand = {
		name: newName,
	};

	const updatedData = await band.updateOne(
		{ _id: ObjectId(id) },
		{ $set: updatedBand }
	);
	if (updatedData.modifiedCount === 0) {
		let dummy = await get(id);

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
	rename,
};
