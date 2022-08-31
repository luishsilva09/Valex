import { Request,Response } from "express";

export async function insertCard(req:Request,res:Response){
    res.send('aqui estou deu bom')
    // if(1 > 0)throw {code:"NotFound", message: "Nao foi encontrado"}
    
}