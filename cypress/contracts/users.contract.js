const Joi = require ('joi')

const usersSchema = Joi.object({
    usuarios: Joi.array().items({
        nome: Joi.string(),
        email: Joi.string(),
        password: Joi.string(),
        adminstrador: Joi.string(),
        _id: Joi.string()
    })
})

export default usersSchema;