const path = require('path');

const database = require('knex')({
	client: 'better-sqlite3',
	connection: {
		filename: path.join(__dirname, 'evault.db'),
	},
});

module.exports = database;
