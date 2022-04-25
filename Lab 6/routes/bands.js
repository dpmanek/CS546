const express = require('express');
const router = express.Router();
//const bands = require('../data/bands');
const data = require('../data');

const bands = data.bands;
const errorChecking = require('../errorChecking');

router.get('/', async (req, res) => {
	let final = [];
	let err = false;

	try {
		const data = await bands.getAll();

		data.forEach((e) => {
			let dataToBePushed = {
				_id: e._id,
				name: e.name,
			};

			final.push(dataToBePushed);
		});
		//console.log(final);
		res.json(final);
	} catch (e) {
		if (!err) res.status(404).json({ error: e });
	}
});

router.post('/', async (req, res) => {
	//console.log(req.body);
	let err = false;
	const { name, genre, website, recordLabel, bandMembers, yearFormed } =
		req.body;

	try {
		await errorChecking.errorCreateBand(
			name,
			genre,
			website,
			recordLabel,
			bandMembers,
			yearFormed
		);
	} catch (e) {
		err = true;
		res.status(400).json({ error: e });
	}

	try {
		let output = await bands.create(
			name,
			genre,
			website,
			recordLabel,
			bandMembers,
			yearFormed
		);
		res.json(output);
	} catch (e) {
		if (!err) res.status(400).json({ error: e });
	}
});

router.get('/:id', async (req, res) => {
	let bandId = req.params.id;
	let err = false;
	//console.log(bandId);

	//error checking
	try {
		await errorChecking.errorGetBand(bandId);
	} catch (e) {
		//	console.log(e);
		err = true;
		res.status(e.code).json({ error: e.message });
	}

	try {
		let band = await bands.get(bandId);
		res.json(band);
	} catch (e) {
		if (!err) res.status(e.code).json({ error: e.message });
	}
});

router.put('/:id', async (req, res) => {
	let bandId = req.params.id;
	let { name, genre, website, recordLabel, bandMembers, yearFormed } = req.body;
	let err = false;
	try {
		await errorChecking.errorPutBand(
			bandId,
			name,
			genre,
			website,
			recordLabel,
			bandMembers,
			yearFormed
		);
	} catch (e) {
		err = true;
		//	console.log(e);
		res.status(e.code).json({ error: e.message });
	}

	try {
		let band = await bands.get(bandId);

		let oldAlbum = band.albums;
		let oldOverallRating = band.overallRating;

		await bands.update(
			bandId,
			name,
			genre,
			website,
			recordLabel,
			bandMembers,
			yearFormed
		);
		if (oldAlbum.length !== 0 && oldOverallRating !== 0) {
			let update2 = await bands.updateBand(bandId, oldAlbum, oldOverallRating);
			res.json(update2);
		} else {
			let final = await bands.get(bandId);
			res.json(final);
		}
	} catch (e) {
		if (!err)
			if (!e.code) {
				//	console.log(e);
				res.status(400).json({ error: e });
			} else res.status(e.code).json({ error: e.message });
	}
});

router.delete('/:id', async (req, res) => {
	let bandId = req.params.id;
	let err = false;

	try {
		await errorChecking.errorGetBand(bandId);
	} catch (e) {
		//	console.log(e);
		err = true;
		res.status(e.code).json({ error: e.message });
	}

	try {
		await bands.remove(bandId);
		let final = {
			bandId: bandId,
			deleted: true,
		};
		res.json(final);
	} catch (e) {
		if (!err) res.status(e.code).json({ error: e.message });
	}
});

module.exports = router;
