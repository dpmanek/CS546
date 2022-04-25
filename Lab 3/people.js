const config = require('./config');
const api = require('./otherApi');
//var validator = require('email-validator');

const getPersonById = async (id) => {
	let output = {};
	if (id === undefined || id === null) throw 'ERROR: id does not exist';
	if (typeof id !== 'string')
		throw 'ERROR: Value of id should be in a String format';
	if (id.trim().length === 0)
		throw 'ERROR: do not pass an empty string, please enter a valid string';
	let data = await api.axiosAPI(config.url.people);

	data.forEach((element) => {
		if (element.id === id) {
			output = element;
		}
	});

	if (api.isObjectEmpty(output)) {
		throw 'person not found';
	} else {
		return output;
	}
};

const sameEmail = async (emailDomain) => {
	let output = [];
	if (emailDomain === undefined || emailDomain === null)
		throw 'ERROR: id does not exist';
	if (typeof emailDomain !== 'string')
		throw 'ERROR: Value of id should be in a String format';
	if (emailDomain.trim().length === 0)
		throw 'ERROR: do not pass an empty string, please enter a valid string';
	let regex = /\./g;
	if (!regex.test(emailDomain)) throw ' invalid email id';

	let newEmailDomain = emailDomain;
	let newEmailDomainIndex = 0;
	let regex2 = /\./;
	//let check_again = false;
	//do {
	const periodOccurances = emailDomain.match(regex).length;
	//console.log(`number of period is ${periodOccurances}`);
	for (i = 0; i < periodOccurances; i++) {
		newEmailDomainIndex = newEmailDomain.search(regex2) + 1;
		newEmailDomain = newEmailDomain.slice(newEmailDomainIndex);
		//console.log(newEmailDomain.length);
		//console.log(newEmailDomain);
		if (newEmailDomain.length <= 1) throw 'invalid email id';
	}

	let data = await api.axiosAPI(config.url.people);

	data.forEach((element) => {
		let position = element.email.search('@') + 1;
		let part = element.email.slice(position);
		//console.log(`part is ${part}`);

		if (part.toLowerCase() === emailDomain.toLowerCase()) {
			output.push(element);
		}
	});

	if (api.isObjectEmpty(output)) {
		throw 'person not found';
	} else {
		return output;
	}
};
const manipulateIp = async () => {
	let ip = [];
	let justIp = [];
	let data = await api.axiosAPI(config.url.people);
	data.forEach((element) => {
		let temp = element.ip_address;
		let ipWithoutperiod = Number(temp.replace(/\./g, ''));
		let sortedNumberwithoutzero = api.sort(ipWithoutperiod);
		justIp.push(Number(sortedNumberwithoutzero));
		let struct = {
			ip: sortedNumberwithoutzero,
			firstName: element.first_name,
			lastName: element.last_name,
		};
		ip.push(struct);
	});

	ip.sort((a, b) => {
		return a.ip - b.ip;
	});

	let average = Math.floor(api.mean(justIp));
	let finalObject = {
		highest: { firstName: ip[0].firstName, lastName: ip[0].lastName },

		lowest: {
			firstName: ip[ip.length - 1].firstName,
			lastName: ip[ip.length - 1].lastName,
		},

		average: average, // just an example, this will be computed average from all converted SSNS  make sure this value is a number, NOT a string
	};
	//console.log(finalObject);
	return finalObject;
};

const sameBirthday = async (month, day) => {
	let newMonth = month;
	let newDay = day;
	if (newMonth === undefined || newMonth === null || isNaN(newMonth))
		throw 'Invalid month. Enter month from 1 to 12';
	if (newDay === undefined || newDay === null || isNaN(newDay))
		throw 'Invalid month. Enter month from 1 to 31';

	if (typeof newMonth === 'string') {
		newMonth = +newMonth;
		//console.log(newMonth);
	} else if (typeof month !== 'number') {
		throw 'Please enter month option in number format';
	}
	if (typeof newMonth === 'number') {
		if (!(newMonth > 0 && newMonth <= 12)) {
			throw 'There are only 12 months. Please enter month from 1 to 12';
		}
	}

	if (typeof newDay === 'string') {
		newDay = +newDay;
		//console.log(newDay);
	} else if (typeof newDay !== 'number') {
		throw 'Please enter day option in number format';
	}
	if (typeof newDay === 'number') {
		if (!(newDay > 0 && newDay <= 31)) {
			throw 'There are only 30 days in a months. Please enter a valid number from 1 to 30';
		}
	}

	if (!(newMonth === (1 || 3 || 5 || 7 || 8 || 10 || 12 || 2))) {
		if (!(newDay > 0 && newDay <= 30)) throw 'This month only has 30 days';
	}
	if (!(newMonth === (4 || 6 || 9 || 11 || 2))) {
		if (!(newDay > 0 && newDay <= 31)) throw 'This month only has 31 days';
	}
	if (newMonth === 2) {
		if (!(newDay > 0 && newDay <= 28)) throw 'This month only has 28 days';
	}

	let data = await api.axiosAPI(config.url.people);
	let output = [];
	data.forEach((element) => {
		let dob = element.date_of_birth;
		let monthFromObject = Number(dob.substr(0, 2));
		let dayFromObject = Number(dob.substr(3, 2));
		//console.log(`month is ${monthFromObject}`);
		//console.log(`day is ${dayFromObject}`);
		if (newMonth === monthFromObject && newDay === dayFromObject) {
			//	console.log('in');
			let full_name = element.first_name + ' ' + element.last_name;
			output.push(full_name);
		}
	});
	//console.log(output);
	return output;
};

module.exports = {
	getPersonById,
	sameEmail,
	manipulateIp,
	sameBirthday,
};
sameBirthday(12, 12);
