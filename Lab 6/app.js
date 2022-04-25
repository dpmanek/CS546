const express = require('express');
const app = express();
const configRoutes = require('./routes/index');

app.use(express.json());
configRoutes(app);

const port = 8000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
