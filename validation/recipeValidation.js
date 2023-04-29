const joi = require("joi");

const validate = (recipe) => {
    const schema = joi.object({
        name: joi.string().required().messages({ "any.required": "İsim bilgisi giriniz." }),
        ingredients: joi.array().items(joi.string()).required().messages({ "any.required": "İçindekiler bilgisi giriniz." }),
        constructionSteps: joi.array().items(joi.string()).required().messages({ "any.required": "Yapılış bilgisi giriniz." }),
    });
    return schema.validate(recipe);
};

module.exports = { validate }