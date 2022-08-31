
import joi from 'joi';

const cardTypeSchema = joi.object({
    type: joi.valid('groceries', 'restaurants', 'transport', 'education', 'health')
})

export default cardTypeSchema