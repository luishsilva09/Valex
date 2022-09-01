import { Request,Response } from "express";
import * as cardService from "../services/cardService";
import { TransactionTypes } from "../repositories/cardRepository";



export async function insertCard(req:Request,res:Response){
    const data:{employeeId:number, password:string, type:TransactionTypes} = req.body;
    const cardData = await cardService.insertcard(data)
    
    return res.status(201).json(cardData);
}

export async function activeCard(req:Request,res:Response) {
    const cardData:{employeeId:number,cardId:number,securityCode:string} = req.body
    const activeData = await cardService.activeCard(cardData)
    res.status(200).json(activeData)
}

export async function viewCards(req:Request,res:Response){
    const searchData:{employeeId:number,passwords:string[]} = req.body 
    const result = await cardService.viewCards(searchData)
    res.status(200).json(result)
}

export async function viewBalenceTransactions(req:Request,res:Response){
    res.send('ver todos ctransacoes')
}

export async function blockedCard(req:Request,res:Response){
    const result = await cardService.blockedCard(req.body,req.params.block)
    res.status(200).json(result)
}