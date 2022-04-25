const express = require('express');
const { albums } = require('../config/mongoCollections');
const router = express.Router();
const data = require('../data');
const album = data.albums;
const bands = data.bands;
const errorChecking = require('../errorChecking');

router.get('/:id', async (req, res) => {
	let err = false;
	let bandId = req.params.id;
	try {
		await errorChecking.errorGetBand(bandId);
	} catch (e) {
		err = true;
		res.status(e.code).json({ error: e.message });
	}

	try {
		const data = await album.getAll(bandId);
		res.json(data);
	} catch (e) {
		if (!err) res.status(e.code).json({ error: e.message });
	}
});

router.post('/:id', async (req, res) => {
	let err = false;
	let bandId = req.params.id;
	const { title, releaseDate, tracks, rating } = req.body;
	try {
		await errorChecking.errorCreateAlbum(
			bandId,
			title,
			releaseDate,
			tracks,
			rating
		);
	} catch (e) {
		err = true;
		res.status(e.code).json({ error: e.message });
	}
	let final1, final2;
	try {
		final1 = await album.create(bandId, title, releaseDate, tracks, rating);
		final2 = await bands.get(bandId);
		res.json(final2);
	} catch (e) {
		if (!err) res.status(e.code).json({ error: e.message });
	}
});

router.get('/album/:id', async (req, res) => {
	let albumId = req.params.id;
	let bandId = undefined;
	err = false;

	try {
		await errorChecking.errorGetAlbumId(albumId);
	} catch (e) {
		err = true;
		res.status(e.code).json({ error: e.message });
	}

	try {
		bandId = await album.get(albumId);

		res.json(bandId);
	} catch (e) {
		if (!err) {
			res.status(e.code).json({ error: e.message });
		}
	}
});

router.delete('/:id', async (req, res) => {
	let albumId = req.params.id;
	let err = false;

	try {
		await errorChecking.errorGetAlbumId(albumId);
	} catch (e) {
		//	console.log(e);
		err = true;
		res.status(e.code).json({ error: e.message });
	}

	try {
		await album.remove(albumId);
		let final = {
			albumId: albumId,
			deleted: true,
		};
		res.json(final);
	} catch (e) {
		if (!err) res.status(e.code).json({ error: e.message });
	}
});

module.exports = router;
