import type { IncomingMessage, ServerResponse } from "node:http";
import { productController } from "../controller/product.controller.js";

export const routeHandler =(req :IncomingMessage , res : ServerResponse)=>
{

      const url= req.url;
    const method= req.method;
    
    if(url === "/" && method === "GET"){
    // console.log("this is get method")

    res.writeHead(200, {"Content-type": "application/json"})
    res.end(JSON.stringify({message:"this is get method"}))
}
else if(url?.startsWith("/products"))
{
   productController(req,res)
}
else
{
    
    res.writeHead(404, {"Content-type": "application/json"})
    res.end(JSON.stringify({message:"Page not found"}))
}
}