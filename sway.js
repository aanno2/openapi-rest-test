const Sway = require("sway")

Sway.create({
  definition: 'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore.yaml'
})
.then(apiDefinition => {
  console.log('Documentation URL: ', apiDefinition.documentationUrl)
  console.log("apiDefinition\n", apiDefinition)
  const validation = apiDefinition.validate()
  console.log("validation\n", validation)
}, err => {
  console.error(err.stack)
})
