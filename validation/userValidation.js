const joi = require("joi");

const validate = (user) => {
    const schema = joi.object({
        email: joi.string().email().required().messages({"any.required": "Email bilgisi giriniz."}),
        password: joi.string().required().messages({"any.required": "Şifre bilgisi giriniz."}),
    });
    return schema.validate(user);
};

module.exports = { validate }