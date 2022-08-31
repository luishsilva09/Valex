import { Request,Response } from "express";
import cardService from "../services/cardService";
import { TransactionTypes } from "../repositories/cardRepository";


export async function insertCard(req:Request,res:Response){
    const apiKey = req.headers.apiKey;
    const data:{employeeId:number, password:string, type:TransactionTypes} = req.body;
    await cardService(data)
    
    return res.status(201).send('Cartão criado com sucesso');
}