const Swagger = require("swagger-client")

Swagger('http://petstore.swagger.io/v2/swagger.json')
  .then(client => {
      client.spec // The resolved spec
      client.originalSpec // In case you need it
      client.errors // Any resolver errors
	  
	  if (client.errors) {
		  console.log("loading spec failed", client.errors)
	  }
	  console.log(client.apis.pet)

      // Tags interface
      // client.apis.pet.addPet({id: 1, name: "bobby"}).then(...)

      // TryItOut Executor, with the `spec` already provided
      // client.execute({operationId: 'addPet', parameters: {id: 1, name: "bobby") }).then(...)
	  
	  client.apis.pet.findPetsByStatus({status: ['available']}).then(resp => 
	    console.log("findByStatus", resp)
	  )
   })
   