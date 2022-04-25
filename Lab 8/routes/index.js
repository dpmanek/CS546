const api = require('./api');

const constructorMethod = (app) => {
	app.use('', api);

	app.use('*', (req, res) => {
		res.status(404).json({ error: 'Not Found' });
	});
};

module.exports = constructorMethod;
