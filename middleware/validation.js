const Joi = require('joi');

const registrationValidation = (data) => {
// checking validation
const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(3).pattern(new RegExp('^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$'), 'Password must contain at least 1 Uppercase, 1 Lowercase and 1 Special Character').required(),
    repeat_password: Joi.any().valid(Joi.ref('password')).required().messages({
        "any.only" : "Password must match"
      })
});
    return schema.validate(data);
}

const loginValidation = (data) => {
    // checking validation
    const schema =  Joi.object({
        password: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email()
    });
        return schema.validate(data);
    }

    const updateUser = (data) => {
        // checking validation
        const schema = Joi.object({
            name: Joi.string().min(3).required(),
            email: Joi.string().min(6).required().email(),
        });
            return schema.validate(data);
        }

        const updatePassword = (data) => {
            // checking validation
            const schema = Joi.object({
                newPassword: Joi.string().min(3).pattern(new RegExp('^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$'), 'Password must contain at least 1 Uppercase, 1 Lowercase and 1 Special Character').required(),
                password: Joi.string().allow('', null)
            });
                return schema.validate(data);
            }

//specific function path
module.exports.registrationValidation = registrationValidation
module.exports.loginValidation = loginValidation
module.exports.updateUser = updateUser
module.exports.updatePassword = updatePassword