import * as paymentRepository from '../repositories/paymentRepository'
import * as businessRepository from '../repositories/businessRepository'
import { isBlock, verifyCard } from '../utils/verifyCard';
import dotenv from "dotenv";
import Cryptr from 'cryptr';
import { getBalance } from '../utils/balanceUtils';
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

    let cardBalance = await getBalance(paymentData.cardId);

    if(cardBalance < paymentData.amount) throw { code:'Conflict', message: 'Saldo insuficiente'}

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