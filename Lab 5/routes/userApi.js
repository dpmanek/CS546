const express = require('express');
const router = express.Router();
const api = require('../data/index');

router.get('/people', async (req, res) => {
	try {
		const data = await api.peopleApi;
		res.json(data);
	} catch (e) {
		res.status(404).json({ error: e });
	}
});

router.get('/work', async (req, res) => {
	try {
		const data = await api.workApi;
		res.json(data);
	} catch (e) {
		res.status(404).json({ error: e });
	}
});

router.get('/people/:id', async (req, res) => {
	try {
		const id = Number(req.params.id.trim());
		if (!Number.isInteger(id)) {
			res.status(404).json({ error: 'Invalid data type of id' });
		} else if (id < 0) {
			res.status(404).json({ error: 'Id cannot be negative' });
		} else {
			let output = undefined;
			const data = await api.peopleApi;
			data.forEach((element) => {
				if (element.id === id) {
					output = element;
				}
			});
			if (!output) {
				res.status(404).json({ error: 'No person with that ID' });
			}
			res.json(output);
		}
	} catch (e) {
		res.status(404).json({ error: e });
	}
});

router.get('/work/:id', async (req, res) => {
	try {
		const id = Number(req.params.id.trim());
		if (!Number.isInteger(id)) {
			res.status(404).json({ error: 'Invalid data type of id' });
		} else if (id < 0) {
			res.status(404).json({ error: 'Id cannot be negative' });
		} else {
			let output = undefined;
			const data = await api.workApi;
			data.forEach((element) => {
				if (element.id === id) {
					output = element;
				}
			});
			if (!output) {
				res.status(404).json({ error: 'No Company with that ID' });
			}
			res.json(output);
		}
	} catch (e) {
		res.status(404).json({ error: e });
	}
});

module.exports = router;
