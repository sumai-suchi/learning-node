import http, { IncomingMessage } from "http"
import { Server } from "http";
import { routeHandler } from "./routes/routes.js";
import config from "./config/index.js";


const server : Server= http.createServer((req:IncomingMessage, res) => {
   routeHandler(req,res)

  

})

server.listen(config.port, ()=>{
    console.log(`Server is running on port ${config.port}`)
})
