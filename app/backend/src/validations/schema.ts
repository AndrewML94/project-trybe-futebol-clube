import Joi = require('joi');
import { StringSchema } from 'joi';

export const validEmail: StringSchema = Joi.string().email().required();
export const validPassword: StringSchema = Joi.string().min(6).required();
