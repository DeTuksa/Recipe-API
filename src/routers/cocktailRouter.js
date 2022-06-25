const express = require('express');
const router = new express.Router();
const axios = require('axios');
const Cocktail = require('../models/cocktail');

const auth = require('../middleware/auth');

router.get('/cocktails/random-cocktails', async (req, res) => {

    const options = {
        method: 'GET',
        url: 'https://the-cocktail-db.p.rapidapi.com/randomselection.php',
        headers: {
          'X-RapidAPI-Key': process.env.COCKTAIL_API_KEY,
          'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
        }
      };

    try {
        axios.request(options).then(function (response) {
            // console.log(response.data);
            res.status(200).send({
                message: 'Cocktails fetched successfully!',
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

//Route to create a new cocktail recipe
router.post('/cocktail/create-cocktail', auth, async (req, res) => {

    console.log(req.body);
    const cocktail = new Cocktail({
        ...req.body,
        user: req.user._id
    })

    try {
        await cocktail.save()
        res.status(200).send(cocktail)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

module.exports = router