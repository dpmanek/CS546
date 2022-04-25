const api = require('./otherApi');
const config = require('./config');

const listShareholders = async (stockName) => {
	if (!stockName) throw 'No inputs provided. Please enter a string input.';
	if (typeof stockName !== 'string')
		throw 'Please enter a string input. Not a string input';
	if (stockName.trim().length === 0) throw 'string is empty!';
	let finalObject = {
		id: '',
		stock_name: '',
		shareholders: [],
	};
	let stocks = [];
	let stockData = await api.axiosAPI(config.url.stock);
	let peopleData = await api.axiosAPI(config.url.people);

	stockData.forEach((element) => {
		stocks.push(element.stock_name);
		if (element.stock_name === stockName) {
			finalObject.id = element.id;
			finalObject.stock_name = element.stock_name;
			element.shareholders.forEach((shareholders) => {
				peopleData.forEach((people) => {
					if (shareholders.userId === people.id) {
						{
							finalObject.shareholders.push({
								first_name: people.first_name,
								last_name: people.last_name,
								number_of_shares: shareholders.number_of_shares,
							});
						}
					}
				});
			});
		}
	});

	if (!stocks.includes(stockName)) {
		throw 'No stock with that name';
	}
	return finalObject;
};

const totalShares = async (stockName) => {
	if (!stockName) throw 'No inputs provided. Please enter a string input.';
	if (typeof stockName !== 'string')
		throw 'Please enter a string input. Not a string input';
	if (stockName.trim().length === 0) throw 'string is empty!';
	let data = await api.axiosAPI(config.url.stock);
	let shares = 0;
	let numberOfShareholders = 0;
	let stocks = [];
	let output = '';
	data.forEach((element) => {
		stocks.push(element.stock_name);
		if (element.stock_name === stockName) {
			numberOfShareholders = element.shareholders.length;
			if (numberOfShareholders === 0) {
				output = `${stockName} currently has no shareholders`;
			}

			element.shareholders.forEach((data) => {
				shares = shares + data.number_of_shares;
			});

			if (numberOfShareholders === 1) {
				output = `${stockName}, has 1 shareholder that owns a total of ${shares} shares.`;
			}
			if (numberOfShareholders > 1) {
				output = `${stockName}, has ${numberOfShareholders} shareholders that own a total of ${shares} shares.`;
				// console.log(output);
				// return output;
			}
		}
	});
	if (!stocks.includes(stockName)) {
		throw 'No stock with that name';
	}
	return output;
};

const listStocks = async (firstName, lastName) => {
	if (!firstName)
		throw 'No inputs provided. Please enter a string input for First Name.';
	if (!lastName)
		throw 'No inputs provided. Please enter a string input for Last Name.';
	if (typeof firstName !== 'string')
		throw 'FIRST NAME: Please enter a string input. Not a string input';
	if (typeof lastName !== 'string')
		throw 'LAST NAME: Please enter a string input. Not a string input';
	if (firstName.trim().length === 0) throw 'First Name is empty!';
	if (lastName.trim().length === 0) throw 'Last Name is empty!';

	let peopleData = await api.axiosAPI(config.url.people);
	let stockData = await api.axiosAPI(config.url.stock);
	let personId = '';
	let output = [];
	let person = [];
	peopleData.forEach((element) => {
		person.push(`${element.first_name} ${element.last_name}`);
		if (element.first_name === firstName && element.last_name === lastName) {
			personId = element.id;
		}
	});
	if (!person.includes(`${firstName} ${lastName}`)) {
		throw 'Person not found';
	}
	stockData.forEach((element) => {
		element.shareholders.forEach((element2) => {
			if (element2.userId === personId) {
				output.push({
					stock_name: element.stock_name,
					number_of_shares: element2.number_of_shares,
				});
			}
		});
	});
	if (output.length > 0) {
		return output;
	} else throw 'Person does not own any stocks';
};

const getStockById = async (id) => {
	if (!id) throw 'No inputs provided. Please enter a string input for id.';
	if (typeof id !== 'string')
		throw 'id: Please enter a string input. Not a string input';
	if (id.trim().length === 0) throw 'id is empty!';

	let output;
	let data = await api.axiosAPI(config.url.stock);
	let idStock = [];
	data.forEach((element) => {
		idStock.push(element.id);
		if (element.id === id) {
			output = element;
		}
	});

	if (!idStock.includes(id)) {
		throw 'Stock not found';
	}
	return output;
};

module.exports = {
	listShareholders,
	totalShares,
	listStocks,
	getStockById,
};
