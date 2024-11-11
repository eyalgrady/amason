import Joi from "joi";

export const ProductValid = Joi.object({
  title: Joi.string().min(2).max(256).required(),
  content: Joi.string().min(2).max(1024).required(),
  image: Joi.object({
    url: Joi.string().min(14).required(),
    alt: Joi.string().min(2).max(256).required(),
  }).required(),
  price: Joi.number().required(),
  quantity: Joi.number().integer().min(1).required(),
  category: Joi.string().required(),
  subcategory: Joi.string().required(),
  brandName: Joi.string().min(3).max(20).allow(""),
  discountPercentage: Joi.number().min(0).max(100).allow(""),
  promotionMessageText: Joi.string().min(2).max(256).allow(""),
});
