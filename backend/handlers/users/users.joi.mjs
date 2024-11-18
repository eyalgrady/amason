import Joi from "joi";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,30}$/;

const phoneRegex =
  /^(?:\+972|0)(?:5[0-9]|2[0-9]|3[0-9]|4[0-9]|7[0-9]|8[0-9]|9[0-9])\d{7}$/;

export const UserLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const UserSignup = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  phone: Joi.string().pattern(phoneRegex).min(9).max(11).allow(""),
  email: Joi.string().email().min(5).required(),
  // שימוש ב-context כדי לזהות מתי סיסמה נדרשת
  password: Joi.string().pattern(passwordRegex).when("$isNewUser", {
    is: true,
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
  oldPassword: Joi.string().when("$isNewUser", {
    is: false,
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
  newPassword: Joi.string().pattern(passwordRegex).when("$isNewUser", {
    is: false,
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
  isBusiness: Joi.boolean(),
  // הוספת הולידציה על שדות העסק רק אם isBusiness הוא true
  businessName: Joi.string().min(2).max(20).when("isBusiness", {
    is: true,
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
  address: Joi.object({
    postcode: Joi.number().required(),
    street: Joi.string().min(2).max(256).required(),
    optionalText: Joi.string().min(2).max(256).allow(""),
    city: Joi.string().min(2).max(256).required(),
    country: Joi.string().min(2).max(256).required(),
  }).when("isBusiness", {
    is: true,
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
  image: Joi.object({
    url: Joi.string().min(14).required(),
    alt: Joi.string().min(2).max(256).required(),
  }).when("isBusiness", {
    is: true,
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
});

// export const BusinessSignup = Joi.object({
//   businessName: Joi.string().min(2).max(20).required(),
//   address: Joi.object({
//     postcode: Joi.number().required(),
//     street: Joi.string().min(2).max(256).required(),
//     optionalText: Joi.string().min(2).max(256).allow(""),
//     city: Joi.string().min(2).max(256).required(),
//     country: Joi.string().min(2).max(256).required(),
//   }).required(),
//   image: Joi.object({
//     url: Joi.string().min(14).required(),
//     alt: Joi.string().min(2).max(256).required(),
//   }).required(),
// });
