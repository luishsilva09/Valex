import {findById as findEmployee} from "../repositories/employeeRepository";
import { findByTypeAndEmployeeId,TransactionTypes,CardInsertData,insert as insertCard } from "../repositories/cardRepository";
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';

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


export default async function insertcard(cardData: { employeeId:number, password: string, type: TransactionTypes}){
    const employeeData = await findEmployee(cardData.employeeId)
    const existCard = await findByTypeAndEmployeeId(cardData.type,cardData.employeeId)
//validar se o usuario existe e validar se já possui um cartão do mesmo tipo
    if(!employeeData) throw { code:'NotFound', message: 'Empregado nao encontrdo'}
    if(existCard) throw { code:'ExistCard', message:'Esse empregado já possui um cartao desse tipo'}

    const cardHolderName:string = (holderName(employeeData.fullName))

    const isertData: CardInsertData = {
        employeeId: cardData.employeeId,
        number: faker.finance.creditCardNumber(),
        cardholderName: cardHolderName,
        securityCode: faker.finance.creditCardCVV(),
        expirationDate:dayjs().add(5,'y').format('MM/YY'),
        isVirtual:false,
        isBlocked:true,
        type:cardData.type
    }
    await insertCard(isertData)
}