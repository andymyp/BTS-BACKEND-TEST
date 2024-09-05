const Joi = require("joi");

exports.validateCreate = async (req_body) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  return schema.validate(req_body);
};
