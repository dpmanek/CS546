const axios = require('axios');

const axiosAPI = async (url) => {
	const { data } = await axios.get(url);
	return data; // this will be the array of people objects
};

const isObjectEmpty = (obj) => {
	const status = Object.keys(obj).length === 0;
	return status;
};

// got idea for this from https://www.tutorialspoint.com/sorting-digits-of-all-the-number-of-array-javascript
const sort = (num) => {
	const number = String(num)
		.split('')
		.map((element) => +element);
	number.sort((a, b) => a - b);
	let newNumber = [];
	number.forEach((element) => {
		if (element !== 0) {
			newNumber.push(element);
		}
	});

	//console.log(newNumber);
	const ascending = newNumber.join('');
	return ascending;
};

//function that finds mean value of an array
const mean = (array) => {
	if (!array) throw 'There are no inputs';
	else if (array.length === 0) throw 'array is empty';
	else if (!Array.isArray(array))
		throw 'The input is not in an array form, please provide an array as an input';
	else {
		let sum = 0;
		array.forEach((element) => {
			if (typeof element != 'number') throw 'input values are not number';
			sum = sum + element;
		});
		let meanValue = sum / array.length;
		return meanValue;
	}
};

module.exports = {
	axiosAPI,
	isObjectEmpty,
	sort,
	mean,
};
//sort(540000921);
