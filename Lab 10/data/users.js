const bcrypt = require('bcrypt');
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const errorChecking = require('../errorChecking');


/* Function to hash the password */
const hashing = async (password) => {
	const saltRounds = 16;
	const hash = await bcrypt.hash(password, saltRounds);
	return hash;
};

/*Function to create user */
const createUser = async (username, password) => {
	try {
		await errorChecking.checkForCreateUser(username, password);
	} catch (e) {
		throw e;
	}

	try {
		await errorChecking.duplicateExsits(username);
	} catch (e) {
		throw e;
	}

	let userName = username.trim().toLowerCase();
	let passWord = password.trim();
	let hashedPassword = await hashing(passWord);

	let userCollection = await users();
	let user = {
		username: userName,
		password: hashedPassword,
	};

	const data = await userCollection.insertOne(user);

	if (!data.acknowledged || !data.insertedId) {
		throw {
			code: 400,
			message: 'could not add user',
		};
	}
	return { userInserted: true };
};

/*Function to authenticate user */
const checkUser = async (username, password) => {
	try {
		await errorChecking.checkForCreateUser(username, password);
	} catch (e) {
		throw e;
	}

	let userLowerCase = username.toLowerCase();
	let user = await users();

	let data = await user.findOne({ "username": userLowerCase });
	if (data === null) {
		throw { code: 400, message: 'Either the username or password is invalid' };
	} else {
		compareToDbPassword = await bcrypt.compare(password, data.password);
		if (compareToDbPassword === true) {
			return { authenticated: true };
		} else {
			throw {
				code: 400,
				message: 'Either the username or password is invalid',
			};
		}
	}
};

module.exports = {
	createUser,
	checkUser,
};
