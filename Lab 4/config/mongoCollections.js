const dbConnection = require('./mongoConnection');

const getCollectionFn = (Collection) => {
	let _col = undefined;
	return async () => {
		if (!_col) {
			const db = await dbConnection.connectToDb();
			_col = await db.collection(Collection);
		}

		return _col;
	};
};

// async function getCollectionFn(Collection) {
// 	let _col = undefined;
// 	if (!_col) {
// 		const db = await dbConnection.connectToDb();
// 		_col = await db.collection(Collection);
// 	}

// 	return _col;
// }
module.exports = {
	bands: getCollectionFn('bands'),
};
