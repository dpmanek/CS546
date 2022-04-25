const axios = require('axios');

const axiosAPI = async (url) => {
	const { data } = await axios.get(url);
	return data;
};

module.exports = {
	axiosAPI,
};
