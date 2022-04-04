const express = require('express')
const app = express()
var bodyParser = require('body-parser')
require('dotenv').config();
var cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log(`ios back-end listening at http://localhost:${process.env.PORT || 5000}`)
})


