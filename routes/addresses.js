const express = require('express');
const router = express.Router();
const db = require('../db/db.js');

router.get('/', async (req, res) => {
	try {
		const result = await db('addresses').select();
		return res.status(200).json(result);
	} catch (err) {
		return res.status(400).send('Error retrieving');
	}
});

module.exports = router;
