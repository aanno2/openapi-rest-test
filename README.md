# open-rest-rest

Minimal examples to use swagger/openapi spec standalone for accessing the [swagger petstore](https://petstore.swagger.io/).

* swagger-ui via `swagger-ui-dest`
* swagger-ui via `swagger-ui-express`
* Test client using `swagger-client`
* Spec validation via `sway`
* Also include `dredd` (but found that mysterious)

## Usage

This is a node project consisting of

* the Swagger UI
* a general-purpose proxy to circumvent CORS problems

The proxy is suited for http and https rest services.

By default, the following paths/endpoints are used

* http://localhost:3000/ui to access the swagger ui
* http://localhost:3000/ui/static to access the project directory and its subdirectories
* all other paths are forwarded to the proxied URL

### Help

Try

```bash
 ./node_modules/.bin/ts-node swagger-ui-dist.ts -h
```

to get basic help.

### Example 

Say you want to proxy a jhipster microservice but you have to edit its openapi spec before using.

Let's assume Springdoc Openapi will serve the spec at `http://localhost:8083/v3/api-docs`
You could download this URL as `api-docs.json` and adapt it to your needs.

After that, point your browser to `http://localhost:3000/ui/` to access the Swagger UI. 
You can see a input text field to type the URL of the API to use in at the very top the UI.

In this field you can now fill in `http://localhost:3000/ui/static/api-docs.json` and click the 
'Explore' button.

Of course, if there is no need to edit the spec, you could directly use 
`http://localhost:3000/v3/api-docs` here. (But `http://localhost:8083/v3/api-docs` would not work
because of CORS.)
