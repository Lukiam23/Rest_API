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


	return db.task(t => {
	    return t.oneOrNone(`insert into routes values('${id}', '${date}', '${status}') RETURNING route_id`, 123)
	        .then( data => {
	            stops.map( async function (stop){ 
					id = await t.oneOrNone(`insert into stops values(DEFAULT, ${id}, '${stop['description']}', ${stop['latitude']}, ${stop['longitude']}, '${stop['status']}', ${stop['deliveryradius']} ) RETURNING stop_id`)
					console.log(id)
	        	});
	        })
	})
    .then(events => {
        return "Sucesso total"
    })
    .catch(error => {
        return error
    });

}
