import {findById as findEmployee} from "../repositories/employeeRepository";
import * as cardRepository from "../repositories/cardRepository";
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import Cryptr from 'cryptr';
import dotenv from "dotenv";
import { verifyExpirationDate } from "../utils/verifyCard";

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

async function validCard(cardId:number,employeeId:number){
    const card = await cardRepository.findById(cardId);
    await verifyExpirationDate(card.expirationDate)
    if(!card)throw {code: 'NotFound', message:'Dados incorretos'};
    if(card.employeeId != employeeId) throw {code: 'NotFound', message:'Dados incorretos'};
    

    return card
}

export async function insertcard(cardData: { employeeId:number, type: cardRepository.TransactionTypes}){
    const employeeData = await findEmployee(cardData.employeeId)
    const existCard = await cardRepository.findByTypeAndEmployeeId(cardData.type,cardData.employeeId)
//validar se o usuario existe e validar se já possui um cartão do mesmo tipo
    if(!employeeData) throw { code:'NotFound', message: 'Empregado nao encontrdo'}
    if(existCard) throw { code:'ExistCard', message:'Esse empregado já possui um cartao desse tipo'}

//agrupando dados para inserir novo cartao
    const cardHolderName:string = (holderName(employeeData.fullName));
    const cardNumber: string = faker.finance.creditCardNumber();
    const securityCode: string = (faker.finance.creditCardCVV())
    const expirationDate: string = dayjs().add(5,'y').format('MM/YY');
    const isertData: cardRepository.CardInsertData = {
        employeeId: cardData.employeeId,
        number: cardNumber,
        cardholderName: cardHolderName,
        securityCode: cryptr.encrypt(securityCode) ,
        expirationDate:expirationDate,
        isVirtual:false,
        isBlocked:false,
        type:cardData.type
    }
    await cardRepository.insert(isertData)
    return {
        number: cardNumber,
        cardHolderName: cardHolderName,
        securityCode,
        expirationDate:expirationDate
    }
}

export  async function activeCard(cardData:{employeeId:number,cardId:number,securityCode:string}) {
    const validCardData = await validCard(cardData.cardId,cardData.employeeId)

    if(validCardData.password !== null) throw {code: 'ReadyActive', message:'Cartão já ativado'};

    const decryptSecurityCode = cryptr.decrypt(validCardData.securityCode);
   
    if(cardData.securityCode != decryptSecurityCode) throw {code: 'Conflict', message:'Incoerencia dos dados'};

    const cardPin = faker.finance.pin()
    const encryptPin = cryptr.encrypt(cardPin)
    

    await cardRepository.update(cardData.cardId,{password:encryptPin})
    
    return {cardNumber: validCardData.number, password:cardPin}


}

export async function viewBalenceTransactions(){

}

export async function blockedCard(cardData:{employeeId:number,cardId:number,cardPassword:string},block:string){
    const validCardData = await validCard(cardData.cardId,cardData.employeeId)

    if(!validCardData.password) throw {code: 'Conflict', message:'Cartão não ativado'};
   
    const decryptPassword = cryptr.decrypt(validCardData.password);
    
    if(decryptPassword !== cardData.cardPassword) throw { code:'Conflict', message:'Senha incorreta'};

    const result = {
        cardNumber: validCardData.number,
        name: validCardData.cardholderName
    }

    if(block === 'true'){
        if(validCardData.isBlocked === true) throw { code:'Conflict', message:'Cartão já bloqueado'};
        await cardRepository.update(cardData.cardId,{isBlocked:true})
        return {...result, isBlocked:true}
    }
    if(block === 'false'){
        if(validCardData.isBlocked === false) throw { code:'Conflict', message:'Cartão já desbloqueado'};
        await cardRepository.update(cardData.cardId,{isBlocked:false})
        return {...result, isBlocked:false}
    }
     throw{code:'Conflict', message:'Não foi possivel entender a requisicao'}
        
    
}