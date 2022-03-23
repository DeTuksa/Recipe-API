const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/userRouter')
const recipeRouter = require('./routers/recipeRouter');

const app = express()

const port = process.env.PORT

app.use(express.json())

app.use(userRouter)
app.use(recipeRouter)

app.listen(port, () => {
    console.log('Server is up on port: ' + port)
})