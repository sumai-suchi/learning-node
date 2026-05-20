import path from "path"
import fs from "fs"

const filepath = path.join(process.cwd(),"src", "database", "db.json")

export const readProduct =()=>
{
    // console.log(process.cwd())
    // console.log(filepath)
    const products = fs.readFileSync(filepath,'utf-8')
    // console.log(products)
    return JSON.parse(products)


}

export const insertProduct =(payload :any) =>
{
    fs.writeFileSync(filepath , JSON.stringify(payload))
}