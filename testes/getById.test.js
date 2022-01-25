const axios = require('axios')

test('Testando o GET passando um id', async function() {
	const response = await axios({
		url:'http://localhost:3000/Route/1',
		method: 'GET',
		
	}); 

	const route = response.data[0];
	expect(route['id']).toBe(1);
	expect(route['date']).toBe('2021-10-14T03:00:00.000Z');
	expect(route['status']).toBe('NOT_STARTED');
	expect(route['stops']).toHaveLength(2);

	expect(route['stops'][0]['description']).toBe("X do João");
	expect(route['stops'][0]['address']).toBe("Av. Washington Soares, 723 - Edson Queiroz, Fortaleza - CE, 60811-341");
	expect(route['stops'][0]['latitude']).toBe(-3.762598);
	expect(route['stops'][0]['longitude']).toBe(-38.484106);
	expect(route['stops'][0]['status']).toBe('NOT_ANSWER');
	expect(route['stops'][0]['deliveryRadius']).toBe(10);

	expect(route['stops'][1]['description']).toBe("Galeto Prime - Delivery iFood");
	expect(route['stops'][1]['address']).toBe("Rua Professor Eládio Magalhães, 213 - Edson Queiroz, Fortaleza - CE , 60811-460");
	expect(route['stops'][1]['latitude']).toBe(-3.751316);
	expect(route['stops'][1]['longitude']).toBe(-38.515070);
	expect(route['stops'][1]['status']).toBe('NOT_ANSWER');
	expect(route['stops'][1]['deliveryRadius']).toBe(30);
});