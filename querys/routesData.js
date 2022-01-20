const database = require('../infra/database');

exports.getRoutes = function (){
	let routes = database.query('select * from routes');
	let stops = database.query('select s.route_id, s.description, ad.street, ad.number, ad.distric, ad.city, ad.uf, ad.zipcode, s.latitude, s.longitude, s.deliveryradius from stops as s join adresses as ad on s.stop_id=ad.stop_id;');
	
	let mergeData = routes.map( route => {
		let obj = {"stops":[]}
		obj["id"] = route["route_id"];
		obj["date"] = route["date"];
		obj["status"] = route["status"];

	});
	return stops.map(stop => stop);
}