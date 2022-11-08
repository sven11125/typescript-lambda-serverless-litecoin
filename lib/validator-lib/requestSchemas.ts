import Joi from '@hapi/joi';
export const usersValidatorSchema = Joi.object({
  id: Joi.number(),
  username: Joi.string().min(3).max(45),
  email: Joi.string(),
  password: Joi.string()
});