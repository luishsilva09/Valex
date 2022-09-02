import * as paymentRepository from '../repositories/paymentRepository'
import * as businessRepository from '../repositories/businessRepository'
import * as rechargeRepository from '../repositories/rechargeRepository'
import { isBlock, verifyCard } from '../utils/verifyCard';
import dotenv from "dotenv";
import Cryptr from 'cryptr';
dotenv.config();
const cryptr = new Cryptr((process.env.SECRET_KEY) ?? '');

export async function payment(paymentData:{cardId:number,cardPassword:string,amount:number},businessId:number){
    const businessExist = await businessRepository.findById(businessId);
    if(!businessExist) throw {code:'NotFound', message:'Estabelecimento não encontrado'};

    await isBlock(paymentData.cardId);
    const validCardData = await verifyCard(paymentData.cardId);

    if(!validCardData.password) throw {code: 'Conflict', message:'Cartão não ativado'};
    const decryptPassword = cryptr.decrypt(validCardData.password);

    if(validCardData.type !== businessExist.type) throw {code: 'Conflict', message:'Tipo não autorizado'};
    if(decryptPassword !== paymentData.cardPassword) throw { code:'Conflict', message:'Senha incorreta'};

    let cardAmount:number = 0;

    (await rechargeRepository.findByCardId(paymentData.cardId)).forEach(x => cardAmount += x.amount);
    (await paymentRepository.findByCardId(paymentData.cardId)).forEach(element => cardAmount -= element.amount)

    if(cardAmount < paymentData.amount) throw { code:'Conflict', message: 'Saldo insuficiente'}

    const result = {
        cardNumber:validCardData.number,
        cardName:validCardData.cardholderName,
        businessName: businessExist.name,
        amount: paymentData.amount
    }
    const paymentInsert = {
        cardId: paymentData.cardId,
        businessId,
        amount: paymentData.amount
    }
    await paymentRepository.insert(paymentInsert)
    return result
}