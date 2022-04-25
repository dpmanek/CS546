const apiRoutes = require('./userApi');

const constructorMethod = (app) => {
	app.use('', apiRoutes);

	app.use('*', (req, res) => {
		res.status(404).json({ error: 'Not Found' });
	});
};

module.exports = constructorMethod;
