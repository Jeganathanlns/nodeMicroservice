const axios = require('axios');

exports.fetchExternalUsers = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data.map(user => ({
      id: user.id,
      name: user.name,
      source: 'external'
    }));
  } catch (error) {
    console.error('Failed to fetch external users:', error.message);
    return [];
  }
};