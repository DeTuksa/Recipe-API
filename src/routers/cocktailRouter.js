const express = require('express');
const router = new express.Router();
const axios = require('axios');

const options = {
    method: 'GET',
    url: 'https://the-cocktail-db.p.rapidapi.com/randomselection.php',
    headers: {
      'X-RapidAPI-Key': 'f55f5a8c6dmsh8b67830f5bbdeaep108d73jsna4bf5d4e939f',
      'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
    }
  };

router.get('/cocktails/random-cocktails', async (req, res) => {
    try {
        axios.request(options).then(function (response) {
            // console.log(response.data);
            res.status(200).send({
                message: 'Fetch successful!',
                drinks: response.data.drinks
            })
        }).catch(function (error) {
            return console.error(error);
        });
        //TODO: Implement sending welcome message
    
    } catch (error) {
        res.status (400).send(error)
    }
})

module.exports = router