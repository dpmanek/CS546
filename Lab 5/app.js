const express = require('express');
const app = express();
const configRoutes = require('./routes/index');
const port = 3000;

configRoutes(app);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
