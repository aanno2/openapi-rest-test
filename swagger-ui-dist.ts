import express from "express";
import https from "https";
import http from "http";
import * as swaggerUi from "swagger-ui-dist";
import request from "request";
import cors from "cors";
import proxy from "http-proxy-middleware";
import cla from "command-line-args";
import clu from "command-line-usage";
import { readFileSync } from "fs";

interface IArgv {
  port: number,
  "api-host": string,
  https: boolean,
  help: boolean,
}

type OptionDef = cla.OptionDefinition & { description: string }

const options: OptionDef[] = [
  {
    name: "port",
    alias: "p",
    type: Number,
    description: "port number to use (for swagger-ui and proxy)",
    defaultValue: 3000,
  },
  {
    name: "api-host",
    alias: "a",
    type: String,
    description: "URL of (REST) API server to proxy (with CORS)",
    defaultValue: "http://145.87.1.165:9099",
  },
  {
    name: "https",
    alias: "s",
    type: Boolean,
    description: "proxy runs on https with self-signed certificate (instead of http)",
    defaultValue: false,
  },
  { name: "help", alias: "h", type: Boolean, description: "Print usage information and options", defaultValue: false },
]

const help = [
  {
    header: "Start swagger-ui and CORS proxy for an (REST) API server",
    content: `
	Blah, blah, ...
    `,
  },
  {
    header: "Options",
    optionList: options
  },
]

// probably unneeded?!? (tp)
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = "0"

const WORKING_DIR = process.cwd()
const argv: IArgv = cla(options) as IArgv
if (argv.help) {
  console.info(clu(help))
  process.exit(1)
}

const apiServerHost = argv["api-host"]
const port: number = argv.port
const useHttps: boolean = !!argv.https
console.log("useHttps", useHttps)
let scheme = "http://"
if (useHttps) {
  scheme = "https://"
}

const pathToSwaggerUi: string = swaggerUi.absolutePath()
const app: express.Application = express()

// really needed?!? (tp)
app.use(cors())
/*
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  /*
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
   -/
  res.header("Access-Control-Allow-Headers", "*")
  res.header("Access-Control-Allow-Methods", "*")
  res.header("Access-Control-Allow-Credentials", "true")
  res.header(
    "Access-Control-Exposed-Headers",
    "Authorization,Link,X-Total-Count"
  )
  // res.header("Max-Age", "1800")
  next()
})
 */

app.use("/ui/static", express.static(__dirname))
app.use("/ui", express.static(pathToSwaggerUi))

app.use("/", proxy({ target: apiServerHost, changeOrigin: true, secure: false }))
// blog javascripting.com: Don't hassle with CORS, proxy your requests
/*
app.use("/", (req, res) => {
  const url = apiServerHost + req.url
  req.pipe(request(url)).pipe(res)
})
 */

let server
if (useHttps) {
  server = https.createServer({
    key: readFileSync("cert/server.key"),
    cert: readFileSync("cert/server.cert")
  }, app)
} else {
  server = http.createServer(app)
  // server = app
}

server.listen(port, () => {
  console.log("server running on port " + port)
  console.log("swagger-ui running on " + scheme + "localhost:" + port + "/ui/")
  console.log("proxy for " + apiServerHost)
})
