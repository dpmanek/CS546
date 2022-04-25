const api = require('./userApi');

const url = {
	people:
		'https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json',
	work: 'https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json',
};

module.exports = {
	peopleApi: api.axiosAPI(url.people),
	workApi: api.axiosAPI(url.work),
};
