import {verifyCard }from "./verifyCard";
import * as rechargeRepository from "../repositories/rechargeRepository"
export async function recharge(cardId:number,amount:number){
    const cardData = await verifyCard(cardId)
    await rechargeRepository.insert({cardId,amount})
    const result = {
        cardNumber: cardData.number,
        cardName: cardData.cardholderName,
        rechargeAmount: amount
    }
    return result
}