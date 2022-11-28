const path = require('path');

const db = require('knex')({
	client: 'better-sqlite3',
	connection: {
		filename: path.join(__dirname, 'evault.db'),
	},
});

module.exports = db;
