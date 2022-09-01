import { Request,Response,NextFunction } from "express";
import { findByApiKey } from "../repositories/companyRepository";


export async function validKey(req:Request,res:Response,next:NextFunction) {
    const apiKey:string = String(req.headers['x-api-key'])
    const exist = await findByApiKey(apiKey) 
    if(exist) next();
    else throw {code: 'NotFound', message:'Chave invalida'}
}