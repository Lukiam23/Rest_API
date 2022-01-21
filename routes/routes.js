const express = require('express')
const router = express.Router()
const routesService = require('../service/routeService')

router.get('/Route', async function (req,res){
	const routes = await routesService.getRoutes();
	res.json(routes);
});

router.get('/Route/:id', async function (req,res){
	const route = await routesService.getRoute(req.params.id);
	res.json(route);
});

router.delete('/Route/:id', async function (req,res){
	const response = await routesService.deleteRoute(req.params.id);
	res.json(response)

});

router.patch('/Route', async function (req,res){
	const response = await routesService.patchRoute(req.body.id,req.body.status);
	res.json(response);
});

router.post('/Route', async function (req,res){
	const response = await routesService.postRoute(req.body.id,req.body.date,req.body.status,req.body.stops);
	res.json(response);
	
});

module.exports = router