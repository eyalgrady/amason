import Joi from "joi";

export const FirstStepSchema = Joi.object({
  _id: Joi.string().allow(""),
  title: Joi.string().min(2).max(256).required(),
  promotionMessageText: Joi.string().min(2).max(256).allow(""),
  tags: Joi.array().items(Joi.string()).optional(),
  image: Joi.object({
    url: Joi.string().min(14).required(),
    alt: Joi.string().min(2).max(256).required(),
  }).required(),
  price: Joi.number().required(),
  discountPercentage: Joi.number().min(0).max(100).allow(""),
  category: Joi.string().required(),
  subcategory: Joi.string().required(),
  content: Joi.string().allow(""),
  quantity: Joi.number().allow(""),
  brandName: Joi.string().allow(""),
  colors: Joi.array().optional(),
  sizes: Joi.array().allow(""),
  weight: Joi.string().allow(""),
  weightUnit: Joi.string().allow(""),
  height: Joi.string().allow(""),
  width: Joi.string().allow(""),
  depth: Joi.string().allow(""),
});

export const SecondStepSchema = Joi.object({
  _id: Joi.string().allow(""),

  title: Joi.string().allow(""),
  promotionMessageText: Joi.string().allow(""),
  tags: Joi.array().allow(""),
  image: Joi.object({
    url: Joi.string().allow(""),
    alt: Joi.string().allow(""),
  }).allow(""),
  price: Joi.number().allow(""),
  discountPercentage: Joi.number().allow(""),
  category: Joi.string().allow(""),
  subcategory: Joi.string().allow(""),
  content: Joi.string().min(2).max(1024).required(),
  quantity: Joi.number().required(),
  brandName: Joi.string().min(2).max(256).allow(""),
  colors: Joi.array().optional(),
  sizes: Joi.array().allow(""),
  weight: Joi.string().allow(""),
  weightUnit: Joi.string().allow(""),
  height: Joi.string().allow(""),
  width: Joi.string().allow(""),
  depth: Joi.string().allow(""),
});
