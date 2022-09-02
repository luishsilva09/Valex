import {verifyCard }from "../utils/verifyCard";
import * as rechargeRepository from "../repositories/rechargeRepository"
export async function recharge(cardId:number,amount:number){
    await verifyCard(cardId)
    await rechargeRepository.insert({cardId,amount})
    console.log(cardId)
}