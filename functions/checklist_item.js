const Joi = require("joi");

exports.validateCreate = async (req_body) => {
  const schema = Joi.object({
    itemName: Joi.string().required(),
  });

  return schema.validate(req_body);
};
