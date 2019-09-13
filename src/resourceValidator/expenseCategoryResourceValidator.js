import Joi from '@hapi/joi'
export default function (resource, hasId = true) {
  let schema = {
    id: Joi.number().integer().min(1),
    name: Joi.string().required(),
    color: Joi.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i).required()
  }
  if (hasId) {
    schema.id = schema.id.required()
  }
  return Joi.object().keys(schema).validate(resource)
}
