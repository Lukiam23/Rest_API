const db = require('../infra/database');

exports.getRoutes = function (){
	return db.query('select * from routes as r join stops as s on r.route_id=s.route_id;');
}

exports.getRoute = function (id){
	return db.query(`select * from routes as r join stops as s on r.route_id=s.route_id where r.route_id = ${id};`);
}

exports.deleteRoute = function (id){
	return db.result(`delete from routes where route_id = ${id}`, [123], r => r.rowCount );
}

exports.postRoute = function (id,date,status,stops){
	return db.tx( t => {
		return t.oneOrNone(`insert into routes values('${id}', '${date}', '${status}') RETURNING route_id`, 123)
				.then(data => {
				    return t.batch([ stops.map( stop => t.none(`insert into stops values(DEFAULT, ${id}, '${stop['description']}', '${stop['address']}', ${stop['latitude']}, ${stop['longitude']}, '${stop['status']}', ${stop['deliveryradius']} )`) )])
				});
    })
    .then(data => {
        return "Rota inserida"
    })
    .catch(error => {
        return error
    });
}

exports.patchRoute = function(id,status){
	console.log(`UPDATE routes SET status='${status}' where routes.route_id = ${id}`);
	return db.query(`UPDATE routes SET status='${status}' where routes.route_id = ${id}`);
}
