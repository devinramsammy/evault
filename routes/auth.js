const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
// const db = require('../db/db.js');

router.post('/login', async (req, res) => {
	try {
		const timestamp = new Date(Date.now() + 7200000); // 2 hours ahead of current time
		const payload = { username: 'username' };
		const correctCredentials = true;
		if (correctCredentials) {
			jwt.sign(
				payload,
				process.env.JWT_SECRET,
				{ expiresIn: 7200000 },
				(err, token) => {
					if (err) {
						return res.status(400).send(err);
					} else {
						return res
							.status(200)
							.cookie('auth', token, {
								expires: timestamp,
								httpOnly: true,
								// secure: false, not using https locally
								// sameSite: 'none',
							})
							.cookie('checkToken', true, {
								expires: timestamp,
								// secure: false, not using https locally
								// sameSite: 'none',
							})
							.send();
					}
				}
			);
		} else {
			res.status(400).send();
		}
	} catch (err) {
		return res.status(400).send(err);
	}
});

router.post('/verify', async (req, res) => {
	try {
		const authJWT = req.headers.cookie.split('auth=')[1].split(';')[0];
		const verifiedAuthToken = jwt.verify(authJWT, process.env.JWT_SECRET);

		if (verifiedAuthToken) {
			const decoded = jwt.decode(authJWT);
			if (Date.now() > decoded.exp) {
				return res.status(200).send();
			}
		}

		return res.status(400).send();
	} catch (err) {
		return res.status(400).send(err);
	}
});

module.exports = router;
