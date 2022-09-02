import { Request,Response } from "express";
import * as paymentServices from '../services/paymentServices'


export async function payment(req:Request,res:Response){
    const paymentData:{cardId:number,cardPassword:string,amount:number} = req.body
    const businessId:number = Number(req.params.businessId)
    const paymentInserData = await paymentServices.payment(paymentData,businessId)
    res.status(201).json(paymentInserData)
}