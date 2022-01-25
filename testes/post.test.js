const axios = require('axios')

test('Testando o POST', async function() {
	const response = await axios({
		url:'http://localhost:3000/Route',
		method: 'POST',
		data: {
		    "id": 2,
		    "date": "2021-10-11",
		    "status": "NOT_STARTED",
		    "stops": [{
		        "description": "Y da Ana", 
		        "address": "Av. Desembargador Moreira, 501 - Benfica, Fortaleza - CE, 60811-902", 
		        "latitude": -3.7625982,
		        "longitude": -38.4841062, 
		        "status": "NOT_ANSWER", 
		        "deliveryradius": 40 
		    },
		    {
		        "description": "B da Carla", 
		        "address": "Rua Dom Pedro I, 600 - Centro, Fortaleza - CE, 60811-002", 
		        "latitude": -3.7625982,
		        "longitude": -38.4841062, 
		        "status": "ANSWER", 
		        "deliveryradius": 20 
		    }]
		}
				
	}); 

	const confirmacao = response.data;
	expect(confirmacao).toBe('Rota inserida');

});