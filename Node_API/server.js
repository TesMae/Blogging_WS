const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./app/routes/appRoutes')

app = express()
port = process.env.PORT || 3000
app.listen(port)
console.log('API server started on: ' + port)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

routes(app)