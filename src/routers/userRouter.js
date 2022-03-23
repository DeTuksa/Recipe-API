const express = require('express');
const router = new express.Router();
const User = require('../models/user');

//Route to create a new user
router.post('/user', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        //TODO: Implement sending welcome message
        const token = await user.generateAuthToken()
        res.status(201).send({
            message: 'Registration successful!',
            user,
            token
        })
    } catch (error) {
        res.status (400).send(error)
    }
})

//Route to login a user
router.post('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()
        res.send({
            message: 'Welcome back!',
            user, token
        })
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router