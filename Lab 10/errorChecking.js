const mongoCollections = require('./config/mongoCollections');
const users = mongoCollections.users;

const checkForCreateUser = async (username, password) => {
	if (!username) throw { code: 400, message: 'Please provide a username' };
	if (!password) throw { code: 400, message: 'Please provide a password' };
	if (typeof username !== 'string') {
		throw { code: 400, message: 'Enter username in string format' };
	}
	if (typeof password !== 'string') {
		throw { code: 400, message: 'Enter password in string format' };
	}

	if (username.trim().toLowerCase().length === 0) {
		throw {
			code: 400,
			message: 'username cannot be blank. Please give a valid String input',
		};
	}
	if (password.trim().length === 0) {
		throw {
			code: 400,
			message: 'username cannot be blank. Please give a valid String input',
		};
	}
	if (username.trim().toLowerCase().length < 4) {
		throw {
			code: 400,
			message: 'Length of username should be atleast 4 characters long',
		};
	}
	if (username.trim().toLowerCase().includes(' ')) {
		throw {
			code: 400,
			message:
				'You cannot include a space in your username, it should be a single word',
		};
	}
	if (password.trim().toLowerCase().includes(' ')) {
		throw {
			code: 400,
			message:
				'You cannot include a space in your password, it should be a single word',
		};
	}
	if (password.trim().length < 6) {
		throw {
			code: 400,
			message: 'Length of password should be atleast 6 characters long',
		};
	}
	var regex = /^[A-Za-z0-9 ]+$/;
	if (!regex.test(username)) {
		throw {
			code: 400,
			message: 'username cannot have special characters',
		};
	}
	return 'no error';
};

const duplicateExsits = async (username) => {
	let userLowerCase = username.toLowerCase();
	let user = await users();

	let data = await user.findOne({ username: userLowerCase });
	if (data) {
		throw { code: 400, message: 'there is already a user with that username' };
	}
	return 'no duplicate';
};

module.exports = {
	checkForCreateUser,
	duplicateExsits,
};
