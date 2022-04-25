const express = require('express');
const router = express.Router();
//const bands = require('../data/bands');
const errorChecking = require('../errorChecking');
const data = require('../data');

const user = data.users;
// const errorChecking = require('../errorChecking');
// const { users } = require('../config/mongoCollections');



router.get('/', async (req, res) => {
	if (req.session.user) {
		res.redirect('/private');
	} else {
		try {
			res.render('pages/login', { title: 'Login Page' });
		} catch (e) {
			res.status(404).json({ error: e });
		}
	}
});
router.get('/signup', async (req, res) => {
	if (req.session.user) {
		res.redirect('/private');
	} else {
		//	res.sendFile(path.join(__dirname, '../public/static/signup.html'));
		try {
			res.render('pages/signup', { title: 'Signup Page' });
		} catch (e) {
			res.status(404).json({ error: e });
		}
	}
});

router.post('/signup', async (req, res) => {
	let errors = [];
	let data = req.body;

	try {
		if (!data.username) {
			errors.push(`400: Please provide a username`);
		}
		if (!data.password) {
			errors.push(`400: Please provide a password`);
		}

		await errorChecking.checkForCreateUser(data.username, data.password);
		await errorChecking.duplicateExsits(data.username);
	} catch (e) {
		errors.push(`${e.code}: ${e.message}`);
	}
	if (errors.length > 0) {
		res.render('pages/signup', {
			errors: errors,
			hasErrors: true,
			title: 'Signup Page',
		});
		return;
	}
	try {
		let inserted = await user.createUser(data.username, data.password);
		if (inserted.userInserted) {
			res.render('pages/login', { title: 'Login Page' });
		} else {
			res.status(500).json({ error: 'Internal Server Error' });
		}
	} catch (e) {
		errors.push(`${e.code}: ${e.message}`);
		if (errors.length > 0) {
			res.render('pages/signup', {
				errors: errors,
				hasErrors: true,
				title: 'Signup Page',
			});
			return;
		}
	}
});

router.post('/login', async (req, res) => {
	let errors = [];
	let data = req.body;
	
	try {
		if (!data.username) {
			errors.push(`400: Please provide a username`);
		}
		if (!data.password) {
			errors.push(`400: Please provide a password`);
		}

		await errorChecking.checkForCreateUser(data.username, data.password);
	} catch (e) {
		errors.push(`${e.code}: ${e.message}`);
	}
	if (errors.length > 0) {
		res.render('pages/login', {
			errors: errors,
			hasErrors: true,
			title: 'Login Page',
		});
		return;
	}

	try {
		let check = await user.checkUser(data.username, data.password);
		if (check.authenticated) {
			//let userSession= data.username
			req.session.user = { username: data.username };
			//req.session.user = { firstName: 'Patrick', lastName: 'Hill', userId: 123 };
			res.redirect('/private');
		} else {
			errors.push(`400: You did not provide a valid username and/or password`);
			if (errors.length > 0) {
				res.render('pages/login', {
					errors: errors,
					hasErrors: true,
					title: 'Login Page',
				});
				return;
			}
		}
	} catch (e) {
		errors.push(`${e.code}: ${e.message}`);
		if (errors.length > 0) {
			res.render('pages/login', {
				errors: errors,
				hasErrors: true,
				title: 'Login Page',
			});
			return;
		}
	}
});

router.get('/private', async (req, res) => {
	res.render('pages/private', { username: req.session.user.username });
});

router.get('/logout', async (req, res) => {
	req.session.destroy();
	res.render('pages/logout');
});

router.get('/accessDenied', async(req,res)=>{
	res.status(403).render('pages/accessDenied');
})

module.exports = router;
