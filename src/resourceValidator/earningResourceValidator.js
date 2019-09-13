import Joi from '@hapi/joi'
export default function (resource, hasId = true) {
  let schema = {
    id: Joi.number().integer().min(1),
    category_id: Joi.number().integer().min(1),
    name: Joi.string(),
    amount: Joi.number().required(),
    date: Joi.date().required()
  }
  if (hasId) {
    schema.id = schema.id.required()
  }
  return Joi.object().keys(schema).validate(resource)
}
