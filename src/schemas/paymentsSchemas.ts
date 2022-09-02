import joi from 'joi';

const PaymentSchema = joi.object({
    cardId:joi.number().required(),
    cardPassword: joi.string().trim().regex(/[0-9]{4}/).required(),
    amount:joi.number().min(1).required()
})

export default PaymentSchema;