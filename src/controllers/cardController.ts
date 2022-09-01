import { Request,Response } from "express";
import * as cardService from "../services/cardService";
import { TransactionTypes } from "../repositories/cardRepository";



export async function insertCard(req:Request,res:Response){
    const data:{employeeId:number, password:string, type:TransactionTypes} = req.body;
    const cardData = await cardService.insertcard(data)
    
    return res.status(201).send(`Cartão criado com sucesso dados: Numero: ${cardData.number} codigo de segurança: ${cardData.securityCode}`);
}

export async function activeCard(req:Request,res:Response) {
    const cardData:{employeeId:number,cardId:number,securityCode:string} = req.body
    await cardService.activeCard(cardData)
    res.status(200).send("Ativado")
}