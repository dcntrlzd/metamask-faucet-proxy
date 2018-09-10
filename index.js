const axios = require('axios');
const FAUCET_URL = 'https://faucet.metamask.io/';

exports.faucetRequest = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Max-Age', '3600');

  switch (req.method) {
    case 'POST':
      if (!req.body.address) return res.status(400).send();

      axios.post(FAUCET_URL, req.body.address)
        .then(({ data }) => {
          res
            .status(200)
            .set('Content-Type', 'application/json')
            .send(JSON.stringify({ txhash: data }));
        })
        .catch((error) => {
          res
            .status(500)
            .send(error.response ? error.response.data : error.message);
        });
      break;

    case 'OPTIONS':
      res.status(204).send('');
      break;

    default:
      res.status(400).send();
      break;
  }
};