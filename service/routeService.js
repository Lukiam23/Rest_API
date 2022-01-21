const routesQuery = require('../querys/routesData')


exports.getRoutes = async function () {
	const allRoutes = await routesQuery.getRoutes();
	const allStops =  await routesQuery.getStops();
	
	return allRoutes.map( routeData => {
		return {
			id: routeData['route_id'],
			date: routeData['date'],
			status: routeData['status'],
			stops: allStops.filter(stopData => stopData['route_id'] === routeData['route_id'])
		};
	});
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

	stops.map(stop => {
		stop['address'] = stop['address'].split(/[-,',']/);
	});

	return routesQuery.postRoute(id,date,status,stops);


}