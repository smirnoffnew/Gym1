const functions = require('firebase-functions');
const axios = require("axios");

const serviceAccount = require("./service-account.json");

exports.postcodeProxy = functions.region("europe-west1").https.onRequest((request, response) => {

  const postcode = encodeURIComponent(request.query.postcode);
  const houseNumber = encodeURIComponent(request.query.houseNumber);
  const houseNumberAddition = request.query.houseNumberAddition ? encodeURIComponent(request.query.houseNumberAddition): '';

  const API_URL = `https://api.postcode.eu/nl/v1/addresses/postcode/${postcode}/${houseNumber}/${houseNumberAddition}`;

  axios
    .get(API_URL, {
      headers: {
        Authorization: `Basic ${functions.config().postcode.key}`
      }
    })
    .then(res => {
      console.log(res.data);
      response.set("Access-Control-Allow-Origin", "*");
      response.set("Access-Control-Allow-Methods", "GET, POST");
      response.status(200).send(res.data);
    })
    .catch(error => {
      console.error(error);
      response.status(500).send(error);
    });
});
