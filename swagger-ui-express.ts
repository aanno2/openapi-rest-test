const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const port = 3000

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.listen(port, () => console.log(
    "swagger-ui running on port " + port + " use http://localhost:" + port + "/api-docs"))
