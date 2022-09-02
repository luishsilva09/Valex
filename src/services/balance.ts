import * as rechargeRepository from '../repositories/rechargeRepository'
import * as paymentRepository from '../repositories/paymentRepository'
export async function getBalance(cardId:number) {
    let balance: number = 0;

    (await rechargeRepository.findByCardId(cardId)).forEach(x => balance += x.amount);
    (await paymentRepository.findByCardId(cardId)).forEach(element => balance -= element.amount)

    return balance
}