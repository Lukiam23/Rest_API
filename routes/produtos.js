const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
	res.status(200).send({
		mensgem: 'Usando o GET dentro da rota produtos'
	});
});

router.post('/', (req,res, next) => {
	res.status(201).send({
		mensgem: 'Usando o POST dentro da rota produtos'
	});
});

router.get('/:id_product', (req, res, next) => {
	const id = req.params.id_product;
	if(id === 'esprecial'){
		res.status(201).send({
			mensgem: 'Voce passou um id especial'
		});
	} else {
		res.status(201).send({
			mensgem: 'passou um Id'
		});
	}
})

module.exports = router