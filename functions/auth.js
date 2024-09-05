const Joi = require("joi");

exports.validateRegister = async (req_body) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(req_body);
};

exports.validateLogin = async (req_body) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  return schema.validate(req_body);
};
