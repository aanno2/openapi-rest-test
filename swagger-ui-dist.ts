const express = require('express')
const pathToSwaggerUi = require('swagger-ui-dist').absolutePath()
const port = 3000

const app = express()

app.use(express.static(pathToSwaggerUi))

app.listen(port, () => console.log("swagger-ui running on port " + port))
