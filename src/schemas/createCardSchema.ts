import joi from 'joi';

const createCardSchema = joi.object({
    employeeId: joi.number().required(),
    password:joi.string().trim().required(),
    type: joi.valid('groceries', 'restaurants', 'transport', 'education', 'health')
})

export default createCardSchema