import {findById as findEmployee} from "../repositories/employeeRepository";
import * as cardRepository from "../repositories/cardRepository";
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import Cryptr from 'cryptr';
import dotenv from "dotenv";

dotenv.config();
const cryptr = new Cryptr((process.env.SECRET_KEY) ?? '');


function holderName(fullName: string){
    const name: string[] = fullName.toUpperCase().split(' ').filter( x => x.length > 3)
    const holderName: string[] = []
    for(let i = 0; i < name.length; i++){
        if(i === 0 || i === name.length - 1){
            holderName.push(name[i])
        }else{
            holderName.push(name[i][0])
        }
    }
   return(holderName.join(' '))

}


export async function insertcard(cardData: { employeeId:number, password: string, type: cardRepository.TransactionTypes}){
    const employeeData = await findEmployee(cardData.employeeId)
    const existCard = await cardRepository.findByTypeAndEmployeeId(cardData.type,cardData.employeeId)
//validar se o usuario existe e validar se já possui um cartão do mesmo tipo
    if(!employeeData) throw { code:'NotFound', message: 'Empregado nao encontrdo'}
    if(existCard) throw { code:'ExistCard', message:'Esse empregado já possui um cartao desse tipo'}

//agrupando dados para inserir novo cartao
    const cardHolderName:string = (holderName(employeeData.fullName));
    const cardNumber: string = faker.finance.creditCardNumber();
    const securityCode: string = (faker.finance.creditCardCVV())
  
    const isertData: cardRepository.CardInsertData = {
        employeeId: cardData.employeeId,
        number: cardNumber,
        cardholderName: cardHolderName,
        securityCode: cryptr.encrypt(securityCode) ,
        expirationDate:dayjs().add(5,'y').format('MM/YY'),
        isVirtual:false,
        isBlocked:false,
        type:cardData.type
    }
    await cardRepository.insert(isertData)
    return {
        number: cardNumber,
        securityCode
    }
}

export  async function activeCard(cardData:{employeeId:number,cardId:number,securityCode:string}) {
    const card = await cardRepository.findById(cardData.cardId);

    if(!card)throw {code: 'NotFound', message:'Dados incorretos'};
    if(card.employeeId != cardData.employeeId || !card) throw {code: 'NotFound', message:'Dados incorretos'};
    if(card.password !== null) throw {code: 'ReadyActive', message:'Cartão já ativado'};
    if(card.expirationDate === dayjs().format('MM/YY')) throw { code:'Conflict', message:'Cartão vencido, verifique os dados'};
    const decryptSecurityCode = cryptr.decrypt(card.securityCode);
   
    if(cardData.securityCode != decryptSecurityCode) throw {code: 'Conflict', message:'Incoerencia dos dados'};

    console.log(card)

}