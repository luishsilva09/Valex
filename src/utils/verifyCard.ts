import * as cardRepository from "../repositories/cardRepository";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"


export  async function verifyCard(cardId:number){
    const card = await cardRepository.findById(cardId)
    
    if(!card)throw {code: 'NotFound', message:'Dados incorretos'};
    if(!card.password) throw { code:'Conflict', message:'Cartão não ativo'}

    await verifyExpirationDate(card.expirationDate)

    return card
}
export async function verifyExpirationDate(expirationDate:string){
    dayjs.extend(relativeTime)
    const now = dayjs().format('MM/YY').split('/').map(x => Number(x))
    const expirationsDate = expirationDate.split('/').map(x => Number(x))

    if(expirationsDate[1] - now[1] <= 0 && expirationsDate[0] - now[0] <= 0) throw { code:'Conflict', message:'Cartão vencido, verifique os dados'};
}

export async function isBlock(cardId:number) {
    const card = await cardRepository.findById(cardId)

    if(card.isBlocked) throw { code:'Conflict', message:'Cartão bloqueado'}
}