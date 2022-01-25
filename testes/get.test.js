const axios = require('axios')

test('Testando o GET', async function() {
	const response = await axios({
		url:'http://localhost:3000/Route',
		method: 'GET',
		
	}); 

	const routes = response.data;
	expect(routes).toHaveLength(1);

});