import { Request,Response } from "express";
import * as paymentServices from '../services/paymentServices'


export async function payment(req:Request,res:Response){
    const paymentData:{cardId:number,cardPassword:string,amount:number} = req.body
    const businessesId:number = Number(req.params.businessesId)
    const paymentInserData = await paymentServices.payment(paymentData,businessesId)
    res.status(201).json(paymentInserData)
}