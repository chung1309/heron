const client = require('./jest/client');
const axios = client.axios;

test("Test Get Todos", async () => {
    const request = await axios.get('http://localhost:3000/todos');
    expect(request.data).not.toBeUndefined();
});