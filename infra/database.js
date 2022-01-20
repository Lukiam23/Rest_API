const promise = require('pg-promise')();
const db = promise({
		user: 'postgres', 
		password: '@Matheus23',
		host: 'localhost',
		port: 5432,
		database:'Greenmile'
});


module.exports = db;