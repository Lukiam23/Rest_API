const express = require('express')
const router = express.Router()
const routesService = require('../service/routeService')

router.get('/Route', async function (req,res){
	const routes = await routesService.getRoutes();
	res.json(routes);
});

router.delete('/Route/:id', async function (req,res){

});
router.put('/Route/:id', async function (req,res){

});
router.post('/Route', async function (req,res){

});

module.exports = router