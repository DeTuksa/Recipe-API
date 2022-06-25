const express = require('express');
const router = new express.Router();
const User = require('../models/user');

const { admin } = require('../../config/firebase-config');
const auth = require('../middleware/auth');
const { response } = require('express');

const notification_options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24
}


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

//Route to add push notification id
router.post('/user/push_notification', auth, async (req, res) => {
    try {
        const registrationToken = req.body.registrationToken
        const message = req.body.message
        const options = notification_options

        admin.messaging().sendToDevice(registrationToken, message, options).then(
            response => {
                res.status(200).send({
                    message: 'Notification sent successfully'
                })
            }
        )
    } catch (error) {
        res.status(400).send(error)
    }
})

//Route to add push notification id
router.patch('/user/update', auth, async (req, res) => {

    const _id = req.user._id
    const updates = Object.keys(req.body)
    const registrationToken = req.body.registrationToken
    const allowedUpdates = ['push_notification_id']
    const isValidOperation = updates.every((update) =>
     allowedUpdates.includes(update))

     if (!isValidOperation) {
         return res.status(400).send({error: 'Invalid operation'})
     }
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        
        res.send({
            message: 'Update succesful',
            user: req.user
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router