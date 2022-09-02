import { Request,Response } from "express";
import * as rechargeService from '../services/rechargeService'

export async function recharge(req:Request,res:Response){
    const cardId:number = Number(req.params.cardId)
    const amount:{amount:number} = req.body
    await rechargeService.recharge(cardId,amount.amount)
    res.send('recarga')
}