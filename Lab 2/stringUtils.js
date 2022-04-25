// I got this peice of code from https://thewebdev.info/2021/04/17/how-to-convert-any-string-into-camel-case-with-javascript/
const camelCase = (string) => {
	if (string === undefined) throw 'string does not exist';
	else if (typeof string !== 'string') throw 'input value is not a string';
	else if (string.trim().length === 0) throw 'string is empty!';
	else {
		return string
			.replace(/(?:^\w|\[A-Z\]|\b\w)/g, (a, b) => {
				return b === 0 ? a.toLowerCase() : a.toUpperCase();
			})
			.replace(/\s+/g, '');
	}
};

const replaceChar = (string) => {
	if (string === undefined) throw 'string does not exist';
	if (typeof string !== 'string') throw 'argument is not a string';
	if (string.trim().length === 0) throw 'string is empty!';
	else {
		let newString = '';
		let comparer = string[0];
		// let rx="/"+comparer+"/g";
		//console.log(`regex is ${rx}`)
		for (let i = 1; i < string.length; i++) {
			newString = string.replace(/d/g, 'o');
		}
		console.log(`string is ${newString}`);
	}
	return 'couldnt solve this function';
};

const mashUp = (string1, string2) => {
	if (string1 === undefined) throw 'String 1 does not exist';
	if (string2 === undefined) throw 'String 2 does not exist';
	if (typeof string1 !== 'string') throw 'First input value is not a string';
	if (typeof string2 !== 'string') throw 'Second input value is not a string';
	if (string1.length <= 1)
		throw 'String 1: please enter string of length more than 2';
	if (string2.length <= 1)
		throw 'String 2: please enter string of length more than 2';
	if (string1.trim().length === 0) throw 'string 1 is empty!';
	if (string2.trim().length === 0) throw 'string 2 is empty!';
	let finalString = '';
	let firstVariableOfFirstString = string1[0];
	let secondVariableOfFirstString = string1[1];
	let newString1 = string1.replace(string1[0], string2[0]);
	let newString11 = newString1.replace(string1[1], string2[1]);
	let newString2 = string2.replace(string2[0], firstVariableOfFirstString);
	let newString22 = newString2.replace(string2[1], secondVariableOfFirstString);
	finalString = newString11 + ' ' + newString22;
	return finalString;
};

module.exports = {
	camelCase,
	replaceChar,
	mashUp,
};
