const db = require('../infra/database');

exports.getRoutes = function (){
	return db.query('select * from routes');
}

exports.getStops = function (){
	return db.query('select s.route_id, s.description, ad.street, ad.number, ad.distric, ad.city, ad.uf, ad.zipcode, s.latitude, s.longitude, s.deliveryradius from stops as s join addresses as ad on s.stop_id=ad.stop_id;');
}

exports.deleteRoute = function (id){
	return db.result(`delete from routes where route_id = ${id}`, [123], r => r.rowCount );
}

exports.postRoute = function (id,date,status,stops){
	const inserirRotas = db.query(`insert into routes values('${id}', '${date}', '${status}')`)

	db.tx(t => {
	    const queries = stops.map(stop => {
	        return t.one(`insert into stops values(DEFAULT, ${id}, '${stop['description']}', ${stop['latitude']}, ${stop['longitude']}, '${stop['status']}', ${stop['deliveryradius']} ) RETURNING stop_id`,
	                       stop, a => +a.id);
	    });
	    console.log("finish")
	    return t.batch(queries);
	})
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        // ERROR
    });

	/*stops.map( function (stop){ 
	
		db.result(`insert into stops values(DEFAULT, ${id}, ${stop['description']}, ${stop['latitude']}, ${stop['longitude']}, ${stop['status']}, ${stop['deliveryradius']} ) RETURNING stop_id`);

		const [street, number, district, city, uf, zip1,zip2] = stop['address'];

		db.query(`insert into addresses values(DEFAULT, ${stop_id}, ${street}, ${number}, ${district}, ${city}, ${uf}, ${zip1}-${zip2})`);
	});*/

	return inserirRotas;
}
