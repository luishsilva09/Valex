import {findById as findEmployee} from "../repositories/employeeRepository";
import { findByTypeAndEmployeeId,TransactionTypes } from "../repositories/cardRepository";

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

    console.log(holderName(employeeData.fullName))
}