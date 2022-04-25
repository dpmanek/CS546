const mongoCollections = require('./config/mongoCollections');
const bands = mongoCollections.bands;
const { ObjectId } = require('mongodb');

const isGivenStringValid = (string, stringName) => {
	let error = undefined;
	if (!string) {
		error = 'Please enter a valid String';
	} else if (typeof string !== 'string') {
		error = `please enter ${stringName} in a string format`;
	} else if (string.trim().length === 0) {
		error = `${stringName} cannot be blank. Please enter a String`;
	}

	return error;
};

const isvariableValid = (variable, variableName) => {
	let error = undefined;
	if (!variable) {
		error = `Please enter a valid ${variableName}`;
	}

	return error;
};

const errorCreateBand = (
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
		throw 'Year should be in a number YYYY format ';
	if (yearFormed < 1900 || yearFormed > 2022)
		throw 'Please enter a valid year between 1990-2022';

	name = name.trim();
	website = website.trim();
	recordLabel = recordLabel.trim();
	return 'done no errors';
};

const errorGetBand = async (id) => {
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
};

const errorPutBand = async (
	id,
	name,
	genre,
	website,
	recordLabel,
	bandMembers,
	yearFormed
) => {
	if (
		!id ||
		!name ||
		!genre ||
		!website ||
		!recordLabel ||
		!bandMembers ||
		!yearFormed
	)
		throw { code: 400, message: 'All fields need to have valid values' };
	//If name, website, recordLabel are not strings or are empty strings, the route should issue a 400 status code and end the request.

	if (typeof name !== 'string') {
		throw { code: 400, message: `please enter name in a string format` };
	}
	if (name.trim().length === 0) {
		throw { code: 400, message: `name cannot be blank. Please enter a String` };
	}

	if (typeof website !== 'string') {
		throw { code: 400, message: `please enter website in a string format` };
	}
	if (website.trim().length === 0) {
		throw {
			code: 400,
			message: `website cannot be blank. Please enter a String`,
		};
	}

	if (typeof recordLabel !== 'string') {
		throw { code: 400, message: `please enter recordLabel in a string format` };
	}
	if (recordLabel.trim().length === 0) {
		throw {
			code: 400,
			message: `name recordLabel be blank. Please enter a String`,
		};
	}

	//If website does not contain http://www. and end in a .com, and have at least 5 characters in-between the http://www. and .com the route should issue a 400 status code and end the request.
	const regex =
		/[h][t][t][p][\:][/][/][w][w][w][\.][\w{5,}][a-z A-Z 0-9 \.]{4,}[\.][c][o][m]/g;
	const found = website.match(regex);
	if (!found) throw { code: 400, message: 'website isnt in the proper format' };

	//If genre, bandMembers are not arrays and if they do not have at least one element in each of them that is a valid string, or are empty strings the route should issue a 400 status code and end the request.
	if (!Array.isArray(genre))
		throw { code: 400, message: 'Genre should be an array of strings' };
	if (!Array.isArray(bandMembers))
		throw { code: 400, message: 'Band Members should be an array of strings' };
	genre.forEach((element) => {
		if (typeof element !== 'string')
			throw { code: 400, message: 'Please provide genre in string format' };
		if (element.trim().length === 0)
			throw {
				code: 400,
				message: 'Genre cannot be blank. Please enter a String',
			};
	});
	for (i in genre) {
		genre[i] = genre[i].trim();
	}
	bandMembers.forEach((element) => {
		if (typeof element !== 'string')
			throw {
				code: 400,
				message: 'Please provide Band Member name  in string format',
			};
		if (element.trim().length === 0)
			throw {
				code: 400,
				message: 'Band Member name cannot be blank. Please enter a String',
			};
	});
	for (i in bandMembers) {
		bandMembers[i] = bandMembers[i].trim();
	}
	//If yearFormed is not a number, or if yearFormed is less than 1900 or greater than the current year (2022) the route should issue a 400 status code and end the request.  (so only years 1900-2022 are valid values)
	if (typeof yearFormed !== 'number')
		throw { code: 400, message: 'Year should be in a number format' };
	if (yearFormed < 1900 || yearFormed > 2022)
		throw { code: 400, message: 'Please enter a valid year between 1990-2022' };

	try {
		let dummy = await errorGetBand(id); //checks for validity of id here
	} catch (e) {
		throw e;
	}
	return 'no error';
};

const errorCreateAlbum = async (bandId, title, releaseDate, tracks, rating) => {
	if (!bandId || !title || !releaseDate || !tracks || !rating)
		throw { code: 400, message: 'All fields need to have valid values' };

	if (typeof bandId !== 'string')
		throw { code: 400, message: 'Enter bandId in string format' };
	if (bandId.trim().length === 0)
		throw {
			code: 400,
			message: 'bandId cannot be blank. Please enter a String',
		};
	if (typeof title !== 'string')
		throw { code: 400, message: 'Enter title in string format' };
	if (title.trim().length === 0)
		throw {
			code: 400,
			message: 'title cannot be blank. Please enter a String',
		};
	if (typeof releaseDate !== 'string')
		throw { code: 400, message: 'Enter releaseDate in string format' };
	if (releaseDate.trim().length === 0)
		throw {
			code: 400,
			message: 'releaseDate cannot be blank. Please enter a String',
		};

	try {
		await errorGetBand(bandId);
	} catch (e) {
		throw e;
	}

	if (!Array.isArray(tracks)) throw 'tracks should be an array of strings';

	tracks.forEach((element) => {
		if (!element || typeof element !== 'string')
			throw {
				code: 400,
				message: 'Please provide track name in string format',
			};

		if (element.trim().length === 0)
			throw {
				code: 400,
				message: 'tracks name cannot be blank. Please enter a String',
			};
	});

	for (i in tracks) {
		tracks[i] = tracks[i].trim();
	}
	if (tracks.length < 3)
		throw {
			code: 400,
			message: 'there should be atleast 3 tracks in the array of tracks',
		};

	let date1 = releaseDate.trim();
	let ms = Date.parse(date1);

	if (!ms) {
		throw {
			code: 400,
			message: 'Invalid date String. Submit Date in mm/dd/yyyy format',
		};
	}

	let arr = date1.split('/');
	//console.log(arr)
	let month = Number(arr[0].trim());
	let day = Number(arr[1].trim());
	let year = Number(arr[2].trim());
	//console.log(typeof(month))

	//returns current year + 1
	// 2023
	let mdate = new Date().getFullYear() + 1;
	if (year < 1900 || year > mdate) {
		throw {
			code: 400,
			message:
				'Invalid Date: year should be in range of 1900 - Current Year +1 i.e 2023',
		};
	}

	if (month > 12 || day >> 31) {
		throw {
			code: 400,
			message: 'Invalid Date',
		};
	}

	if (month === 2 && day > 28) {
		throw {
			code: 400,
			message: 'Cannot have more than 28 days in February',
		};
	}

	if (month === (1 || 3 || 5 || 7 || 8 || 10 || 12) && day > 31) {
		throw {
			code: 400,
			message: 'This month only has 31 days',
		};
	}

	if (month === (4 || 6 || 9 || 11) && day > 30) {
		throw {
			code: 400,
			message: 'This month only has 30 days',
		};
	}

	let newRating = Number(rating);
	integer = Number.isInteger(newRating);
	if (integer) {
		if (rating < 1 || rating > 5)
			throw {
				code: 400,
				message: ' Enter rating in range 1-5',
			};
	} else {
		floatRating = rating.toFixed(1);
		if (rating < 1.5 || rating > 4.8)
			throw {
				code: 400,
				message:
					'Acceptable rating range is either 1-5 and in float 1.5 to 4.8 ',
			};
	}

	return 'no error';
};

const errorGetAlbumId = async (albumId) => {
	if (!albumId) throw { code: 400, message: 'Please provide a valid Album ID' };

	if (typeof albumId !== 'string')
		throw { code: 400, message: 'Enter Album ID in string format' };

	if (albumId.trim().length === 0)
		throw {
			code: 400,
			message: 'Album ID cannot be blank. Please enter a String',
		};

	albumId = albumId.trim();
	if (!ObjectId.isValid(albumId))
		throw { code: 400, message: 'Invalid object ID' };

	let band = await bands();

	const bandData2 = await band.findOne({ 'albums._id': ObjectId(albumId) });
	if (bandData2 === null) {
		throw { code: 404, message: 'No Such album id exists' };
	}
	return 'no error';
};
module.exports = {
	isGivenStringValid,
	isvariableValid,
	errorCreateBand,
	errorGetBand,
	errorPutBand,
	errorCreateAlbum,
	errorGetAlbumId,
};
