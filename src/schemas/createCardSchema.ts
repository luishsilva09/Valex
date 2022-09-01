import joi from 'joi';

const createCardSchema = joi.object({
    employeeId: joi.number().required(),
    type: joi.valid('groceries', 'restaurant', 'transport', 'education', 'health')
})

export default createCardSchema