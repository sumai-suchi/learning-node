import type { IncomingMessage, ServerResponse } from "node:http";
import { insertProduct, readProduct } from "../service/product.service.js";
import type { IProduct } from "../types/products.types.js";
import { parseBody } from "../utility/parseBody.js";
import { sendResponse } from "../utility/sendResponse.js";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  console.log(req);
  const url = req.url;
  const method = req.method;

  const urlParts = url?.split("/");
  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;
  console.log(urlParts, id);

  const products = readProduct();
  console.log(products);
  if (req.url === "/products" && req.method === "GET") {
    // res.writeHead(200, { "Content-type": "application/json" });
    // res.end(
    //   JSON.stringify({
    //     message: "product retrived successfully ",
    //     data: products,
    //   }),
    // );
    try {
      return   sendResponse(res, true, 200, "product retrived successfully ", products);
    } catch (error) {
        return sendResponse(res, false, 500, "Internal Server Error", null);
    }

   
  } else if (req.method === "GET" && id !== null) {
    //created product by post method
    const products = readProduct();
    const product = products.find((p: IProduct) => p.id === id); //Get Single Product
    if(!product)
    {
    //    res.writeHead(404, { "Content-type": "application/json" });
    //   res.end(
    //   JSON.stringify({
    //     message: "product product not found ",
    //     data: null,
    //   }),
    // );

    return sendResponse(res, false,404 ,"product not found", null)
    }
    console.log(product);
    // res.writeHead(200, { "Content-type": "application/json" });
    // res.end(
    //   JSON.stringify({
    //     message: "product retrived successfully ",
    //     data: product,
    //   }),
    // );

    return  sendResponse(res, true , 200, "product retrived successfully", product)
  } else if (req.method === "POST" && url === "/products") {
     const products = readProduct();
    const body = await parseBody(req);
    console.log(body)
    const newproduct =
    {
        id : Date.now(),
        ...body
    }
    // console.log(newproduct)
    products.push(newproduct)
    insertProduct(products)
    console.log(products)

    res.writeHead(200, { "Content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "product retrived successfully ",
        data: newproduct
      }),
    );
  }
  else if(req.method === "PUT" && id !== null)
  {
     const body = await parseBody(req);
     const products = readProduct();
     const index= products.findIndex((p : IProduct)=> p.id === id)
     console.log(index)

     if(index < 0)
     {
         res.writeHead(404, { "Content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "product not found",
        data: null
      }),
    );
     }

     products[index]={
        id : products[index].id,
        ...body
     }
     insertProduct(products)
     console.log(products)
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "product retrived successfully ",
        data:  products[index]
      }),
    );
  }
  else if(req.method === "DELETE" && id !== null)
  {
    const products = readProduct()
    const index= products.findIndex((p : IProduct)=> p.id === id)
    console.log(index)
     if(index < 0)
     {
    
    res.writeHead(404, { "Content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "product not found",
        data: null
      }),
    );

     }

     products.splice(index,1)
     insertProduct(products)
    
     
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "product deleted successfully",
        data: null
      }),
    );


  }
};
