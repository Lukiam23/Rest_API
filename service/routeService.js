const routesQuery = require('../querys/routesData')


exports.getRoutes = async function () {
	const routesData = await routesQuery.getRoutes();
	let dictionary = {}
	routesData.map( row => {
		console.log(row)
		if(!Object.keys(dictionary).includes(`${row.route_id}`)){
			dictionary[row.route_id] = {id:row.route_id, date:row.date, status:row.route_status, stops: []};
		}
		
		dictionary[row.route_id].stops.push({description:row.description, address:row.address, latitude:Number(row.latitude), longitude:Number(row.longitude), status:row.stop_status, deliveryRadius:row.deliveryradius });

	})
	return Object.values(dictionary);
	
};

exports.getRoute = async function (id) {
	const routesData = await routesQuery.getRoute(id);
	let dictionary = {}
	routesData.map( row => {
		if(!Object.keys(dictionary).includes(`${row.route_id}`)){
			dictionary[row.route_id] = {id:row.route_id, date:row.date, status:row.route_status, stops: []};
		}
		
		dictionary[row.route_id].stops.push({description:row.description, address:row.address, latitude:Number(row.latitude), longitude:Number(row.longitude), status:row.stop_status, deliveryRadius:row.deliveryradius });

	})
	return Object.values(dictionary);
	
};

exports.deleteRoute = async function (id) {
	return await routesQuery.deleteRoute(id)
}

exports.postRoute = async function (id,date,status,stops){
	if(stops.length === 0) return "A rota deve ter no mínimo uma parada";
	
	let isValid = stops.reduce((acumulator, current) => {
		const latitudeIsValid = current['latitude'] !== null && current['latitude'] !== 0;
		const longitudeIsValid = current['longitude'] !== null && current['longitude'] !== 0;

		return acumulator && latitudeIsValid && longitudeIsValid;
	}, true)

	if(!isValid) return "Longitude ou Latitude inválidas";

	return routesQuery.postRoute(id,date,status,stops);
}

exports.patchRoute = async function (id,status){
	return routesQuery.patchRoute(id,status);
}