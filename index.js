const express = require('express');
const database = require('./db/db');
const app = express();
const port = 9000;

app.get('/', (req, res) => {
	database('addresses')
		.select()
		.then((addresses) => {
			return res.json(addresses);
		})
		.catch((err) => {
			console.error(err);
			return res.json({
				success: false,
				message: 'An error occurred, please try again later.',
			});
		});
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
