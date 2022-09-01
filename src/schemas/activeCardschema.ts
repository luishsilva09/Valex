import joi from 'joi';

const activeCardSchema = joi.object({
    employeeId: joi.number().required(),
    cardId: joi.number().required(),
    securityCode:joi.string().trim().regex(/[0-9]{3}/).required()
})

export default activeCardSchema