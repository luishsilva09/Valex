import joi from 'joi';

const createCardSchema = joi.object({
    employeeId: joi.number().required(),
    type: joi.valid('groceries', 'restaurant', 'transport', 'education', 'health')
})

const activeCardSchema = joi.object({
    employeeId: joi.number().required(),
    cardId: joi.number().required(),
    securityCode:joi.string().trim().regex(/[0-9]{3}/).required()
})

const blockSchema = joi.object({
    employeeId: joi.number().required(),
    cardId:joi.number().required(),
    cardPassword:joi.string().trim().regex(/[0-9]{4}/).required()
})
export  const cardSchemas = {
    createCardSchema,
    activeCardSchema,
    blockSchema
}